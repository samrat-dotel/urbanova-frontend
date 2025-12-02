"use client";

import CarouselCards from "@/components/CarouselCards";
import styles from "../men/NavItems.module.css";
import Navbar from "@/components/Navbar";
import products from "../../data/products.json";
import categories from "../../data/categories.json";

export default function WomenPage() {
  return (
    <>
      <Navbar />
      <main className={styles.container}>

        <h1 className={styles.mainHeading}>Women's Collection</h1>

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>All Women</h2>
          <CarouselCards topCategoryId={2} products={products} />
        </section>

        {(() => {
          const top = categories.find((t) => Number(t.top_level_id) === 2);
          if (!top) return null;
          return top.super_categories.map((superCat) => (
            <section key={superCat.super_category_id} className={styles.section}>
              <h2 className={styles.sectionHeading}>{superCat.name}</h2>
              {superCat.categories.map((cat) => (
                <div key={cat.category_id} style={{ marginBottom: 20 }}>
                  <h3 className={styles.categoryName}>{cat.name}</h3>
                  <CarouselCards topCategoryId={2} categoryId={cat.category_id} products={products} />
                </div>
              ))}
            </section>
          ));
        })()}
      </main>

    </>
  );
}
