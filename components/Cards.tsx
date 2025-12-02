"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import styles from "./Cards.module.css"

interface Product {
  product_id: string;
  seller_id: string;
  product_number: string;
  name: string;
  description: string;
  image_urls: string[];
  pricing: {
    original_price: number;
    discount_percentage?: number;
    discounted_price?: number;
    currency?: string;
  };
  stock: number;
  top_level_id: string | number;
  super_category_id: string | number;
  category_id: string | number;
}

interface CardProps {
  topCategoryId: number;
  categoryId?: number;
  products?: Product[];
}

const Card: React.FC<CardProps> = ({ topCategoryId, categoryId, products: initialProducts }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts || []);
  const [filtered, setFiltered] = useState<Product[]>([]);

  useEffect(() => {
    if (initialProducts && initialProducts.length > 0) return;

    const fetchProducts = async () => {
      try {
        const res = await fetch("/data/products.json");
        const data: Product[] = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products.json", err);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const result = products.filter((p) => {
        const topId = Number(p.top_level_id);
        const catId = Number(p.category_id);
        if (typeof categoryId === "number") {
          return topId === topCategoryId && catId === categoryId;
        }
        // when categoryId is not provided, return all products under the top level
        return topId === topCategoryId;
      });
      setFiltered(result);
    }
  }, [products, topCategoryId, categoryId]);

  // carousel ref and controls
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [imageFallbacks, setImageFallbacks] = useState<Record<string, string>>({});

  const handleImageError = (productId: string) => {
    // use a reliable local fallback image when upstream images fail
    setImageFallbacks((prev) => ({ ...prev, [productId]: "/images/hello.jpeg" }));
  };

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
      {filtered.length === 0 && (
        <p className={styles.noProducts}>No products available in this category.</p>
      )}

      {filtered.length > 0 && (
        <div className={styles.carouselWrapper}>
          <button aria-label="Previous" className={styles.navButton} onClick={handlePrev}>
            ‹
          </button>

          <div className={styles.carouselTrack} ref={trackRef}>
            {filtered.map((product) => (
              <div className={styles.carouselItem} key={product.product_id}>
                <div className={styles.card}>
                  <div className={styles.imageWrapper}>
                    <Image
                      src={imageFallbacks[product.product_id] || product.image_urls?.[0] || "/images/download.jpeg"}
                      alt={product.name}
                      fill
                      className={styles.cardImg}
                      unoptimized
                      onError={() => handleImageError(product.product_id)}
                    />
                  </div>

                  <h3 className={styles.cardTitle}>{product.name}</h3>
                  <p className={styles.cardDesc}>{product.description}</p>

                  <div className={styles.cardPrice}>
                    {product.pricing?.discounted_price ? (
                      <>
                        <span className={styles.priceDiscounted}>
                          Rs. {product.pricing.discounted_price}
                        </span>
                        <span className={styles.priceOriginal}>
                          Rs. {product.pricing.original_price}
                        </span>
                        {product.pricing.discount_percentage !== undefined && (
                          <span className={styles.priceOff}>
                            ({product.pricing.discount_percentage}% OFF)
                          </span>
                        )}
                      </>
                    ) : (
                      <span className={styles.priceNormal}>
                        Rs. {product.pricing?.original_price}
                      </span>
                    )}
                  </div>
                </div>
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
};

export default Card;
