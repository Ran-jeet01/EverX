import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { fetchProducts } from "@/service/products.service";
import type { ProductResponse, ProductDataType } from "@/types/product";

export const useProductsStore = defineStore("products", () => {
  const products = ref<ProductDataType[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const totalCount = ref(0);
  const totalPages = ref(0);
  const currentPage = ref(1);

  const loadProducts = async (category?: string, page: number = 1, limit: number = 9) => {
    loading.value = true;
    try {
      const response = await fetchProducts(category, page, limit);
      products.value = response.products;
      totalCount.value = response.totalCount;
      totalPages.value = response.totalPages;
      currentPage.value = response.currentPage;
    } catch (err) {
      error.value = "Failed to load products";
    } finally {
      loading.value = false;
    }
  };

  return {
    products,
    loading,
    error,
    totalCount,
    totalPages,
    currentPage,
    loadProducts
  };
});
