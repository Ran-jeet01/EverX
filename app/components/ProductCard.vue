<script setup lang="ts">
import type { ProductDataType } from "@/types/product";

const { product } = defineProps<{
  product: ProductDataType;
}>();

const emit = defineEmits<{
  (e: "add-to-cart", product: ProductDataType): void;
}>();
</script>

<template>
  <div class="bg-white rounded-none overflow-hidden shadow-none border border-slate-200 transition-all duration-200 ease-out cursor-pointer flex flex-col relative hover:-translate-y-1 hover:shadow-[4px_4px_0_0_var(--color-primary)] hover:border-primary group">
    <div class="h-[320px] relative overflow-hidden border-b border-slate-200">
      <img
        :src="product.image"
        :alt="product.title || 'Product image'"
        loading="lazy"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
    <div class="p-5 bg-white flex flex-col justify-between grow">
      <h3 class="text-lg font-bold mb-4 text-primary -tracking-[0.01em]">{{ product.title }}</h3>
      <div class="flex justify-between items-center mt-auto">
        <span class="font-semibold text-slate-600 text-base font-mono">{{ product.price }}</span>
        <button
          class="rounded-none border border-black tracking-wide uppercase text-xs px-4 py-2 bg-white text-black transition-all duration-200 hover:bg-black hover:text-white hover:shadow-[2px_2px_0_0_rgba(0,0,0,0.2)]"
          @click="emit('add-to-cart', product)"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>
<!-- things to improve is to pass only required stuff -->
