"use client";

import {
  Container,
  Title,
  Button,
  Text,
  Card,
  Stack,
  Group,
  Divider,
  Badge,
  Alert,
} from "@mantine/core";
import {
  IconTrash,
  IconShoppingCart,
  IconInfoCircle,
} from "@tabler/icons-react";
import { useCartStore } from "@/store/useCartStore";
import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { Session } from "@supabase/supabase-js";

export default function CartPage() {
  const cart = useCartStore((s) => s.cart);
  const removeFromCart = useCartStore((s) => s.removeFromCart);
  const clearCart = useCartStore((s) => s.clearCart);

  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
    };

    getSession();
  }, []);

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);

  return (
    <Container py="xl" size="lg" my={20} className="mx-auto">
      <Title order={2} className="text-3xl font-semibold text-center mb-8">
        Your Shopping Cart
      </Title>

      {!session && (
        <Alert
          icon={<IconInfoCircle />}
          title="You are not logged in"
          color="yellow"
          radius="md"
          mb="lg"
        >
          Please{" "}
          <a href="/auth/login" className="text-blue-600 underline">
            log in
          </a>{" "}
          to save your cart and proceed to checkout.
        </Alert>
      )}

      {cart.length === 0 ? (
        <Card shadow="sm" padding="xl" radius="md" withBorder mt={20} py={60}>
          <Stack align="center" gap="md">
            <IconShoppingCart size={48} stroke={1.5} color="gray" />
            <Text size="lg" c="dimmed">
              Your cart is empty.
            </Text>
            <Button color="orange" radius="md" component="a" href="/products">
              Start Shopping
            </Button>
          </Stack>
        </Card>
      ) : (
        <>
          <Stack gap="sm" mt={30}>
            {cart.map((item) => (
              <Card
                key={item.id}
                shadow="xs"
                padding="sm"
                radius="sm"
                withBorder
                className="flex flex-col sm:flex-row sm:items-center sm:gap-3 w-1/2 mx-auto"
              >
                <Group wrap="nowrap" gap="xs">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={100}
                    height={50}
                  />
                  <Stack gap={2} className="flex-1 ml-10">
                    <Text
                      size="sm"
                      fw={500}
                      className="truncate"
                      title={item.title}
                    >
                      {item.title}
                    </Text>
                    <Badge color="orange" variant="light" size="sm">
                      ${item.price.toFixed(2)}
                    </Badge>
                  </Stack>
                </Group>
                <Button
                  color="red"
                  variant="outline"
                  radius="sm"
                  size="xs"
                  leftSection={<IconTrash size={14} />}
                  onClick={() => removeFromCart(item.id)}
                  className="mt-3 sm:mt-0 sm:ml-auto"
                >
                  Remove
                </Button>
              </Card>
            ))}
          </Stack>

          <Divider my="lg" />

          <Group justify="space-between" align="center" mb="lg">
            <Text size="xl" fw={700}>
              Total: ${totalPrice}
            </Text>
            <Group gap="sm">
              <Button
                color="orange"
                variant="outline"
                radius="md"
                onClick={clearCart}
              >
                Clear Cart
              </Button>
              <Button
                color="orange"
                radius="md"
                leftSection={<IconShoppingCart size={16} />}
                disabled={!session}
              >
                Proceed to Checkout
              </Button>
            </Group>
          </Group>
        </>
      )}
    </Container>
  );
}
