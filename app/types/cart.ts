import type { ProductDataType } from "@/types/product";

interface DbCartItem {
  id: number;
  userId: string;
  productId: number;
  quantity: number;
  createdAt: string | null;
}

interface CartItem extends ProductDataType {
  cartItemId?: number; // Optional because UI might create optimistic items
  quantity: number;
}

export type { DbCartItem, CartItem };
