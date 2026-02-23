import { defineStore } from "pinia";
import { useProductsStore } from "./productsStore";

export const useCartStore = defineStore("cart", () => {
  const productsStore = useProductsStore();
  const { user } = useAuth();
  const { success } = useToast();
  const headers = useRequestHeaders(["cookie"]);
  const rawItems = ref<any[]>([]);

  const items = computed(() => {
    return rawItems.value.map((item) => {
      const product = productsStore.products.find(
        (p) => p.id === item.productId,
      );
      return {
        ...item,
        title: product?.name || "Loading...",
        price: product?.price || 0,
        image: product?.image || "",
        category: product?.category || "",
        description: product?.description || "",
      };
    });
  });

  const totalPrice = computed(() => {
    return items.value
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  });

  const loadCart = async () => {
    try {
      // Ensure products are loaded for mapping
      if (productsStore.products.length === 0) {
        await productsStore.loadProducts();
      }

      if (!user.value) {
        rawItems.value = [];
        return;
      }

      const data = await $fetch("/api/cart", { headers });
      rawItems.value = data as any[];
    } catch (e) {
      console.error("Failed to load cart", e);
    }
  };

  const addToCart = async (product: any) => {
    if (!user.value) {
      navigateTo("/auth/login");
      return;
    }

    try {
      await $fetch("/api/cart", {
        method: "POST",
        body: { productId: product.id, quantity: 1 },
        headers,
      });
      success("Added to cart");
      await loadCart();
    } catch (e) {
      console.error("Failed to add to cart", e);
    }
  };

  const removeFromCart = async (id: number) => {
    try {
      await $fetch(`/api/cart?id=${id}`, {
        method: "DELETE",
        headers,
      });
      await loadCart();
    } catch (e) {
      console.error("Failed to remove item", e);
    }
  };

  const increaseQuantity = async (id: number) => {
    await updateQuantity(id, 1);
  };

  const decreaseQuantity = async (id: number) => {
    await updateQuantity(id, -1);
  };

  const updateQuantity = async (id: number, change: number) => {
    const item = rawItems.value.find((i) => i.id === id);
    if (!item) return;

    const newQuantity = item.quantity + change;
    if (newQuantity <= 0) {
      await removeFromCart(id);
      return;
    }

    try {
      await $fetch("/api/cart", {
        method: "PUT",
        body: { id, quantity: newQuantity },
        headers,
      });
      await loadCart();
    } catch (e) {
      console.error("Failed to update quantity", e);
    }
  };

  const clearCart = async () => {
    try {
      await $fetch("/api/cart", {
        method: "DELETE",
        headers,
      });
      await loadCart();
    } catch (e) {
      console.error("Failed to clear cart", e);
    }
  };

  return {
    items,
    rawItems,
    totalPrice,
    loadCart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  };
});
