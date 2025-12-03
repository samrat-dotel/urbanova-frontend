import React from 'react';
import products from '../../../data/products.json';
import ratings from '../../../data/ratings.json';
import Image from 'next/image';
import styles from './Product.module.css';

interface Props {
  params: { id: string } | Promise<{ id: string }>;
}

export default async function ProductPage({ params }: Props) {
  const resolvedParams = (params as any)?.then ? await (params as any) : params;
  const id = resolvedParams?.id;
  const product = (products as any[]).find((p) => String(p.product_id) === String(id));
  if (!product) {
    return (
        <main style={{ padding: 24 }}>
          <h2>Product not found</h2>
        </main>
    );
  }

  const rating = (ratings as any[]).find((r) => r.product_id === id) || {};

  const img = (() => {
    const url = product.image_urls?.[0];
    try {
      if (!url) return '/images/download.jpeg';
      const parsed = new URL(url);
      if (parsed.hostname.includes('example.com')) return '/images/download.jpeg';
      return url;
    } catch (e) {
      return '/images/download.jpeg';
    }
  })();

  return (
      <main className={styles.container}>
        <div className={styles.gallery}>
          <div className={styles.mainImage}>
            <Image src={img} alt={product.name} fill style={{ objectFit: 'contain' }} unoptimized />
          </div>
        </div>

        <div className={styles.info}>
          <h1 className={styles.title}>{product.name}</h1>

          <div className={styles.priceRow}>
            {product.pricing?.discounted_price ? (
              <>
                <div className={styles.discounted}>Rs. {product.pricing.discounted_price}</div>
                <div className={styles.original}>Rs. {product.pricing.original_price}</div>
                <div className={styles.off}>({product.pricing.discount_percentage}% OFF)</div>
              </>
            ) : (
              <div className={styles.normal}>Rs. {product.pricing?.original_price}</div>
            )}
          </div>

          <div className={styles.meta}>
            <div className={styles.rating}>★ {rating.average_rating ?? '—'}</div>
            <div className={styles.reviews}>{rating.total_reviews ?? 0} reviews</div>
          </div>

          <p className={styles.description}>{product.description}</p>

          <div className={styles.actions}>
            <button className={styles.addBtn}>Add to cart</button>
            <button className={styles.wishlist}>Add to wishlist</button>
          </div>

          <section className={styles.details}>
            <h3>Product details</h3>
            <ul>
              <li><strong>Brand:</strong> {product.brand || '—'}</li>
              <li><strong>Stock:</strong> {product.stock}</li>
              <li><strong>SKU:</strong> {product.product_number}</li>
            </ul>
          </section>
        </div>
      </main>
  );
}
