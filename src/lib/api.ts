import { Product } from "@/types/product";

export async function getTotalProducts(): Promise<number> {
  const res = await fetch(`https://fakestoreapi.com/products`);
  if (!res.ok) throw new Error("Failed to fetch total products");
  const products: Product[] = await res.json();
  return products.length;
}

export async function getPaginatedProducts(
  page: number,
  limit: number
): Promise<Product[]> {
  const res = await fetch(
    `https://fakestoreapi.com/products?limit=${limit}&offset=${
      (page - 1) * limit
    }`
  );
  if (!res.ok) throw new Error("Failed to fetch paginated products");
  return res.json();
}

export async function getAllCategories(): Promise<string[]> {
  const res = await fetch(`https://fakestoreapi.com/products/categories`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export async function getProductById(id: string): Promise<Product> {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product by ID");
  return res.json();
}
