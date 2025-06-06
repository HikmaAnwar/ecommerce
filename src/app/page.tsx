"use client";

import { useEffect, useState } from "react";
import { getPaginatedProducts } from "@/lib/api";
import HeroSection from "@/components/Hero";
import FeaturedProductsSection from "@/components/Featured";
import { Product } from "@/types/product";

export default function HomePage() {
  const [products, setProducts] = useState([] as Product[]);

  useEffect(() => {
    const fetchData = async () => {
      const productsData = await getPaginatedProducts(1, 4);
      setProducts(productsData || []);
    };
    fetchData();
  }, []);

  return (
    <div className="bg-gray-50">
      <HeroSection />
      <FeaturedProductsSection products={products} />
    </div>
  );
}
