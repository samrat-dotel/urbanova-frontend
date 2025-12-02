"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Cards.module.css";

interface Product {
  product_id: string | number;
  name: string;
  description?: string;
  image_urls?: string[];
  pricing?: {
    original_price?: number;
    discounted_price?: number;
    discount_percentage?: number;
  };
}

interface Rating {
  product_id?: string | number;
  average_rating?: number;
  total_reviews?: number;
}

interface Props {
  product: Product;
  rating?: Rating | null;
}

export default function ProductCard({ product, rating }: Props) {
  const [fallback, setFallback] = useState<string | null>(null);

  const imgSrc = (() => {
    if (fallback) return fallback;
    const url = product?.image_urls?.[0];
    if (!url) return "/images/download.jpeg";
    try {
      const parsed = new URL(url);
      if (parsed.hostname.includes("example.com")) return "/images/download.jpeg";
      return url;
    } catch (e) {
      return "/images/download.jpeg";
    }
  })();

  return (
    <main>
        <Link href={`/product/${product.product_id}`} className={styles.cardLink}>
      <div className={styles.card}>
        <div className={styles.imageWrapper}>
          <Image
            src={imgSrc}
            alt={(product && product.name) || "product"}
            fill
            className={styles.cardImg}
            unoptimized
            onError={() => setFallback("/images/download.jpeg")}
          />
        </div>

        <h3 className={styles.cardTitle}>{product.name}</h3>
        <p className={styles.cardDesc}>{product.description}</p>

        <div className={styles.metaRow}>
          {(() => {
            const avg = rating?.average_rating;
            const reviews = rating?.total_reviews || 0;
            const soldEstimate = Math.round(reviews * 2);
            return (
              <>
                <div className={styles.rating}>
                  {avg ? (
                    <>
                      <span className={styles.star}>★</span>
                      <span className={styles.avg}>{avg.toFixed(1)}</span>
                    </>
                  ) : (
                    <span className={styles.noRating}>—</span>
                  )}
                </div>

                <div className={styles.reviews}>{reviews} reviews</div>
                <div className={styles.sold}>{soldEstimate} sold</div>
              </>
            );
          })()}
        </div>

        <div className={styles.cardPrice}>
          {product.pricing?.discounted_price ? (
            <>
              <span className={styles.priceDiscounted}>Rs. {product.pricing.discounted_price}</span>
              <span className={styles.priceOriginal}>Rs. {product.pricing.original_price}</span>
              {product.pricing.discount_percentage !== undefined && (
                <span className={styles.priceOff}>({product.pricing.discount_percentage}% OFF)</span>
              )}
            </>
          ) : (
            <span className={styles.priceNormal}>Rs. {product.pricing?.original_price}</span>
          )}
        </div>
      </div>
    </Link>
    </main>
  );
}
