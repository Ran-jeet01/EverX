import type { ProductDataType } from "@/types/product";

interface DbCartItem {
  id: number;
  userId: string;
  productId: string; // Changed from number to string (UUID)
  quantity: number;
  createdAt: string | null;
}

interface CartItem extends ProductDataType {
  cartItemId?: number;
  quantity: number;
}

export type { DbCartItem, CartItem };
