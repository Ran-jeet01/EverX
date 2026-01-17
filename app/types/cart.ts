import type { ProductDataType } from "@/types/product";

interface CartItem extends ProductDataType {
  quantity: number;
}
export type { CartItem };
