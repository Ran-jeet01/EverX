import type { ProductDataType, ProductResponse } from "@/types/product";
import { apiFetch } from "./api";

export const fetchProducts = async (): Promise<ProductResponse> => {
  return apiFetch<ProductResponse>("/products");
};
