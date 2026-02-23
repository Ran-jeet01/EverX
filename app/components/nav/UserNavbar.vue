<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCartStore } from "@/stores/cartStore";

const cart = useCartStore();
const route = useRoute();
const router = useRouter(); // Import router

const { user, logout } = useAuth(); // Get user and logout from auth composable

const open = ref(false);
const y = ref(0);
const showProfileMenu = ref(false);
const showLogoutConfirm = ref(false);

const solidNav = computed(
  () => y.value > 40 || !["/", "/about"].includes(route.path),
);

const count = computed(() => cart.items?.length || 0);
console.log(count.value + "THis");

const toggle = () => (open.value = !open.value);
const close = () => (open.value = false);

const onScroll = () => (y.value = window.scrollY);

onMounted(() => window.addEventListener("scroll", onScroll, { passive: true }));
onUnmounted(() => window.removeEventListener("scroll", onScroll));

watch(() => route.path, close);

const handleLogout = async () => {
  showLogoutConfirm.value = false;
  await logout();
  router.push("/auth/login");
};
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
          >Store</NuxtLink
        >
        <NuxtLink
          to="/products"
          class="font-medium text-white uppercase text-base opacity-90 tracking-wide relative transition-opacity hover:opacity-100"
          >Product</NuxtLink
        >
      </div>

      <!-- Center side onlyy Logo -->
      <NuxtLink to="/" class="logo-container group">
        <span class="logo-text text-white">Ever</span>
        <img
          src="~/assets/khu.png"
          class="h-9 w-auto object-contain brightness-0 invert transition-transform duration-300 group-hover:rotate-12"
          alt="Ever logo"
        />
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
          Cart
          <span
            v-if="count > 0"
            class="absolute -top-2 -right-3 min-w-[18px] h-[18px] bg-error rounded-full text-white text-[0.7rem] font-bold flex items-center justify-center px-1"
            >{{ count }}</span
          >
        </NuxtLink>

        <!-- Profile Dropdown -->
        <div v-if="user" class="relative hidden md:block">
          <button
            @click="showProfileMenu = !showProfileMenu"
            class="flex items-center gap-2 text-white bg-transparent border-none cursor-pointer font-medium uppercase text-base opacity-90 hover:opacity-100"
          >
            <span>{{ user.name || "User" }}</span>
            <Icon name="ri:user-3-line" size="20" />
          </button>

          <!-- Dropdown Menu -->
          <div
            v-if="showProfileMenu"
            class="absolute right-0 top-full mt-2 w-48 bg-[#1a1a1a] text-white rounded-lg shadow-xl py-2 flex flex-col z-[1002] border border-[#333]"
          >
            <NuxtLink
              to="/account/profile"
              class="px-4 py-3 hover:bg-[#333] transition-colors text-sm uppercase tracking-wider no-underline text-white"
              @click="showProfileMenu = false"
            >
              Update Profile
            </NuxtLink>
            <NuxtLink
              to="/account/orders"
              class="px-4 py-3 hover:bg-[#333] transition-colors text-sm uppercase tracking-wider no-underline text-white"
              @click="showProfileMenu = false"
            >
              Orders
            </NuxtLink>
            <button
              @click="
                showLogoutConfirm = true;
                showProfileMenu = false;
              "
              class="px-4 py-3 hover:bg-[#333] transition-colors text-left w-full bg-transparent border-none text-red-400 text-sm uppercase tracking-wider cursor-pointer"
            >
              Logout
            </button>
          </div>

          <!-- Overlay to close dropdown -->
          <div
            v-if="showProfileMenu"
            @click="showProfileMenu = false"
            class="fixed inset-0 z-[1001] bg-transparent cursor-default"
          ></div>
        </div>

        <NuxtLink
          v-else
          to="/auth/login"
          class="hidden md:block font-medium text-white uppercase text-base opacity-90 tracking-wide relative transition-opacity hover:opacity-100"
        >
          Login
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
        >AboutUs</NuxtLink
      >
      <NuxtLink
        to="/cart"
        class="text-white no-underline text-xl uppercase tracking-widest transition-colors flex items-center gap-2.5 hover:text-primary"
        @click="close"
      >
        Cart <span v-if="count > 0">({{ count }})</span>
      </NuxtLink>

      <template v-if="user">
        <div class="h-px bg-white/10 w-full my-1"></div>
        <NuxtLink
          to="/account/profile"
          class="text-white no-underline text-xl uppercase tracking-widest transition-colors flex items-center gap-2.5 hover:text-primary"
          @click="close"
        >
          Profile
        </NuxtLink>
        <NuxtLink
          to="/account/orders"
          class="text-white no-underline text-xl uppercase tracking-widest transition-colors flex items-center gap-2.5 hover:text-primary"
          @click="close"
        >
          My Orders
        </NuxtLink>
        <button
          @click="
            showLogoutConfirm = true;
            close();
          "
          class="text-red-400 bg-transparent border-none text-left p-0 text-xl uppercase tracking-widest cursor-pointer hover:text-red-300 font-medium"
        >
          Logout
        </button>
      </template>

      <NuxtLink
        v-else
        to="/auth/login"
        class="text-white no-underline text-xl uppercase tracking-widest transition-colors flex items-center gap-2.5 hover:text-primary"
        @click="close"
      >
        Login
      </NuxtLink>
    </div>
  </aside>

  <!-- Backdrop -->
  <div v-if="open" class="fixed inset-0 bg-black/50 z-[1500]" @click="close" />
  <!-- Logout Confirmation Dialog -->
  <div
    v-if="showLogoutConfirm"
    class="fixed inset-0 bg-black/80 z-[2000] flex items-center justify-center backdrop-blur-sm"
  >
    <div
      class="bg-[#1a1a1a] p-8 rounded-xl shadow-2xl text-white max-w-sm w-full mx-4 border border-[#333]"
    >
      <h3 class="text-xl font-bold mb-4">Logout?</h3>
      <p class="mb-8 text-gray-300">
        Are you sure you want to log out of your account?
      </p>
      <div class="flex justify-end gap-4">
        <button
          @click="showLogoutConfirm = false"
          class="px-6 py-2 bg-transparent border border-[#444] text-white rounded-lg hover:bg-[#333] transition-colors cursor-pointer"
        >
          Cancel
        </button>
        <button
          @click="handleLogout"
          class="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer border-none font-medium"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
</template>
