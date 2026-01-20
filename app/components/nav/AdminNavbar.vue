<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const y = ref(0);

const onScroll = () => {
  y.value = window.scrollY;
};

onMounted(() => {
  window.addEventListener("scroll", onScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
});
</script>
<template>
  <header
    class="fixed top-0 left-0 w-full h-[var(--header-height)] z-[1000] bg-[#487a99] backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.15)] flex items-center justify-center text-white transition-all duration-300"
  >
    <NuxtLink to="/" class="flex items-center gap-3 text-2xl font-semibold">
      <span>Admin</span>
      <img src="~/assets/khu.png" alt="Admin logo" class="h-[38px] w-auto" />
    </NuxtLink>
  </header>
</template>
