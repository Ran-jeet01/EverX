// import { defineStore } from "pinia";
// import { ref, computed, watch } from "vue";
// import type { CartItem } from "@/types/cart";

// const CART_KEY = "my-cart";

// export const useCartStore = defineStore("cart", () => {
//   const items = ref<CartItem[]>(
//     JSON.parse(localStorage.getItem(CART_KEY) || "[]")
//   );
//   watch(
//     items,
//     (val) => {
//       localStorage.setItem(CART_KEY, JSON.stringify(val));
//     },
//     { deep: true }
//   );

//   const addToCart = (product: CartItem) => {
//     console.log(product);
//     const existing = items.value.find((p) => p.id === product.id);
//     if (existing) {
//       existing.quantity += 1;
//     } else {
//       items.value.push({ ...product, quantity: 1 });
//     }
//   };

//   const removeFromCart = (id: number) => {
//     items.value = items.value.filter((p) => p.id !== id);
//   };

//   const clearCart = () => {
//     items.value = [];
//   };

//   const increaseQuantity = (id: number) => {
//     const item = items.value.find((p) => p.id === id);
//     if (item) {
//       item.quantity += 1;
//     }
//   };

//   // decrease quantity by 1and remove if 0
//   const decreaseQuantity = (id: number) => {
//     const item = items.value.find((p) => p.id === id);
//     if (item) {
//       if (item.quantity > 1) {
//         item.quantity -= 1;
//       } else {
//         removeFromCart(id);
//       }
//     }
//   };

//   // Computed
//   const totalPrice = computed(() =>
//     items.value.reduce((acc, p) => acc + p.price * p.quantity, 0)
//   );

//   return {
//     items,
//     addToCart,
//     removeFromCart,
//     clearCart,
//     totalPrice,
//     increaseQuantity,
//     decreaseQuantity,
//   };
// // });
// import { defineStore } from "pinia";
// import { ref, computed, watch } from "vue";
// import type { CartItem } from "@/types/cart";

// const CART_KEY = "my-cart";

// export const useCartStore = defineStore("cart", () => {
//   const items = ref<CartItem[]>([]);

//   // Load from localStorage only on client
//   if (import.meta.client) {
//     try {
//       const saved = localStorage.getItem(CART_KEY);
//       if (saved) {
//         items.value = JSON.parse(saved);
//       }
//     } catch (err) {
//       console.warn("Failed to load cart from localStorage", err);
//     }
//   }

//   // Save to localStorage whenever items change (only on client)
//   watch(
//     items,
//     (newVal) => {
//       if (import.meta.client) {
//         localStorage.setItem(CART_KEY, JSON.stringify(newVal));
//       }
//     },
//     { deep: true }
//   );

//   const addToCart = (product: CartItem) => {
//     console.log(product);
//     const existing = items.value.find((p) => p.id === product.id);
//     if (existing) {
//       existing.quantity += 1;
//     } else {
//       items.value.push({ ...product, quantity: 1 });
//     }
//   };

//   const removeFromCart = (id: number) => {
//     items.value = items.value.filter((p) => p.id !== id);
//   };

//   const clearCart = () => {
//     items.value = [];
//   };

//   const increaseQuantity = (id: number) => {
//     const item = items.value.find((p) => p.id === id);
//     if (item) {
//       item.quantity += 1;
//     }
//   };

//   const decreaseQuantity = (id: number) => {
//     const item = items.value.find((p) => p.id === id);
//     if (item) {
//       if (item.quantity > 1) {
//         item.quantity -= 1;
//       } else {
//         removeFromCart(id);
//       }
//     }
//   };

//   const totalPrice = computed(() =>
//     items.value.reduce((acc, p) => acc + p.price * p.quantity, 0)
//   );

//   return {
//     items,
//     addToCart,
//     removeFromCart,
//     clearCart,
//     totalPrice,
//     increaseQuantity,
//     decreaseQuantity,
//   };
// });
// stores/cart.ts - FIXED
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { CartItem } from "@/types/cart";

export const useCartStore = defineStore(
  "cart",
  () => {
    const items = ref<CartItem[]>([]);

    // Actions (keep your existing actions)
    const addToCart = (product: CartItem) => {
      console.log(product);
      const existing = items.value.find((p) => p.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        items.value.push({ ...product, quantity: 1 });
      }
    };

    const removeFromCart = (id: number) => {
      items.value = items.value.filter((p) => p.id !== id);
    };

    const clearCart = () => {
      items.value = [];
    };

    const increaseQuantity = (id: number) => {
      const item = items.value.find((p) => p.id === id);
      if (item) {
        item.quantity += 1;
      }
    };

    const decreaseQuantity = (id: number) => {
      const item = items.value.find((p) => p.id === id);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          removeFromCart(id);
        }
      }
    };

    const totalPrice = computed(() =>
      items.value.reduce((acc, p) => acc + p.price * p.quantity, 0)
    );

    const itemCount = computed(() =>
      items.value.reduce((acc, p) => acc + p.quantity, 0)
    );

    return {
      items,
      addToCart,
      removeFromCart,
      clearCart,
      totalPrice,
      itemCount,
      increaseQuantity,
      decreaseQuantity,
    };
  },
  {
    //  Use Nuxt's runtimeConfig instead of process
    persist: {
      key: "my-cart",
      storage: typeof window !== "undefined" ? localStorage : undefined,
    },
  }
);
