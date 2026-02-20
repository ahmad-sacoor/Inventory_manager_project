import { Product } from "@/types/product";

const BASE_URL = "http://localhost:8080/api";

export async function getAllProducts(): Promise<Product[]> {
  const response = await fetch(`${BASE_URL}/products`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const response = await fetch(`${BASE_URL}/products?category=${category}`);
  if (!response.ok) {
    throw new Error("Failed to fetch products by category");
  }
  return response.json();
}

export async function getStats(): Promise<{ totalProducts: number; lowStockProducts: Product[] }> {
  const response = await fetch(`${BASE_URL}/products/stats`);
  if (!response.ok) {
    throw new Error("Failed to fetch stats");
  }
  return response.json();
}

export async function createProduct(data: Omit<Product, "id">): Promise<Product> {
  const response = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to create product");
  }
  return response.json();
}

export async function updateQuantity(id: string, quantity: number): Promise<Product> {
  const response = await fetch(`${BASE_URL}/products/${id}/quantity`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quantity }),
  });
  if (!response.ok) {
    throw new Error("Failed to update quantity");
  }
  return response.json();
}

export async function deleteProduct(id: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete product");
  }
}
