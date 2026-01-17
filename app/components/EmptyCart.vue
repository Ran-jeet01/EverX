<script setup></script>

<template>
  <div class="page-container container main-padding">
    <h1 class="section-title">Your Cart</h1>
    <div class="empty-cart-state">
      <i class="ri-shopping-cart-2-line cart-icon"></i>
      <p class="cart-msg">Your cart is currently empty.</p>
      <NuxtLink to="/products" class="btn btn-primary start-shopping-btn"
        >Start Shopping</NuxtLink
      >
    </div>
  </div>
</template>

<style scoped>
.main-padding {
  padding-top: calc(var(--header-height) + 2rem);
}

.empty-cart-state {
  text-align: center;
  padding: 4rem 0;
}

.cart-icon {
  font-size: 4rem;
  color: var(--text-secondary);
}

.cart-msg {
  margin-top: 1rem;
  color: var(--text-secondary);
}

.start-shopping-btn {
  margin-top: 2rem;
}
</style>
