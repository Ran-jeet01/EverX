<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useCartStore } from "@/stores/cartStore";

const cart = useCartStore();
const route = useRoute();

const open = ref(false);
const y = ref(0);

const solidNav = computed(
  () => y.value > 40 || !["/", "/about"].includes(route.path),
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
  <header
    class="fixed top-0 left-0 w-full h-[var(--header-height)] z-[1000] transition-all duration-300 flex items-center text-white"
    :class="
      solidNav
        ? 'bg-black/75 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.15)]'
        : 'bg-transparent'
    "
  >
    <div
      class="container flex justify-between md:grid md:grid-cols-[1fr_auto_1fr] items-center w-full"
    >
      <!-- Left side  Store and Product -->
      <div class="hidden md:flex gap-8 justify-start">
        <NuxtLink
          to="/"
          class="font-medium text-white uppercase text-base opacity-90 tracking-wide relative transition-opacity hover:opacity-100"
          >Storee</NuxtLink
        >
        <NuxtLink
          to="/products"
          class="font-medium text-white uppercase text-base opacity-90 tracking-wide relative transition-opacity hover:opacity-100"
          >Product</NuxtLink
        >
      </div>

      <!-- Center side onlyy Logo -->
      <NuxtLink
        to="/"
        class="text-2xl text-white flex items-center justify-center gap-2"
      >
        Ever
        <img src="~/assets/khu.png" class="h-[38px] w-auto" alt="Ever logo" />
      </NuxtLink>

      <!-- Right side  About and Cart) -->
      <div class="flex gap-8 justify-end items-center">
        <NuxtLink
          to="/about"
          class="hidden md:block font-medium text-white uppercase text-base opacity-90 tracking-wide relative transition-opacity hover:opacity-100"
          >About Us</NuxtLink
        >
        <NuxtLink
          to="/cart"
          class="hidden md:block font-medium text-white uppercase text-base opacity-90 tracking-wide relative transition-opacity hover:opacity-100 relative"
        >
          Login/register
          <span
            v-if="count > 0"
            class="absolute -top-2 -right-3 min-w-[18px] h-[18px] bg-error rounded-full text-white text-[0.7rem] font-bold flex items-center justify-center px-1"
            >{{ count }}</span
          >
        </NuxtLink>

        <button
          class="block md:hidden text-2xl bg-transparent text-white border-none cursor-pointer"
          @click="toggle"
          aria-label="Toggle menu"
        >
          <Icon name="ri:menu-4-line" size="24" />
        </button>
      </div>
    </div>
  </header>

  <!-- Mobile Sidebar -->
  <aside
    class="fixed top-0 w-[300px] h-screen bg-[#1a1a1a] z-[2000] transition-all duration-300 p-8 flex flex-col gap-8 shadow-[-5px_0_15px_rgba(0,0,0,0.5)]"
    :class="open ? 'right-0' : '-right-[300px]'"
  >
    <div class="flex justify-end">
      <button
        class="bg-transparent border-none text-white text-3xl cursor-pointer"
        @click="close"
        aria-label="Close menu"
      >
        <Icon name="ri:close-line" size="24" />
      </button>
    </div>

    <div class="flex flex-col gap-6">
      <NuxtLink
        to="/"
        class="text-white no-underline text-xl uppercase tracking-widest transition-colors flex items-center gap-2.5 hover:text-primary"
        @click="close"
        >Store</NuxtLink
      >
      <NuxtLink
        to="/products"
        class="text-white no-underline text-xl uppercase tracking-widest transition-colors flex items-center gap-2.5 hover:text-primary"
        @click="close"
        >Product</NuxtLink
      >
      <NuxtLink
        to="/about"
        class="text-white no-underline text-xl uppercase tracking-widest transition-colors flex items-center gap-2.5 hover:text-primary"
        @click="close"
        >About Us</NuxtLink
      >
      <NuxtLink
        to="/cart"
        class="text-white no-underline text-xl uppercase tracking-widest transition-colors flex items-center gap-2.5 hover:text-primary"
        @click="close"
      >
        Cart <span v-if="count > 0">({{ count }})</span>
      </NuxtLink>
    </div>
  </aside>

  <!-- Backdrop -->
  <div v-if="open" class="fixed inset-0 bg-black/50 z-[1500]" @click="close" />
</template>
