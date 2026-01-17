<script setup lang="ts">
import EmptyCart from "@/components/EmptyCart.vue";
import { ref, onMounted, computed } from "vue";
import { useCartStore } from "@/stores/cartStore";
const value: Boolean = false;

const cartStore = useCartStore();

// Accessing  item
const cartItems = computed(() => cartStore.items);
console.log(cartItems.value);

// removing the value individually
const removeFromCart = cartStore.removeFromCart;
const increaseQuantity = cartStore.increaseQuantity;
const decreaseQuantity = cartStore.decreaseQuantity;
</script>

<template>
  <!-- <div v-if="cartItems> -->
  <div v-if="cartItems.length === 0">
    <EmptyCart />
  </div>
  <div v-else class="page-container container main-padding">
    <h1 class="section-title">Your Cart</h1>
    <div class="cart-layout">
      <div class="cart-items">
        <div v-for="item in cartItems" :key="item.title" class="cart-item">
          <div class="cart-item-img-box">
            <img :src="item.image" :alt="item.title" />
          </div>

          <div class="cart-item-info">
            <div class="item-header">
              <h3>{{ item.title }}</h3>
              <p class="item-price">{{ item.price }}</p>
            </div>

            <div class="item-actions">
              <div class="quantity-controls">
                <button class="qty-btn" @click="decreaseQuantity(item.id)">
                  <Icon name="ri:subtract-line" size="24" />
                </button>
                <span class="qty-display">{{ item.quantity }}</span>
                <button class="qty-btn" @click="increaseQuantity(item.id)">
                  <Icon name="ri:add-line" size="24" />
                </button>
              </div>
              <button class="remove-btn" @click="removeFromCart(item.id)">
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="cart-summary">
        <h2>Order Summary</h2>
        <div class="summary-row">
          <span>Total Product</span>
          <span>{{ cartItems.length }}</span>
        </div>
        <div class="summary-row total">
          <span>Total</span>
          <span>${{ cartStore.totalPrice }}</span>
        </div>
        <button
          @click="cartStore.clearCart"
          class="btn btn-primary checkout-btn"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-padding {
  padding-top: calc(var(--header-height) + 2rem);
}

.cart-layout {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 3rem;
  margin-top: 2rem;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.cart-item {
  display: flex;
  gap: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
}

.cart-item-img-box {
  width: 120px;
  height: 120px;
  flex-shrink: 0;
  background: #f1f5f9;
}

.cart-item-img-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cart-item-info {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.item-header h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.item-price {
  color: #64748b;
  font-family: monospace;
  font-weight: 600;
}

.item-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
}

.quantity-controls {
  display: flex;
  align-items: center;
  border: 1px solid #e2e8f0;
}

.qty-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border: none;
  cursor: pointer;
  color: #475569;
  transition: all 0.2s;
}

.qty-btn:hover {
  background: #f8fafc;
  color: black;
}

.qty-display {
  width: 40px;
  text-align: center;
  font-size: 0.9rem;
  font-weight: 500;
}

.remove-btn {
  background: none;
  border: none;
  color: #ef4444;
  font-size: 0.85rem;
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
}

.remove-btn:hover {
  color: #dc2626;
}

/* Summary */
.cart-summary {
  background: #f8fafc;
  padding: 2rem;
  height: fit-content;
  border: 1px solid #e2e8f0;
}

.cart-summary h2 {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  color: #475569;
}

.summary-row.total {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
  font-weight: 700;
  color: black;
  font-size: 1.1rem;
}

.checkout-btn {
  width: 100%;
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
}

@media (max-width: 768px) {
  .cart-layout {
    grid-template-columns: 1fr;
  }
}
</style>
