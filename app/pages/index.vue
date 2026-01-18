<script setup lang="ts">
import { useProductsStore } from "~/stores/productsStore";
import { useCartStore } from "~/stores/cartStore";
import type { ProductDataType } from "~/types/product";
import type { CartItem } from "~/types/cart";

const productsStore = useProductsStore();
const cartStore = useCartStore();

const products = ref<ProductDataType[]>([]);
const loading = ref(true);

// Add to cart handler
const handleAddToCart = (product: ProductDataType) => {
  const cartItem: CartItem = { ...product, quantity: 1 };
  cartStore.addToCart(cartItem);
};

// Fetch products on mount (client-side)
onMounted(async () => {
  loading.value = true;
  try {
    await productsStore.loadProducts();
    products.value = productsStore.products;
  } catch (error) {
    console.error("Failed to load products:", error);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="animate-[fadeIn_0.5s_ease-out]">
    <!-- Hero Section -->
    <section 
      class="min-h-screen flex items-center justify-center bg-fixed bg-cover bg-center relative overflow-hidden text-white text-center"
      style="background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('/x.jpg')"
    >
      <div class="container flex flex-col items-center gap-8 z-10 max-w-[800px] mx-auto">
        <div class="w-full animate-[fadeIn_0.8s_ease_forwards]">
          <span class="uppercase tracking-[4px] font-semibold text-white/90 mb-6 block text-base">New Collection 2025</span>
          <h1 class="text-[2.5rem] md:text-[5rem] leading-none text-white mb-8 font-extrabold drop-shadow-lg">
            Elevate Your <br />
            Lifestyle
          </h1>
          <p class="text-xl text-white/90 mb-12 max-w-[600px] mx-auto leading-relaxed">
            Discover our curated selection of premium essentials designed to
            inspire and endure. Limited edition pieces available now.
          </p>
          <div class="flex gap-6 justify-center">
            <NuxtLink to="/products" class="inline-flex items-center justify-center px-10 py-4 font-semibold rounded-full transition-all duration-300 no-underline text-base bg-white text-black border-2 border-white hover:bg-transparent hover:text-white">
              Shop Collection
            </NuxtLink>
            <NuxtLink to="/about" class="inline-flex items-center justify-center px-10 py-4 font-semibold rounded-full transition-all duration-300 no-underline text-base border-2 border-white/80 text-white bg-transparent hover:bg-white hover:text-black hover:border-white"> Our Story </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="py-24">
      <div class="container">
        <div class="text-center mb-16">
          <h2 class="section-title">Trending Now</h2>
          <p class="section-subtitle">Handpicked favorites just for you.</p>
        </div>

        <div v-if="loading" class="text-center py-8">Loading products...</div>
        <div v-else-if="products.length === 0" class="text-center py-8">
          No products available.
        </div>

        <div v-else class="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8">
          <ProductCard
            v-for="product in products.slice(0, 6)"
            :key="product.id"
            :product="product"
            @add-to-cart="handleAddToCart"
          />
        </div>
      </div>
    </section>
  </div>
</template>
