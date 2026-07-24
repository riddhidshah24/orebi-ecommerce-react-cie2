import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface ProductItem {
  _id: string | number;
  productName: string;
  price: string | number;
  color?: string;
  badge?: boolean;
  img: string;
  des?: string;
  cat?: string;
  pdf?: string;
  quantity: number;
  [key: string]: any;
}

export interface UserProfile {
  name: string;
  email: string;
  clientName?: string;
  phone?: string;
  city?: string;
  address?: string;
  zip?: string;
  avatar?: string;
}

interface OrebiState {
  user: UserProfile | null;
  products: ProductItem[];
  loginUser: (user: UserProfile) => void;
  logoutUser: () => void;
  addToCart: (item: ProductItem) => void;
  increaseQuantity: (item: { _id: string | number }) => void;
  decreaseQuantity: (item: { _id: string | number }) => void;
  deleteItem: (_id: string | number) => void;
  resetCart: () => void;
}

export const useOrebiStore = create<OrebiState>()(
  persist(
    (set) => ({
      user: null,
      products: [],

      loginUser: (user) => set({ user }),
      logoutUser: () => set({ user: null }),

      addToCart: (item) =>
        set((state) => {
          const existingItem = state.products.find(
            (p) => String(p._id) === String(item._id)
          );
          if (existingItem) {
            return {
              products: state.products.map((p) =>
                String(p._id) === String(item._id)
                  ? { ...p, quantity: p.quantity + item.quantity }
                  : p
              ),
            };
          }
          return { products: [...state.products, item] };
        }),

      increaseQuantity: (item) =>
        set((state) => ({
          products: state.products.map((p) =>
            String(p._id) === String(item._id)
              ? { ...p, quantity: p.quantity + 1 }
              : p
          ),
        })),

      decreaseQuantity: (item) =>
        set((state) => ({
          products: state.products.map((p) => {
            if (String(p._id) === String(item._id)) {
              const newQty = p.quantity > 1 ? p.quantity - 1 : 1;
              return { ...p, quantity: newQty };
            }
            return p;
          }),
        })),

      deleteItem: (_id) =>
        set((state) => ({
          products: state.products.filter(
            (p) => String(p._id) !== String(_id)
          ),
        })),

      resetCart: () => set({ products: [] }),
    }),
    {
      name: "orebi-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
