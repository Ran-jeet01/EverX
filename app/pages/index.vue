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
  <div class="home-page fade-in">
    <!-- Hero Section -->
    <section class="hero">
      <div class="container hero-content">
        <div class="hero-text animate-fade-in">
          <span class="hero-subtitle">New Collection 2025</span>
          <h1 class="hero-title">
            Elevate Your <br />
            Lifestyle
          </h1>
          <p class="hero-desc">
            Discover our curated selection of premium essentials designed to
            inspire and endure. Limited edition pieces available now.
          </p>
          <div class="hero-cta">
            <NuxtLink to="/products" class="btn btn-primary">
              Shop Collection
            </NuxtLink>
            <NuxtLink to="/about" class="btn btn-outline"> Our Story </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="featured section-padding">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Trending Now</h2>
          <p class="section-subtitle">Handpicked favorites just for you.</p>
        </div>

        <div v-if="loading" class="text-center py-8">Loading products...</div>
        <div v-else-if="products.length === 0" class="text-center py-8">
          No products available.
        </div>

        <div v-else class="product-grid">
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

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url("/x.jpg");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  position: relative;
  overflow: hidden;
  color: white;
  text-align: center;
}
.hero-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;
}
.hero-text {
  width: 100%;
}
.hero-subtitle {
  text-transform: uppercase;
  letter-spacing: 4px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 1.5rem;
  display: block;
  font-size: 1rem;
}
.hero-title {
  font-size: 5rem;
  line-height: 1;
  color: white;
  margin-bottom: 2rem;
  font-weight: 800;
  text-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}
.hero-desc {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}
.hero-cta {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
}
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2.5rem;
  font-weight: 600;
  border-radius: 50px;
  transition: all 0.3s ease;
  text-decoration: none;
  font-size: 1rem;
}
.btn-primary {
  background: white;
  color: black;
  border: 2px solid white;
}
.btn-primary:hover {
  background: transparent;
  color: white;
}
.btn-outline {
  border: 2px solid rgba(255, 255, 255, 0.8);
  color: white;
  background: transparent;
}
.btn-outline:hover {
  background: white;
  color: black;
  border-color: white;
}

.section-padding {
  padding: 6rem 0;
}
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
  .hero-title {
    font-size: 2.5rem;
  }
  .hero-cta {
    justify-content: center;
  }
  .hero-desc {
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
