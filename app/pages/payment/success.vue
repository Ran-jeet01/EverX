<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCartStore } from '@/stores/cartStore';

definePageMeta({
  layout: "user",
});

const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();
const loading = ref(true);
const error = ref<string | null>(null);

onMounted(async () => {
    const data = route.query.data as string;
    if (!data) {
        error.value = "Payment information missing.";
        loading.value = false;
        return;
    }

    try {
        await $fetch('/api/checkout/verify', {
            method: 'POST',
            body: { data }
        });
        await cartStore.loadCart(); // Ensure cart is cleared locally
    } catch (e: any) {
        error.value = e.data?.message || "Verification failed.";
    } finally {
        loading.value = false;
    }
});
</script>

<template>
  <div class="page-container container pt-[calc(var(--header-height)+4rem)] flex flex-col items-center justify-center text-center">
    <div v-if="loading" class="flex flex-col items-center gap-4">
      <div class="w-12 h-12 border-4 border-slate-200 border-t-black rounded-full animate-spin"></div>
      <p class="text-lg font-medium">Verifying your payment...</p>
    </div>

    <div v-else-if="error" class="flex flex-col items-center gap-6 max-w-md">
      <div class="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
        <Icon name="ri:error-warning-line" size="48" />
      </div>
      <h1 class="text-2xl font-bold">Verification Error</h1>
      <p class="text-slate-600">{{ error }}</p>
      <button @click="router.push('/account/orders')" class="btn btn-primary bg-black text-white px-8 py-3 rounded-md">
        View My Orders
      </button>
    </div>

    <div v-else class="flex flex-col items-center gap-6 max-w-md">
      <div class="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
        <Icon name="ri:checkbox-circle-line" size="48" />
      </div>
      <h1 class="text-3xl font-bold">Payment Successful!</h1>
      <p class="text-slate-600 text-lg">Thank you for your purchase. Your order has been placed successfully.</p>
      <div class="flex gap-4">
        <button @click="router.push('/products')" class="btn btn-outline border border-black px-8 py-3 rounded-md hover:bg-slate-50">
          Continue Shopping
        </button>
        <button @click="router.push('/account/orders')" class="btn btn-primary bg-black text-white px-8 py-3 rounded-md">
          View Orders
        </button>
      </div>
    </div>
  </div>
</template>
