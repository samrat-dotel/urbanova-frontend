"use client";

import React from "react";
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
  link?: boolean;
}

export default function ProductCard({ product, rating, link = true }: Props) {
  const imgSrc = (() => {
    const url = product?.image_urls?.[0];
    if (!url) return "/images/download.jpeg";
    try {
      const parsed = new URL(url);
      if (parsed.hostname.includes("example.com")) return "/images/download.jpeg";
      return url;
    } catch {
      return "/images/download.jpeg";
    }
  })();

  const content = (
    <div className={styles.card}>
      {/* Image wrapper must have position: relative and fixed height */}
      <div className={styles.imageWrapper}>
          <Image
            src={imgSrc}
            alt={product.name || "product"}
            fill
            className={styles.cardImg}
            unoptimized
            onError={(e) => {
              // Client-only fallback without changing React state
              (e.currentTarget as HTMLImageElement).src = "/images/download.jpeg";
            }}
          />
        </div>

        <h3 className={styles.cardTitle}>{product.name}</h3>
        <p className={styles.cardDesc}>{product.description}</p>

        <div className={styles.metaRow}>
          <div className={styles.rating}>
            {rating?.average_rating ? (
              <>
                <span className={styles.star}>★</span>
                <span className={styles.avg}>{rating.average_rating.toFixed(1)}</span>
              </>
            ) : (
              <span className={styles.noRating}>—</span>
            )}
          </div>

          <div className={styles.reviews}>{rating?.total_reviews || 0} reviews</div>
          <div className={styles.sold}>{Math.round((rating?.total_reviews || 0) * 2)} sold</div>
        </div>

        <div className={styles.cardPrice}>
          {product.pricing?.discounted_price ? (
            <>
              <span className={styles.priceDiscounted}>Rs. {product.pricing.discounted_price}</span>
              <span className={styles.priceOriginal}>Rs. {product.pricing.original_price}</span>
              {product.pricing.discount_percentage !== undefined && (
                <span className={styles.priceOff}>
                  ({product.pricing.discount_percentage}% OFF)
                </span>
              )}
            </>
          ) : (
            <span className={styles.priceNormal}>Rs. {product.pricing?.original_price}</span>
          )}
        </div>
      </div>
  );

  if (link) {
    return (
      <Link href={`/product/${product.product_id}`} className={styles.cardLink}>
        {content}
      </Link>
    );
  }

  return content;
}
