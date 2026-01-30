<script setup lang="ts">
import ProductCard from "@/components/ProductCard.vue";
import type { ProductDataType } from "@/types/product";
import { useProductsStore } from "@/stores/productsStore";
import { useCartStore } from "@/stores/cartStore";

const productsStore = useProductsStore();
const cartStore = useCartStore();

const loading = ref(true);
const selectedCategory = ref("All");

const categories = ["All", "Hoodie", "Tshirt", "Pant", "Jacket"];

const handleAddToCart = (product: ProductDataType) => {
  cartStore.addToCart(product);
};

const filterByCategory = async (category: string) => {
  selectedCategory.value = category;
  loading.value = true;
  try {
    await productsStore.loadProducts(category);
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  try {
    await productsStore.loadProducts("All");
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="page-container container pt-[calc(var(--header-height)+2rem)]">
    <h1 class="section-title">Our Products</h1>
    <p class="section-subtitle">Explore our full catalog.</p>

    <!-- Category Selection -->
    <div class="flex flex-wrap items-center justify-center gap-4 mb-12">
      <button
        v-for="cat in categories"
        :key="cat"
        @click="filterByCategory(cat)"
        class="px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 border-2"
        :class="[
          selectedCategory === cat
            ? 'bg-black text-white border-black'
            : 'bg-transparent text-slate-600 border-slate-200 hover:border-black hover:text-black',
        ]"
      >
        {{ cat }}
      </button>
    </div>

    <div v-if="loading" class="text-center py-16 text-lg text-slate-500">
      Loading products...
    </div>

    <div
      v-else-if="productsStore.products.length === 0"
      class="text-center py-16 text-lg text-slate-500"
    >
      No products found in this category.
    </div>

    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-16"
    >
      <ProductCard
        v-for="product in productsStore.products"
        :key="product.id"
        :product="product"
        @add-to-cart="handleAddToCart"
      />
    </div>
  </div>
</template>
