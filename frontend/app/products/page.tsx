"use client";

import { useEffect, useState } from "react";
import { getAllProducts, getProductsByCategory, deleteProduct, updateQuantity } from "@/lib/api";
import { Product } from "@/types/product";
import styles from "./page.module.css";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  // Tracks which product row is currently showing the quantity input
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingQuantity, setEditingQuantity] = useState<string>("");

  async function loadProducts(selectedCategory: string) {
    setLoading(true);
    setError("");
    try {
      let data: Product[];
      if (selectedCategory.trim() === "") {
        data = await getAllProducts();
      } else {
        data = await getProductsByCategory(selectedCategory);
      }
      setProducts(data);
    } catch (err) {
      setError("Could not load products. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts("");
  }, []);

  function handleCategoryChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const selected = e.target.value;
    setCategory(selected);
    loadProducts(selected);
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await deleteProduct(id);
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      alert("Failed to delete product.");
    }
  }

  function handleEditClick(product: Product) {
    setEditingId(product.id);
    setEditingQuantity(String(product.quantity));
  }

  async function handleQuantitySave(id: string) {
    const newQty = parseInt(editingQuantity);
    if (isNaN(newQty) || newQty < 0) {
      alert("Please enter a valid quantity.");
      return;
    }
    try {
      const updated = await updateQuantity(id, newQty);
      setProducts(products.map((p) => (p.id === id ? updated : p)));
      setEditingId(null);
    } catch (err) {
      alert("Failed to update quantity.");
    }
  }

  // Get unique categories from the current list for the filter dropdown
  const categories = Array.from(new Set(products.map((p) => p.category)));

  return (
    <div>
      <h1 className={styles.heading}>Products</h1>

      <div className={styles.toolbar}>
        <select className={styles.select} value={category} onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {loading && <p className={styles.message}>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {!loading && !error && products.length === 0 && (
        <p className={styles.message}>No products found.</p>
      )}

      {!loading && !error && products.length > 0 && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>
                  {editingId === product.id ? (
                    <div className={styles.editRow}>
                      <input
                        className={styles.qtyInput}
                        type="number"
                        value={editingQuantity}
                        onChange={(e) => setEditingQuantity(e.target.value)}
                      />
                      <button
                        className={styles.saveButton}
                        onClick={() => handleQuantitySave(product.id)}
                      >
                        Save
                      </button>
                      <button
                        className={styles.cancelButton}
                        onClick={() => setEditingId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <span className={product.quantity < 10 ? styles.lowStock : ""}>
                      {product.quantity}
                    </span>
                  )}
                </td>
                <td>${product.price.toFixed(2)}</td>
                <td>
                  <div className={styles.actions}>
                    {editingId !== product.id && (
                      <button
                        className={styles.editButton}
                        onClick={() => handleEditClick(product)}
                      >
                        Edit Qty
                      </button>
                    )}
                    <button
                      className={styles.deleteButton}
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
