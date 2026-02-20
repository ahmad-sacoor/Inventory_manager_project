"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct } from "@/lib/api";
import styles from "./page.module.css";

export default function AddProductPage() {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);

  async function handleSubmit(e: React.FormEvent) {
    // Prevent the browser from refreshing the page on form submit
    e.preventDefault();
    setError("");

    const parsedQuantity = parseInt(quantity);
    const parsedPrice = parseFloat(price);

    if (!name.trim() || !category.trim()) {
      setError("Name and category are required.");
      return;
    }
    if (isNaN(parsedQuantity) || parsedQuantity < 0) {
      setError("Quantity must be a non-negative number.");
      return;
    }
    if (isNaN(parsedPrice) || parsedPrice < 0) {
      setError("Price must be a non-negative number.");
      return;
    }

    setSubmitting(true);
    try {
      await createProduct({
        name: name.trim(),
        category: category.trim(),
        quantity: parsedQuantity,
        price: parsedPrice,
      });
      router.push("/products");
    } catch (err) {
      setError("Failed to create product. Is the backend running?");
      setSubmitting(false);
    }
  }

  return (
    <div>
      <h1 className={styles.heading}>Add New Product</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label className={styles.label}>Name</label>
          <input
            className={styles.input}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Wireless Mouse"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Category</label>
          <input
            className={styles.input}
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g. Electronics"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Quantity</label>
          <input
            className={styles.input}
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="e.g. 50"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Price ($)</label>
          <input
            className={styles.input}
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="e.g. 29.99"
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.buttons}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={() => router.push("/products")}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={submitting}
          >
            {submitting ? "Creating..." : "Create Product"}
          </button>
        </div>
      </form>
    </div>
  );
}
