'use client';

// components/Navbar.tsx
import React, { useState } from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { FiSearch, FiUser, FiHeart, FiShoppingBag } from "react-icons/fi";
import categoriesData from "../data/categories.json"; // adjust path

export default function Navbar() {
  const [hoveredTop, setHoveredTop] = useState<number | null>(null);

  return (
    <nav className={styles.navbar}>
      {/* LEFT SECTION */}
      <div className={styles.left}>
        <Link href="/">
          <img src="/images/logo.jpeg" alt="Logo" className={styles.logo} />
        </Link>

        {categoriesData.map((top) => (
          <div
            key={top.top_level_id}
            className={styles.topLevelItem}
            onMouseEnter={() => setHoveredTop(top.top_level_id)}
            onMouseLeave={() => setHoveredTop(null)}
          >
            <span className={styles.navLink}>{top.name}</span>

            {/* Mega-menu */}
            {hoveredTop === top.top_level_id && (
              <div className={styles.megaMenu}>
                {top.super_categories.map((superCat) => (
                  <div key={superCat.super_category_id} className={styles.superCategoryColumn}>
                    <h4 className={styles.superTitle}>{superCat.name}</h4>
                    <ul className={styles.categoryList}>
                      {superCat.categories.map((cat) => (
                        <li key={cat.category_id}>
                          <Link
                            href={`/${top.name.toLowerCase()}/${cat.name
                              .toLowerCase()
                              .replace(/\s/g, "-")}`}
                          >
                            {cat.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* SEARCH BAR */}
      <div className={styles.searchBox}>
        <FiSearch className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search for products, brands and more"
          className={styles.searchInput}
        />
      </div>

      {/* RIGHT SECTION */}
      <div className={styles.right}>
        <div className={styles.navItem}>
          <FiUser className={styles.icon} />
          <span>Profile</span>
        </div>
        <div className={styles.navItem}>
          <FiHeart className={styles.icon} />
          <span>Wishlist</span>
        </div>
        <div className={styles.navItem}>
          <FiShoppingBag className={styles.icon} />
          <span>Bag</span>
        </div>
      </div>
    </nav>
  );
}
