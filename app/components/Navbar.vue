<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useCartStore } from "@/stores/cartStore";

const cart = useCartStore();
const route = useRoute();

const open = ref(false);
const y = ref(0);

const solidNav = computed(
  () => y.value > 40 || !["/", "/about"].includes(route.path)
);

const count = computed(() => cart.items?.length || 0);

const toggle = () => (open.value = !open.value);
const close = () => (open.value = false);

const onScroll = () => (y.value = window.scrollY);

onMounted(() => window.addEventListener("scroll", onScroll, { passive: true }));
onUnmounted(() => window.removeEventListener("scroll", onScroll));

watch(() => route.path, close);
</script>

<template>
  <header :class="['navbar', { solid: solidNav }]">
    <div class="container navbar-content">
      <!-- Left side  Store and Product -->
      <div class="nav-left">
        <NuxtLink to="/" class="nav-link">Store</NuxtLink>
        <NuxtLink to="/products" class="nav-link">Product</NuxtLink>
      </div>

      <!-- Center side onlyy Logo -->
      <NuxtLink to="/" class="logo">
        Ever
        <img src="~/assets/khu.png" class="icon" alt="Ever logo" />
      </NuxtLink>

      <!-- Right side  About and Cart) -->
      <div class="nav-right">
        <NuxtLink to="/about" class="nav-link">About Us</NuxtLink>
        <NuxtLink to="/cart" class="nav-link cart-link">
          Cart
          <span v-if="count > 0" class="cart-badge-count">{{ count }}</span>
        </NuxtLink>

        <button
          class="mobile-menu-btn"
          @click="toggle"
          aria-label="Toggle menu"
        >
          <Icon name="ri:menu-4-line" size="24" />

          <i class="ri-"></i>
        </button>
      </div>
    </div>
  </header>

  <!-- Mobile Sidebar -->
  <aside :class="['mobile-sidebar', { active: open }]">
    <div class="sidebar-header">
      <button class="close-btn" @click="close" aria-label="Close menu">
        <Icon name="ri:close-line" size="24" />
        <!-- <Icon icon="ri-menu-4-line" width="24" height="24" /> -->
      </button>
    </div>

    <div class="sidebar-links">
      <NuxtLink to="/" class="sidebar-link" @click="close">Store</NuxtLink>
      <NuxtLink to="/products" class="sidebar-link" @click="close"
        >Product</NuxtLink
      >
      <NuxtLink to="/about" class="sidebar-link" @click="close"
        >About Us</NuxtLink
      >
      <NuxtLink to="/cart" class="sidebar-link" @click="close">
        Cart <span v-if="count > 0">({{ count }})</span>
      </NuxtLink>
    </div>
  </aside>

  <!-- Backdrop -->
  <div v-if="open" class="sidebar-backdrop" @click="close" />
</template>

<style scoped>
.icon {
  height: 38px;
  width: auto;
}
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--header-height);
  background: transparent;
  z-index: 1000;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  color: white;
}
.navbar.solid {
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(12px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.navbar-content {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  width: 100%;
}

.nav-left {
  display: flex;
  gap: 2rem;
  justify-content: flex-start;
}

.nav-center {
  display: flex;
  justify-content: center;
}

.nav-right {
  display: flex;
  gap: 2rem;
  justify-content: flex-end;
  align-items: center;
}

.logo {
  font-size: 2rem;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-link {
  font-weight: 500;
  color: white;
  text-transform: uppercase;
  font-size: 0.9rem;
  opacity: 0.9;
  letter-spacing: 0.5px;
  position: relative;
  transition: opacity 0.3s;
}

.nav-link:hover {
  opacity: 1;
}

.cart-link {
  position: relative;
}
.cart-badge-count {
  position: absolute;
  top: -8px;
  right: -12px;
  min-width: 18px;
  height: 18px;
  background-color: var(--error-color, red);
  border-radius: 99px;
  color: white;
  font-size: 0.7rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
}
.cart-badge-dot {
  position: absolute;
  top: -2px;
  right: -6px;
  width: 6px;
  height: 6px;
  background-color: var(--error-color, red);
  border-radius: 50%;
}

.mobile-menu-btn {
  display: none;
  font-size: 1.5rem;
  background: transparent;
  color: white;
  border: none;
  cursor: pointer;
}

@media (max-width: 768px) {
  .navbar-content {
    display: flex;
    justify-content: space-between;
  }

  .nav-left,
  .nav-right > .nav-link {
    display: none;
  }

  .mobile-menu-btn {
    display: block;
  }
}

/* Sidebar Styles */
.mobile-sidebar {
  position: fixed;
  top: 0;
  right: -300px;
  width: 300px;
  height: 100vh;
  background-color: #1a1a1a;
  z-index: 2000;
  transition: right 0.3s ease-in-out;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.5);
}

.mobile-sidebar.active {
  right: 0;
}

.sidebar-header {
  display: flex;
  justify-content: flex-end;
}

.close-btn {
  background: transparent;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
}

.sidebar-links {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.sidebar-link {
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: color 0.3s;
  display: flex;
  align-items: center;
  gap: 10px;
}

.sidebar-link:hover {
  color: var(--primary-color, #4caf50);
}

.sidebar-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1500;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease-in-out;
}

.sidebar-backdrop.active {
  opacity: 1;
  visibility: visible;
}
</style>
