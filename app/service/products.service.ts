import type { ProductDataType, ProductResponse } from "@/types/product";
import { apiFetch } from "./api";

export const fetchProducts = async (category?: string): Promise<ProductResponse> => {
  const query = category && category !== 'All' ? { category } : {};
  return $fetch<ProductResponse>("/api/products", {
    query
  });
};
