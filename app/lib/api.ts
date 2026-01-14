import { Product } from "../types/product";

export async function fetchProducts(): Promise<Product[]> {
  try {
    const res = await fetch("https://fakestoreapi.com/products", {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Products API failed:", res.status);
      return []; // 👈 NEVER throw
    }

    return await res.json();
  } catch (error) {
    console.error("Fetch products error:", error);
    return [];
  }
}

export async function fetchProductById(id: string): Promise<Product | null> {
  try {
    const res = await fetch(
      `https://fakestoreapi.com/products/${id}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      console.error("Product API failed:", res.status);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Fetch product error:", error);
    return null;
  }
}
