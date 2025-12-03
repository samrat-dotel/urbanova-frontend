"use client";

import Link from "next/link";
import styles from "./Footer.module.css";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        
        <div className={styles.brand}>
          <h2 className={styles.logo}>UrbaNova</h2>
          <p className={styles.tagline}>
            Wear Your Flow.
          </p>
        </div>

        <div className={styles.linksSection}>
          <h3 className={styles.heading}>Explore</h3>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/men">Men Collections</Link></li>
            <li><Link href="/women">Women Collections</Link></li>
            <li><Link href="/kids">Kids Collections</Link></li>
          </ul>
        </div>

        <div className={styles.linksSection}>
          <h3 className={styles.heading}>Customer Service</h3>
          <ul>
            <li><Link href="/aboutus">About Us</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
            <li><Link href="/shipping">Shipping Info</Link></li>
            <li><Link href="/returns">Returns & Refunds</Link></li>
            <li><Link href="/faq">FAQs</Link></li>
          </ul>
        </div>

        <div className={styles.socialSection}>
          <h3 className={styles.heading}>Follow Us</h3>
          <div className={styles.socialIcons}>
            <a href="#" aria-label="Facebook"><FaFacebookF /></a>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" aria-label="TikTok"><FaTiktok /></a>
          </div>
        </div>

      </div>

      <div className={styles.bottomBar}>
        <p>© {new Date().getFullYear()} YourBrand. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
