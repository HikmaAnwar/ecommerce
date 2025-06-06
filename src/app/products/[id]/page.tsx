"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProductById } from "@/lib/api";
import {
  Title,
  Text,
  Button,
  Container,
  Skeleton,
  Paper,
  Badge,
  Box,
} from "@mantine/core";
import { useCartStore } from "@/store/useCartStore";
import { Product } from "@/types/product";
import Image from "next/image";
import { IconStarFilled } from "@tabler/icons-react";
import { supabase } from "@/lib/supabaseClient";
import type { Session } from "@supabase/supabase-js";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const addToCart = useCartStore((s) => s.addToCart);

  useEffect(() => {
    if (id) {
      getProductById(id.toString())
        .then((data: Product) => {
          setProduct(data);
          setLoading(false);
        })
        .catch(console.error);
    }
  }, [id]);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
    };

    getSession();
  }, []);

  if (loading || !product) {
    return (
      <Container py="lg">
        <div className="flex flex-col md:flex-row gap-10">
          <Skeleton height={500} width="100%" />
          <div className="flex-1 space-y-4">
            <Skeleton height={32} width="80%" />
            <Skeleton height={20} width="100%" />
            <Skeleton height={20} width="90%" />
            <Skeleton height={28} width="30%" />
            <Skeleton height={40} width="40%" radius="xl" />
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container py="lg">
      <Title order={2} ta="center">
        Product Detail
      </Title>
      <Paper
        shadow="sm"
        radius="md"
        p="md"
        mt={50}
        className="border-1 border-gray-400"
      >
        <Box className="flex flex-col md:flex-row gap-10">
          <Image
            src={product.image}
            alt={product.title}
            height={100}
            width={300}
          />
          <div className="flex-1">
            <Title order={2} mb="xs">
              {product.title}
            </Title>
            <Badge color="gray" variant="light" size="lg" mb="sm">
              {product.category}
            </Badge>
            <Text size="sm" c="dimmed" mb="md">
              {product.description}
            </Text>
            <Text size="xl" fw={700} mb="md">
              Price - ${product.price}
            </Text>
            <Text size="sm" fw={400} mb="md">
              <IconStarFilled
                size={16}
                color="gold"
                className="inline-block mr-2"
              />
              Rating - {product.rating.rate} ({product.rating.count} reviews)
            </Text>
            <Button
              size="md"
              color="orange"
              radius="xl"
              onClick={() => addToCart(product)}
              disabled={!session}
            >
              {session ? "Add to Cart" : "Login to Add"}
            </Button>
            {!session && (
              <Text size="sm" c="dimmed" mt="sm">
                Please{" "}
                <a href="/auth/login" className="text-blue-500 hover:underline">
                  log in
                </a>{" "}
                to add items to your cart.
              </Text>
            )}
          </div>
        </Box>
      </Paper>
    </Container>
  );
}
