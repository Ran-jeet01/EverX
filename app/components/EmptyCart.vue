<script setup></script>

<template>
  <div class="page-container container pt-[calc(var(--header-height)+2rem)]">
    <h1 class="section-title">Your Cart</h1>
    <div class="text-center py-16">
      <i class="ri-shopping-cart-2-line text-6xl text-text-secondary"></i>
      <p class="mt-4 text-text-secondary">Your cart is currently empty.</p>
      <NuxtLink to="/products" class="btn btn-primary mt-8"
        >Start Shopping</NuxtLink
      >
    </div>
  </div>
</template>
