"use client";

import { Container, Title, Text, Grid } from "@mantine/core";
import { IconHeadphones, IconBuilding, IconLink } from "@tabler/icons-react";

const Footer = () => {
  return (
    <footer className="bg-[#1A3C5A] py-12 text-white">
      <Container>
        <Grid gutter="xl" justify="center">
          <Grid.Col span={{ base: 12, sm: 4 }} className="text-center px-4">
            <div className="flex flex-col items-center">
              <IconHeadphones size={28} className="mb-2" />
              <Title order={4} className="mb-3 text-white">
                Customer Service
              </Title>
              <Text size="sm" className="mb-1">
                Help Center
              </Text>
              <Text size="sm" className="mb-1">
                Returns
              </Text>
              <Text size="sm">Shipping Info</Text>
            </div>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 4 }} className="text-center px-4">
            <div className="flex flex-col items-center">
              <IconBuilding size={28} className="mb-2" />
              <Title order={4} className="mb-3 text-white">
                Company
              </Title>
              <Text size="sm" className="mb-1">
                About Us
              </Text>
              <Text size="sm" className="mb-1">
                Careers
              </Text>
              <Text size="sm">Press</Text>
            </div>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 4 }} className="text-center px-4">
            <div className="flex flex-col items-center">
              <IconLink size={28} className="mb-2" />
              <Title order={4} className="mb-3 text-white">
                Connect
              </Title>
              <Text size="sm" className="mb-1">
                Newsletter
              </Text>
              <Text size="sm" className="mb-1">
                Social Media
              </Text>
              <Text size="sm">Blog</Text>
            </div>
          </Grid.Col>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
