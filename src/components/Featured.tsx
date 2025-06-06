import {
  Container,
  Title,
  Text,
  Card,
  Image,
  Grid,
  Button,
  Badge,
  Skeleton,
} from "@mantine/core";
import { IconEye } from "@tabler/icons-react";
import { Product } from "@/types/product";
import { useRouter } from "next/navigation";

export default function FeaturedProductsSection({
  products = [],
  isLoading = false,
}: {
  products?: Product[];
  isLoading?: boolean;
}) {
  const router = useRouter();
  const displayedProducts = products.slice(0, 8);
  const showSkeleton = isLoading || !products || displayedProducts.length === 0;

  return (
    <section className="py-16">
      <Container>
        <Title order={2} className="text-3xl font-semibold text-center mb-4">
          Featured Products
        </Title>
        <Text className="text-center text-gray-600 mb-8">
          Handpicked favorites for your home
        </Text>
        <Grid gutter="lg" justify="center" className="mt-10">
          {showSkeleton
            ? Array(8)
                .fill(0)
                .map((_, index) => (
                  <Grid.Col
                    key={index}
                    span={{ base: 12, sm: 6, md: 4, lg: 3 }}
                  >
                    <Card
                      shadow="sm"
                      padding="lg"
                      radius="md"
                      withBorder
                      className="h-full flex flex-col justify-between"
                    >
                      <Card.Section className="p-5">
                        <Skeleton height={20} width="40%" mb={8} />
                        <Skeleton height={100} width="100%" />
                      </Card.Section>
                      <Skeleton height={20} width="60%" mt={16} />
                      <Skeleton height={20} width="30%" mt={8} />
                      <Skeleton height={36} width="100%" mt={16} />
                    </Card>
                  </Grid.Col>
                ))
            : displayedProducts.map((product, index) => (
                <Grid.Col key={index} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
                  <Card
                    shadow="sm"
                    padding="lg"
                    radius="md"
                    withBorder
                    className="h-full flex flex-col justify-between"
                  >
                    <Card.Section className="p-5">
                      <Badge
                        variant="light"
                        color="orange"
                        className="mb-2 truncate max-w-full"
                      >
                        {product.category.length > 20
                          ? product.category.slice(0, 20) + "..."
                          : product.category}
                      </Badge>
                      <Image
                        src={product.image}
                        height={100}
                        alt={product.title}
                        fit="contain"
                      />
                    </Card.Section>

                    <Text
                      className="mt-4 text-lg font-semibold truncate"
                      title={product.title}
                    >
                      {product.title}
                    </Text>

                    <Text className="mt-2 text-xl font-bold">
                      ${product.price.toFixed(2)}
                    </Text>

                    <Button
                      fullWidth
                      radius="md"
                      color="orange"
                      className="mt-4"
                      leftSection={<IconEye size={16} />}
                      onClick={() => {
                        router.push(`/products/${product.id}`);
                      }}
                    >
                      View Details
                    </Button>
                  </Card>
                </Grid.Col>
              ))}
        </Grid>

        <div className="text-center mt-10">
          <Button variant="outline" radius="md" color="orange">
            View All Products
          </Button>
        </div>
      </Container>
    </section>
  );
}
