import type { ProductDataType, ProductResponse } from "@/types/product";
import { apiFetch } from "./api";

export const fetchProducts = async (
  category?: string,
  page: number = 1,
  limit: number = 9
): Promise<ProductResponse> => {
  const query: any = { page, limit };
  if (category && category !== "All") {
    query.category = category;
  }
  return $fetch<ProductResponse>("/api/products", {
    query,
  });
};
