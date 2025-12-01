import React from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { FiSearch, FiUser, FiHeart, FiShoppingBag } from "react-icons/fi";

export default function Navbar() {
return (
<nav className={styles.navbar}>
{/* LEFT SECTION */}
<div className={styles.left}>
<Link href="/">
<img src="/logo.png" alt="Logo" className={styles.logo} />
</Link>

<Link href="/men" className={styles.navLink}>men</Link>
<Link href="/women" className={styles.navLink}>women</Link>
<Link href="/kids" className={styles.navLink}>kids</Link>
</div>

{/* CENTER SECTION */}
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
<a className={styles.navItem} href="/profile">
<FiUser className={styles.icon} />
<span>Profile</span>
</a>

<a className={styles.navItem} href="/wishlist">
<FiHeart className={styles.icon} />
<span>Wishlist</span>
</a>

<a className={styles.navItem} href="/bag">
<FiShoppingBag className={styles.icon} />
<span>Bag</span>
</a>
</div>
</nav>
);
}