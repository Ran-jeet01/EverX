// plugins/pinia-persist.client.ts
import { defineNuxtPlugin } from "#app";
import type { Pinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

export default defineNuxtPlugin((nuxtApp) => {
  // Get pinia with proper typing
  const pinia = nuxtApp.$pinia as Pinia | undefined;

  if (pinia) {
    pinia.use(piniaPluginPersistedstate);
  }
});
