"use client";

import Link from "next/link";
import { Button } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";

export default function NotFound() {
  return (
    <section className="my-30 flex items-center justify-center bg-white px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-orange-500 mb-4">404</h1>
        <p className="text-xl font-semibold text-gray-800 mb-2">
          Page Not Found
        </p>
        <p className="text-gray-600 mb-6">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <Link href="/">
          <Button
            leftSection={<IconArrowLeft size={16} />}
            color="orange"
            radius="md"
          >
            Go back home
          </Button>
        </Link>
      </div>
    </section>
  );
}
