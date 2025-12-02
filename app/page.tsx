import React from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import CarouselCards from '@/components/CarouselCards'
import products from '../data/products.json'
import ratings from '../data/ratings.json'

const HomePage = () => {
  // sort products by created_at descending (newest first)
  const recent = [...(products as any[])]
    .sort((a, b) => {
      const ta = a.created_at ? new Date(a.created_at).getTime() : 0
      const tb = b.created_at ? new Date(b.created_at).getTime() : 0
      return tb - ta
    })

  const ratingsMap = new Map((ratings as any[]).map((r) => [r.product_id, r]));
  const maxReviews = Math.max(...(ratings as any[]).map((r) => r.total_reviews || 0), 1);

  const favorites = [...(products as any[])]
    .map((p) => {
      const r = ratingsMap.get(p.product_id) || {};
      const avg = r.average_rating || 0;
      const reviews = r.total_reviews || 0;
      const soldEstimate = reviews * 2; 

      // normalized components
      const avgNorm = avg / 5; // 0..1
      const reviewsNorm = reviews / maxReviews; // 0..1
      const soldNorm = soldEstimate / (maxReviews * 2 || 1); // 0..1

      const score = avgNorm * 0.6 + reviewsNorm * 0.3 + soldNorm * 0.1;
      return { ...p, _score: score };
    })
    .sort((a, b) => b._score - a._score)
    

  return (
    <div>
      <Navbar />

      <main style={{ padding: '24px' }}>
        <section style={{ marginBottom: 28 }}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
            <h2 style={{ fontSize: 22, margin: '6px 0 12px', fontWeight: 'bold' }}>Favorites</h2>
            <Link href="/favorites"><button style={{padding: '6px 10px', borderRadius: 6, cursor: 'pointer'}}>View more</button></Link>
          </div>
          <CarouselCards products={favorites} />
        </section>

        <section style={{ marginBottom: 28 }}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
            <h2 style={{ fontSize: 22, margin: '6px 0 12px', fontWeight: 'bold' }}>Recently Added</h2>
            <Link href="/recently-added"><button style={{padding: '6px 10px', borderRadius: 6, cursor: 'pointer'}}>View more</button></Link>
          </div>
          <CarouselCards products={recent} />
        </section>
      </main>
    </div>
  )
}

export default HomePage
