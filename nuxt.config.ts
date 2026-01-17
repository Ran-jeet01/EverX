import Icons from "unplugin-icons/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "@nuxt/icon"],
  icon: {
    serverBundle: {
      collections: ["ri", "mdi"],
    },
  },
});
