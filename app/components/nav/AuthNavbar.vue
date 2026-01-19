<template>
  <header class="h-16 border-b flex items-center justify-between px-6">
    <!-- Logo -->
    <NuxtLink to="/" class="text-xl font-bold"> LOGO </NuxtLink>

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
