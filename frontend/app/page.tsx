"use client";

import { useEffect, useState } from "react";
import { getStats } from "@/lib/api";
import { Product } from "@/types/product";
import styles from "./page.module.css";

export default function DashboardPage() {
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [lowStockProducts, setLowStockProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function loadStats() {
      try {
        const stats = await getStats();
        setTotalProducts(stats.totalProducts);
        setLowStockProducts(stats.lowStockProducts);
      } catch (err) {
        setError("Could not load stats. Is the backend running?");
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  if (loading) return <p className={styles.message}>Loading...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div>
      <h1 className={styles.heading}>Dashboard</h1>

      <div className={styles.statCard}>
        <span className={styles.statLabel}>Total Products</span>
        <span className={styles.statValue}>{totalProducts}</span>
      </div>

      <h2 className={styles.subheading}>Low Stock Warnings</h2>

      {lowStockProducts.length === 0 ? (
        <p className={styles.message}>All products are sufficiently stocked.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {lowStockProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>
                  <span className={styles.warning}>⚠ {product.quantity}</span>
                </td>
                <td>${product.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
