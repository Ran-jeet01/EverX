<script setup lang="ts">
definePageMeta({
  layout: "user",
});
import EmptyCart from "@/components/EmptyCart.vue";
import { ref, onMounted, computed } from "vue";
import { useCartStore } from "@/stores/cartStore";
const value: Boolean = false;

const cartStore = useCartStore();

// Accessing  item
const cartItems = computed(() => cartStore.items);
console.log(cartItems.value);

const checkoutLoading = ref(false);
const router = useRouter();


const { user } = useAuth();

const handleCheckout = async () => {
  if (cartItems.value.length === 0) return;

  // Check if user has address
  if (!user.value?.address) {
    alert("Please add a shipping address to your profile before checking out.");
    router.push("/account/profile");
    return;
  }

  checkoutLoading.value = true;
  try {
    // Initiate eSewa payment
    const response: any = await $fetch("/api/checkout/initiate", {
      method: "POST",
    });

    // Create a hidden form and submit it to eSewa
    const form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", response.esewa_url);

    for (const key in response) {
      if (key === "order_id") continue; // Don't send internal order_id to eSewa
      const hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", response[key]);
      form.appendChild(hiddenField);
    }

    document.body.appendChild(form);
    form.submit();
  } catch (e: any) {
    alert(e.data?.message || "Checkout failed");
    if (e.statusCode === 401) {
      router.push("/auth/login");
    }
  } finally {
    // We don't set loading to false here because we're redirecting
  }
};
</script>

<template>
  <!-- <div v-if="cartItems> -->
  <div v-if="cartItems.length === 0">
    <EmptyCart />
  </div>
  <div
    v-else
    class="page-container container pt-[calc(var(--header-height)+2rem)]"
  >
    <h1 class="section-title">Your Cart</h1>
    <div class="grid grid-cols-1 md:grid-cols-[1fr_350px] gap-12 mt-8">
      <div class="flex flex-col gap-6">
        <div
          v-for="item in cartItems"
          :key="item.title"
          class="flex gap-6 pb-6 border-b border-slate-200"
        >
          <div class="w-[120px] h-[120px] shrink-0 bg-slate-50">
            <img
              :src="item.image"
              :alt="item.title"
              class="w-full h-full object-cover"
            />
          </div>

          <div class="grow flex flex-col justify-between">
            <div class="item-header">
              <h3 class="text-lg font-semibold mb-1">{{ item.title }}</h3>
              <p class="text-slate-500 font-mono font-semibold">
                {{ item.price }}
              </p>
            </div>

            <div class="flex justify-between items-center mt-4">
              <div class="flex items-center border border-slate-200">
                <button
                  class="w-8 h-8 flex items-center justify-center bg-white border-none cursor-pointer text-slate-600 transition-all duration-200 hover:bg-slate-50 hover:text-black"
                  @click="cartStore.decreaseQuantity(item.id)"
                >
                  <Icon name="ri:subtract-line" size="24" />
                </button>
                <span class="w-10 text-center text-sm font-medium">{{
                  item.quantity
                }}</span>
                <button
                  class="w-8 h-8 flex items-center justify-center bg-white border-none cursor-pointer text-slate-600 transition-all duration-200 hover:bg-slate-50 hover:text-black"
                  @click="cartStore.increaseQuantity(item.id)"
                >
                  <Icon name="ri:add-line" size="24" />
                </button>
              </div>
              <button
                class="bg-transparent border-none text-red-500 text-sm cursor-pointer underline p-0 hover:text-red-600"
                @click="cartStore.removeFromCart(item.id)"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-slate-50 p-8 h-fit border border-slate-200">
        <h2 class="text-xl font-bold mb-6 pb-4 border-b border-slate-200">
          Order Summary
        </h2>
        <div class="flex justify-between mb-4 text-slate-600">
          <span>Total Product</span>
          <span>{{ cartItems.length }}</span>
        </div>
        <div
          class="flex justify-between mb-4 text-slate-600 mt-4 pt-4 border-t border-slate-200 font-bold text-black text-lg"
        >
          <span>Total</span>
          <span>${{ cartStore.totalPrice }}</span>
        </div>
        <button
          @click="handleCheckout"
          :disabled="checkoutLoading"
          class="btn btn-primary w-full mt-6 flex justify-center py-4 bg-[#60bb46] text-white font-bold hover:bg-[#50a03a] disabled:bg-gray-400"
        >
          {{ checkoutLoading ? "Processing..." : "Pay with eSewa" }}
        </button>
      </div>
    </div>
  </div>
</template>
