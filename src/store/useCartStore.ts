import { create } from "zustand";
import { persist } from "zustand/middleware";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

type CartState = {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (product) => set({ cart: [...get().cart, product] }),
      removeFromCart: (id) =>
        set({ cart: get().cart.filter((item) => item.id !== id) }),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart-storage", 
    }
  )
);
