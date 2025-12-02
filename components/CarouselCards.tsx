"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";
import ProductCard from "./ProductCard";
import ratingsData from "../data/ratings.json";
import styles from "./Cards.module.css";

interface Product {
  product_id: string | number;
  top_level_id?: string | number;
  category_id?: string | number;
}

interface Props {
  topCategoryId?: number;
  categoryId?: number;
  products?: Product[];
}

export default function CarouselCards({ topCategoryId, categoryId, products: initialProducts }: Props) {
  const [products, setProducts] = useState<Product[]>(initialProducts || []);
  const [filtered, setFiltered] = useState<Product[]>([]);

  useEffect(() => {
    if (initialProducts && initialProducts.length > 0) return;
    const fetchProducts = async () => {
      try {
        const res = await fetch("/data/products.json");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products.json", err);
      }
    };
    fetchProducts();
  }, [initialProducts]);

  useEffect(() => {
    if (!products || products.length === 0) return;
    let result: Product[] = [];
    if (typeof topCategoryId !== "number") {
      result = products;
    } else {
      result = products.filter((p: any) => {
        const topId = Number((p as any).top_level_id);
        const catId = Number((p as any).category_id);
        if (typeof categoryId === "number") {
          return topId === topCategoryId && catId === categoryId;
        }
        return topId === topCategoryId;
      });
    }
    setFiltered(result);
  }, [products, topCategoryId, categoryId]);

  const trackRef = useRef<HTMLDivElement | null>(null);
  const ratingsMap = useMemo(() => new Map((ratingsData as any[]).map((r) => [r.product_id, r])), []);

  const scrollBy = (distance: number) => {
    if (!trackRef.current) return;
    trackRef.current.scrollBy({ left: distance, behavior: "smooth" });
  };

  const handlePrev = () => {
    if (!trackRef.current) return;
    const w = trackRef.current.clientWidth;
    scrollBy(-w + 40);
  };

  const handleNext = () => {
    if (!trackRef.current) return;
    const w = trackRef.current.clientWidth;
    scrollBy(w - 40);
  };

  return (
    <div>
      {filtered.length === 0 && <p className={styles.noProducts}>No products available in this category.</p>}

      {filtered.length > 0 && (
        <div className={styles.carouselWrapper}>
          <button aria-label="Previous" className={styles.navButton} onClick={handlePrev}>
            ‹
          </button>

          <div className={styles.carouselTrack} ref={trackRef}>
            {filtered.map((product: any) => (
              <div className={styles.carouselItem} key={product.product_id}>
                <ProductCard product={product} rating={ratingsMap.get(product.product_id)} />
              </div>
            ))}
          </div>

          <button aria-label="Next" className={styles.navButton} onClick={handleNext}>
            ›
          </button>
        </div>
      )}
    </div>
  );
}
