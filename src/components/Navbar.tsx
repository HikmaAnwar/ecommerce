"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";
import { Burger, Drawer, Text, Button, Group } from "@mantine/core";
import { IconLogin, IconShoppingCart } from "@tabler/icons-react";
import { useCartStore } from "@/store/useCartStore";
import { supabase } from "@/lib/supabaseClient";

export default function Navbar() {
  const [opened, { toggle }] = useDisclosure(false);
  const pathname = usePathname();
  const [activePath, setActivePath] = useState<string | null>(null);
  const cart = useCartStore((s) => s.cart);

  //eslint-disable-next-line
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setActivePath(pathname);

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, [pathname]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("cart-storage");
    setUser(null);
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
  ];

  return (
    <header className="shadow-sm bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <div className="bg-orange-500 text-white font-bold px-2 py-1 rounded-md">
            E
          </div>
          <span className="font-semibold text-lg text-gray-900">Ecommerce</span>
        </Link>

        <Group gap="md" visibleFrom="sm">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`${
                activePath === link.href
                  ? "text-orange-500 font-medium"
                  : "text-gray-700 hover:text-orange-500"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </Group>

        <Group gap="sm" visibleFrom="sm">
          {user ? (
            <Button variant="default" size="xs" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Link href="/auth/login">
              <Button
                leftSection={<IconLogin size={16} />}
                variant="default"
                size="xs"
              >
                Login
              </Button>
            </Link>
          )}

          <Link href="/cart" className="relative inline-block">
            <IconShoppingCart
              className="text-gray-700 hover:text-orange-500"
              size={24}
            />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                {cart.length}
              </span>
            )}
          </Link>
        </Group>

        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" />
      </div>

      <Drawer
        opened={opened}
        onClose={toggle}
        title="Menu"
        padding="md"
        size="xs"
      >
        <div className="flex flex-col space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={toggle}
              className={`${
                activePath === link.href
                  ? "text-orange-500 font-medium"
                  : "text-gray-700 hover:text-orange-500"
              }`}
            >
              {link.name}
            </Link>
          ))}

          {user ? (
            <Text
              className="text-gray-700 hover:text-orange-500"
              onClick={() => {
                handleLogout();
                toggle();
              }}
            >
              Logout
            </Text>
          ) : (
            <Link
              href="/auth/login"
              className="text-gray-700 hover:text-orange-500"
              onClick={toggle}
            >
              Login
            </Link>
          )}

          <Link
            href="/cart"
            className="relative text-gray-700 hover:text-orange-500"
            onClick={toggle}
          >
            Cart
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full px-1">
                {cart.length}
              </span>
            )}
          </Link>
        </div>
      </Drawer>
    </header>
  );
}
