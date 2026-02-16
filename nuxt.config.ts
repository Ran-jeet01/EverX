import Icons from "unplugin-icons/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "@nuxt/icon"],
  runtimeConfig: {
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    smtpEmail: process.env.NUXT_SMTP_EMAIL,
    smtpPass: process.env.NUXT_SMTP_PASS,
    esewaProductCode: process.env.NUXT_ESEWA_PRODUCT_CODE,
    esewaSecretKey: process.env.NUXT_ESEWA_SECRET_KEY,
    esewaUrl: process.env.NUXT_ESEWA_URL,
  },
  css: ["~/assets/css/main.css"],
  app: {
    head: {
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap",
        },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap",
        },
      ],
    },
  },
  icon: {
    serverBundle: {
      collections: ["ri", "mdi"],
    },
  },
});
