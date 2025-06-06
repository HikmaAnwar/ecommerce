'use client";';

import { Container, Title, Text, Button, Group } from "@mantine/core";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();
  return (
    <section className="bg-[#FFF3E5] py-24 text-center">
      <Container className="flex flex-col items-center justify-center text-center">
        <Title
          order={1}
          className="text-4xl md:text-5xl font-bold text-[#1A3C5A]"
        >
          Transform Your <br /> Home Space
        </Title>
        <Text className="mt-4 text-base md:text-lg text-[#1A3C5A] max-w-xl mx-auto">
          Discover curated home essentials that blend style, comfort, and
          functionality. Create the perfect living space you’ve always dreamed
          of.
        </Text>
        <Group
          gap="md"
          align="center"
          className="mt-8 flex-wrap justify-center"
        >
          <Button
            size="lg"
            radius="md"
            className=" text-white"
            color="orange"
            onClick={() => router.push("/products")}
          >
            Shop Now
          </Button>
          <Button
            size="lg"
            radius="md"
            variant="outline"
            color="orange"
            onClick={() => router.push("/products")}
          >
            View Collections
          </Button>
        </Group>
      </Container>
    </section>
  );
}
