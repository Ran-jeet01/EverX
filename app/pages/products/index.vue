<script setup lang="ts">
import ProductCard from "@/components/ProductCard.vue";
import type { ProductDataType } from "@/types/product";
import { useProductsStore } from "@/stores/productsStore";
import { useCartStore } from "@/stores/cartStore";

const productsStore = useProductsStore();
const cartStore = useCartStore();
const route = useRoute();
const router = useRouter();

const loading = ref(true);
const categories = ["All", "Hoodie", "Tshirt", "Pant", "Jacket"];

// Read state from URL
const selectedCategory = computed(() => (route.query.category as string) || "All");
const currentPage = computed(() => parseInt(route.query.page as string) || 1);

const handleAddToCart = (product: ProductDataType) => {
  cartStore.addToCart(product);
};

const filterByCategory = (category: string) => {
  const query: any = { ...route.query, page: 1 };
  if (category === "All") {
    delete query.category;
  } else {
    query.category = category;
  }
  router.push({ query });
};

const changePage = (page: number) => {
  router.push({
    query: { ...route.query, page },
  });
};

// Watch for route changes to fetch data
watch(
  () => [route.query.category, route.query.page],
  async () => {
    loading.value = true;
    try {
      await productsStore.loadProducts(selectedCategory.value, currentPage.value);
      // Scroll to top if  page index change
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      loading.value = false;
    }
  },
  { immediate: true }
);
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

    <div v-else>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-16"
      >
        <ProductCard
          v-for="product in productsStore.products"
          :key="product.id"
          :product="product"
          @add-to-cart="handleAddToCart"
        />
      </div>

      <!-- Pagination UI -->
      <div
        v-if="productsStore.totalPages > 1"
        class="flex justify-center items-center gap-2 pb-16"
      >
        <button
          @click="changePage(currentPage - 1)"
          :disabled="currentPage === 1"
          class="p-2 rounded-md border border-slate-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        <div class="flex items-center gap-1">
          <button
            v-for="page in productsStore.totalPages"
            :key="page"
            @click="changePage(page)"
            class="w-10 h-10 rounded-md border text-sm font-medium transition-all duration-200"
            :class="[
              currentPage === page
                ? 'bg-black text-white border-black'
                : 'bg-white text-slate-600 border-slate-200 hover:border-black hover:text-black',
            ]"
          >
            {{ page }}
          </button>
        </div>

        <button
          @click="changePage(currentPage + 1)"
          :disabled="currentPage === productsStore.totalPages"
          class="p-2 rounded-md border border-slate-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
