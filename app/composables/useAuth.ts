// composables/useAuth.ts   (or put it anywhere in composables/ folder)

import { computed, ref } from "vue";

export const useAuth = () => {
  // Fake values – change these manually to test different states
  const isLoggedIn = ref(false); // ← set to true to simulate logged-in user
  const isAdmin = ref(false); // ← set to true to simulate admin

  // Optional: helper to toggle for testing
  const toggleLogin = () => {
    isLoggedIn.value = !isLoggedIn.value;
  };

  const toggleAdmin = () => {
    isAdmin.value = !isAdmin.value;
  };

  return {
    isLoggedIn: computed(() => isLoggedIn.value),
    isAdmin: computed(() => isAdmin.value),
    toggleLogin, // optional – useful for testing
    toggleAdmin,
  };
};
