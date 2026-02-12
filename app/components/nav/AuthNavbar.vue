<template>
  <header class="h-16 border-b flex items-center justify-between px-6">
    <!-- Logo -->
    <NuxtLink to="/" class="logo-container group !gap-2">
      <span class="logo-text text-primary !text-xl">Ever</span>
      <img
        src="~/assets/khu.png"
        class="h-6 w-auto object-contain transition-transform duration-300 group-hover:rotate-12"
        alt="Ever logo"
      />
    </NuxtLink>

    <!-- Auth links -->
    <nav class="flex gap-4">
      <NuxtLink
        v-if="route.path !== '/auth/login'"
        to="/auth/login"
        class="text-sm font-medium hover:underline"
      >
        Login
      </NuxtLink>

      <NuxtLink
        v-if="route.path !== '/auth/register'"
        to="/auth/register"
        class="text-sm font-medium hover:underline"
      >
        Register
      </NuxtLink>
    </nav>
  </header>
</template>

<script setup>
const route = useRoute();
</script>
