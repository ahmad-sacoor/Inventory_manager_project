import type { Metadata } from "next";
import "./globals.css";
import styles from "./layout.module.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Inventory Manager",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav className={styles.nav}>
          <span className={styles.brand}>Inventory Manager</span>
          <div className={styles.links}>
            <Link href="/" className={styles.link}>Dashboard</Link>
            <Link href="/products" className={styles.link}>Products</Link>
            <Link href="/products/new" className={styles.addButton}>+ Add Product</Link>
          </div>
        </nav>
        <main className={styles.main}>{children}</main>
      </body>
    </html>
  );
}
