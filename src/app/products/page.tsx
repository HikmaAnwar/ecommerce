"use client";

import {
  Container,
  Title,
  Text,
  SimpleGrid,
  Button,
  Card,
  Pagination,
  Chip,
  Skeleton,
  TextInput,
  NumberInput,
  Group,
} from "@mantine/core";
import { useEffect, useState } from "react";
import {
  getPaginatedProducts,
  getTotalProducts,
  getAllCategories,
} from "@/lib/api";
import { Product } from "@/types/product";
import Image from "next/image";

const PRODUCTS_PER_PAGE = 4;

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const data = await getPaginatedProducts(currentPage, PRODUCTS_PER_PAGE);
      setProducts(data);
      setLoading(false);
    };
    fetchProducts();
    getAllCategories().then(setCategories);
  }, [currentPage]);

  useEffect(() => {
    let filtered = products;

    if (selectedCategory !== "All") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (minPrice !== undefined) {
      filtered = filtered.filter((p) => p.price >= minPrice);
    }
    if (maxPrice !== undefined) {
      filtered = filtered.filter((p) => p.price <= maxPrice);
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, searchQuery, minPrice, maxPrice, products]);

  useEffect(() => {
    const fetchTotal = async () => {
      const res = await getTotalProducts();
      setTotalProducts(res);
    };
    fetchTotal();
  }, []);

  return (
    <Container py="xl">
      <Title order={2} ta="center">
        Our Products
      </Title>
      <Text ta="center" c="dimmed" mt="xs">
        Discover beautiful home essentials for every space
      </Text>

      <Group mt="md" mb="xl" justify="center" gap="md">
        <TextInput
          placeholder="Search products..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.currentTarget.value)}
          style={{ width: 200 }}
        />
        <NumberInput
          placeholder="Min price"
          value={minPrice}
          onChange={(value) =>
            setMinPrice(typeof value === "number" ? value : undefined)
          }
          min={0}
          style={{ width: 120 }}
          allowNegative={false}
        />
        <NumberInput
          placeholder="Max price"
          value={maxPrice}
          onChange={(value) =>
            setMaxPrice(typeof value === "number" ? value : undefined)
          }
          min={0}
          style={{ width: 120 }}
          allowNegative={false}
        />
      </Group>

      <div className="flex justify-center gap-2 mt-6 flex-wrap">
        <Chip
          checked={selectedCategory === "All"}
          onClick={() => setSelectedCategory("All")}
          color="orange"
        >
          All
        </Chip>
        {categories.length > 0 &&
          categories.map((cat) => (
            <Chip
              key={cat}
              checked={selectedCategory === cat}
              onClick={() => setSelectedCategory(cat)}
              color="orange"
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </Chip>
          ))}
      </div>

      <SimpleGrid mt="xl" cols={{ base: 1, sm: 2, md: 4 }} spacing="xl">
        {loading
          ? Array.from({ length: PRODUCTS_PER_PAGE }).map((_, index) => (
              <Card key={index} shadow="sm" padding="lg" radius="md" withBorder>
                <Skeleton height={200} />
                <Skeleton height={20} mt="sm" />
                <Skeleton height={16} mt="xs" width="80%" />
              </Card>
            ))
          : filteredProducts.map((product) => (
              <Card key={product.id} radius="md" shadow="sm" withBorder>
                <Card.Section>
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={300}
                    height={200}
                    style={{ objectFit: "contain", width: "100%", height: 200 }}
                  />
                </Card.Section>
                <div className="p-2">
                  <Text fw={700} size="lg" lineClamp={2}>
                    {product.title}
                  </Text>
                  <Text c="dimmed" size="sm" mt={4}>
                    {product.category}
                  </Text>
                  <Text fw={700} size="md" mt={6}>
                    ${product.price}
                  </Text>
                  <Button
                    fullWidth
                    mt="md"
                    color="orange"
                    component="a"
                    href={`/products/${product.id}`}
                  >
                    View
                  </Button>
                </div>
              </Card>
            ))}
      </SimpleGrid>

      {totalProducts > PRODUCTS_PER_PAGE && (
        <div className="flex justify-center mt-10">
          <Pagination
            value={currentPage}
            onChange={setCurrentPage}
            total={Math.ceil(totalProducts / PRODUCTS_PER_PAGE)}
            color="orange"
            size="md"
            radius="md"
          />
        </div>
      )}
    </Container>
  );
}
