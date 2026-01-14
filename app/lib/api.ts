import { Product } from "../types/product";

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch("https://fakestoreapi.com/products", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("response is not ok");
  }

  const data: Product[] = await res.json();
  return data;
}


export async function fetchProductById(id: string): Promise<Product> {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  const text = await res.text();
console.log(text);
return JSON.parse(text);

}
