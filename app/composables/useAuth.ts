// app/composables/useAuth.ts
import { computed } from "vue";

export const useAuth = () => {
  const role: "guest" | "user" | "admin" = "guest"; // or 'guest' / 'user'

  const isLoggedIn = computed(() => role !== ("guest" as any)); // ← add "as any" here
  const isAdmin = computed(() => role === ("admin" as any)); // ← add "as any" here

  return { isLoggedIn, isAdmin };
};
