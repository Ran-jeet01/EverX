<script setup lang="ts">
import type { ProductDataType } from "@/types/product";

const { product } = defineProps<{
  product: ProductDataType;
}>();

const emit = defineEmits<{
  (e: "add-to-cart", product: ProductDataType): void;
}>();
</script>

<template>
  <div class="product-card">
    <div class="product-img-box">
      <img
        :src="product.image"
        :alt="product.title || 'Product image'"
        loading="lazy"
      />
    </div>
    <div class="product-info">
      <h3>{{ product.title }}</h3>
      <div class="product-action">
        <span class="price">{{ product.price }}</span>
        <button
          class="btn btn-primary addToCart"
          @click="emit('add-to-cart', product)"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  background: white;
  border-radius: 0;
  overflow: hidden;
  box-shadow: none;
  border: 1px solid #e2e8f0;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  position: relative;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 4px 4px 0px 0px var(--primary-color);
  border-color: var(--primary-color);
}

.product-img-box {
  height: 320px;
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid #e2e8f0;
}

.product-img-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.product-card:hover .product-img-box img {
  transform: scale(1.05);
}

.addToCart {
  border-radius: 0;
  border-width: 1px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  font-size: 0.75rem;
  padding: 0.5rem 1rem;
  background: white;
  color: black;
  border: 1px solid black;
  transition: all 0.2s;
}

.addToCart:hover {
  background: black;
  color: white;
  box-shadow: 2px 2px 0 0 rgba(0, 0, 0, 0.2);
}

.product-info {
  padding: 1.25rem;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
}

.product-info h3 {
  font-size: 1.15rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--primary-color);
  letter-spacing: -0.01em;
  text-transform: none;
}

.product-action {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.price {
  font-weight: 600;
  color: #475569;
  font-size: 1rem;
  font-family: monospace;
}
</style>
<!-- things to improve is to pass only required stuff -->
