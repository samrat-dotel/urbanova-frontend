"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './HeroSlideshow.module.css';

const IMAGES = ['/images/banner1.jpeg', '/images/banner2.jpeg', '/images/banner3.jpeg', '/images/banner4.jpeg', '/images/banner5.jpeg'];

export default function HeroSlideshow() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % IMAGES.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className={styles.hero} aria-label="Homepage banner">
      <div className={styles.slides}>
        {IMAGES.map((src, i) => (
          <div
            key={src}
            className={styles.slide}
            style={{ opacity: i === idx ? 1 : 0, zIndex: i === idx ? 2 : 1 }}
            aria-hidden={i === idx ? 'false' : 'true'}
          >
            <Image src={src} alt={`Banner ${i + 1}`} fill style={{ objectFit: 'cover' }} priority />
          </div>
        ))}
      </div>

    </section>
  );
}
