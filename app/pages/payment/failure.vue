<script setup lang="ts">
import { useRouter } from 'vue-router';

definePageMeta({
  layout: "user",
});

const router = useRouter();
</script>

<template>
  <div class="page-container container pt-[calc(var(--header-height)+4rem)] flex flex-col items-center justify-center text-center">
    <div class="flex flex-col items-center gap-6 max-w-md">
      <div class="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
        <Icon name="ri:close-circle-line" size="48" />
      </div>
      <h1 class="text-3xl font-bold">Payment Failed</h1>
      <p class="text-slate-600 text-lg">We were unable to process your payment. Please try again or contact support if the issue persists.</p>
      <div class="flex gap-4">
        <button @click="router.push('/cart')" class="btn btn-primary bg-black text-white px-8 py-3 rounded-md">
          Return to Cart
        </button>
        <button @click="router.push('/')" class="btn btn-outline border border-black px-8 py-3 rounded-md hover:bg-slate-50">
          Go Home
        </button>
      </div>
    </div>
  </div>
</template>
