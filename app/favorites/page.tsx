"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import products from '../../data/products.json';
import ratings from '../../data/ratings.json';
import Link from 'next/link';
import styles from '../recently-added/RecentlyAdded.module.css';
import ProductCard from '@/components/ProductCard';

export default function FavoritesPage() {
  const itemsPerPage = 9;

  const ratingsMap = new Map((ratings as any[]).map((r) => [r.product_id, r]));
  const maxReviews = Math.max(...(ratings as any[]).map((r) => r.total_reviews || 0), 1);

  const favorites = [...(products as any[])]
    .map((p) => {
      const r = ratingsMap.get(p.product_id) || {};
      const avg = r.average_rating || 0;
      const reviews = r.total_reviews || 0;
      const soldEstimate = Math.round(reviews * 2);

      const avgNorm = avg / 5;
      const reviewsNorm = reviews / maxReviews;
      const soldNorm = soldEstimate / (maxReviews * 2 || 1);

      const score = avgNorm * 0.6 + reviewsNorm * 0.3 + soldNorm * 0.1;
      return { ...p, _score: score, _avg: avg, _reviews: reviews, _sold: soldEstimate };
    })
    .sort((a, b) => b._score - a._score);

  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(favorites.length / itemsPerPage));
  const start = (page - 1) * itemsPerPage;
  const pageItems = favorites.slice(start, start + itemsPerPage);

  return (
    <>
      <Navbar />
        <main className={styles.mainContainer}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <h1 className={styles.header}>Favorites</h1>
          <Link href="/">Back home</Link>
        </div>

        <section>
          <div className={styles.listContainer}>
            {pageItems.map((product: any) => {
              return (
                <div key={product.product_id} className={styles.item}>
                  <ProductCard product={product} rating={{ average_rating: product._avg, total_reviews: product._reviews }} />
                </div>
              );
            })}
          </div>
        </section>

        <footer className={styles.pager}>
          <button disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
            Previous
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            Page {page} of {totalPages}
          </div>
          <button disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>
            Next
          </button>
        </footer>
      </main>
    </>
  );
}
