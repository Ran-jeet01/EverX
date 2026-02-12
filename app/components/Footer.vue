<script setup lang="ts">
const currentYear = new Date().getFullYear();

const socialLinks = [
  { name: "Facebook", icon: "ri:facebook-fill", to: "#" },
  { name: "Twitter", icon: "ri:twitter-x-line", to: "#" },
  { name: "Instagram", icon: "ri:instagram-line", to: "#" },
  { name: "LinkedIn", icon: "ri:linkedin-fill", to: "#" },
];

const quickLinks = [
  { name: "Store", to: "/" },
  { name: "Products", to: "/products" },
  { name: "About Us", to: "/about" },
];
</script>

<template>
  <footer class="bg-primary text-white pt-12 pb-6 border-t border-white/10">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-6">
        <!-- Brand Section -->
        <div class="flex flex-col gap-3">
          <NuxtLink to="/" class="logo-container group">
            <span class="logo-text">Ever</span>
            <img
              src="~/assets/khu.png"
              class="h-9 w-auto object-contain brightness-0 invert transition-transform duration-300 group-hover:rotate-12"
              alt="Ever logo"
            />
          </NuxtLink>
          <p class="text-gray-400 leading-relaxed max-w-sm text-sm">
            Elevating your lifestyle with premium quality products.
          </p>
          <div class="flex gap-2">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.to"
              class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center transition-all duration-300 hover:bg-accent hover:text-white text-gray-400"
              :aria-label="social.name"
            >
              <Icon :name="social.icon" size="20" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-lg font-semibold mb-3 relative inline-block">
            Quick Links
            <span
              class="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-accent"
            ></span>
          </h3>
          <ul class="flex flex-col gap-2">
            <li v-for="link in quickLinks" :key="link.name">
              <NuxtLink
                :to="link.to"
                class="text-gray-400 hover:text-accent transition-colors duration-200 flex items-center gap-2 group"
              >
                <span
                  class="w-1.5 h-1.5 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity"
                ></span>
                {{ link.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div>
          <h3 class="text-lg font-semibold mb-3 relative inline-block">
            Contact Us
            <span
              class="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-accent"
            ></span>
          </h3>
          <ul class="flex flex-col gap-2">
            <li class="flex items-start gap-3 text-gray-400 group">
              <div
                class="mt-1 w-8 h-8 rounded bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-accent/20 group-hover:text-accent transition-colors"
              >
                <Icon name="ri:map-pin-line" size="16" />
              </div>
              <span
                class="leading-relaxed group-hover:text-white transition-colors"
              >
                123 Fashion Street,<br />
                Kathmandu, Nepal
              </span>
            </li>
            <li class="flex items-center gap-3 text-gray-400 group">
              <div
                class="w-8 h-8 rounded bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-accent/20 group-hover:text-accent transition-colors"
              >
                <Icon name="ri:mail-line" size="16" />
              </div>
              <a
                href="mailto:info@ever.com"
                class="group-hover:text-white transition-colors"
                >info@ever.com</a
              >
            </li>
            <li class="flex items-center gap-3 text-gray-400 group">
              <div
                class="w-8 h-8 rounded bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-accent/20 group-hover:text-accent transition-colors"
              >
                <Icon name="ri:phone-line" size="16" />
              </div>
              <a
                href="tel:+9779800000000"
                class="group-hover:text-white transition-colors"
                >+977 980 000 0000</a
              >
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div
        class="pt-4 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500"
      >
        <p>&copy; {{ currentYear }} Ever. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.container {
  max-width: 1280px;
}
</style>
