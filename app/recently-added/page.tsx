"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import products from '../../data/products.json';
import Link from 'next/link';
import styles from './RecentlyAdded.module.css';
import ratings from '../../data/ratings.json';
import ProductCard from '@/components/ProductCard';

export default function RecentlyAddedPage() {
  const itemsPerPage = 9;
  const recent = [...(products as any[])]
    .sort((a, b) => {
      const ta = a.created_at ? new Date(a.created_at).getTime() : 0;
      const tb = b.created_at ? new Date(b.created_at).getTime() : 0;
      return tb - ta;
    });

  const ratingsMap = new Map((ratings as any[]).map((r) => [r.product_id, r]));

  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(recent.length / itemsPerPage));

  const start = (page - 1) * itemsPerPage;
  const pageItems = recent.slice(start, start + itemsPerPage);

  return (
    <>
      <Navbar />
      <main className={styles.mainContainer}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <h1 className={styles.header}>Recently Added</h1>
          <Link href="/" style={{fontWeight: "bold"}}>Back home</Link>
        </div>

        <section>
          <div className={styles.listContainer}>
            {pageItems.map((product: any) => {
              const r = ratingsMap.get(product.product_id) || null;
              return (
                <div key={product.product_id} className={styles.item}>
                  <Link href={`/product/${product.product_id}`}>
                    <ProductCard product={product} rating={r} />
                  </Link>
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
