<script setup lang="ts">
import ProductCard from "@/components/ProductCard.vue";
import type { ProductDataType } from "@/types/product";
import type { CartItem } from "@/types/cart";
import { useProductsStore } from "@/stores/productsStore";
import { useCartStore } from "@/stores/cartStore";

//  store ko instance for the product and cart

const productsStore = useProductsStore();
const cartStore = useCartStore();

const loading = ref(true);

const handleAddToCart = (product: ProductDataType) => {
  cartStore.addToCart(product);
};

onMounted(async () => {
  try {
    await productsStore.loadProducts();
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="page-container container pt-[calc(var(--header-height)+2rem)]">
    <h1 class="section-title">Our Products</h1>
    <p class="section-subtitle">Explore our full catalog.</p>

    <div v-if="loading" class="text-center py-16 text-lg text-slate-500">
      Loading products...
    </div>

    <div
      v-else
      class="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8 pb-16"
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
