import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { fetchProducts } from "@/service/products.service";
import type { ProductResponse, ProductDataType } from "@/types/product";

export const useProductsStore = defineStore("products", () => {
  // const products = ref<ProductResponse>([]);
  const products = ref<ProductDataType[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const loadProducts = async (category?: string) => {
    // If we already have products and NO category filter is requested, don't refetch
    if (products.value.length && !category) return;

    loading.value = true;
    try {
      products.value = await fetchProducts(category);
    } catch (err) {
      error.value = "Failed to load products";
    } finally {
      loading.value = false;
    }
  };

  return { products, loading, error, loadProducts };
});
