<script setup lang="ts">
import { ref } from "vue";

interface SidebarLink {
  name: string;
  path: string;
  icon: string;
}

interface Props {
  isOpen?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isOpen: true,
});

const emit = defineEmits<{
  (e: "toggle"): void;
  (e: "logout"): void;
}>();

const route = useRoute();

const links: SidebarLink[] = [
  {
    name: "Overview",
    path: "/admin/overview",
    icon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z",
  },
  {
    name: "User Control",
    path: "/admin/users",
    icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
  },
  {
    name: "Product",
    path: "/admin/products",
    icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
  },
  {
    name: "Sales",
    path: "/admin/sales",
    icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    name: "Orders",
    path: "/admin/orders",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
  },
];

const handleLinkClick = () => {
  if (window.innerWidth < 1024) {
    emit("toggle");
  }
};

const handleLogout = () => {
  emit("logout");
};
</script>

<template>
  <aside
    class="bg-white border-r border-cyan-200 transition-all duration-300 ease-in-out flex flex-col z-20 fixed lg:relative h-full"
    :class="[
      isOpen ? 'w-64' : 'w-20',
      'lg:translate-x-0',
      isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
    ]"
  >
    <!-- Logo Area -->
    <div
      class="h-16 flex items-center justify-center border-b border-cyan-200 px-4"
    >
      <h1 v-if="isOpen" class="text-2xl font-bold text-cyan-600 tracking-tight">
        Admin<span class="text-cyan-400">Panel</span>
      </h1>
      <span v-else class="text-2xl font-bold text-cyan-600">A</span>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 py-8 overflow-y-auto">
      <ul class="space-y-2 px-4">
        <li v-for="link in links" :key="link.name">
          <NuxtLink
            :to="link.path"
            class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative"
            :class="
              route.path === link.path
                ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30'
                : 'text-slate-600 hover:bg-cyan-50 hover:text-cyan-600'
            "
            @click="handleLinkClick"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                :d="link.icon"
              />
            </svg>
            <span
              v-if="isOpen"
              class="font-semibold text-sm whitespace-nowrap overflow-hidden"
              >{{ link.name }}</span
            >
          </NuxtLink>
        </li>
      </ul>
    </nav>

    <!-- Logout Area -->
    <div class="p-6 border-t border-cyan-200">
      <button
        @click="handleLogout"
        class="flex items-center gap-3 w-full px-4 py-3 text-slate-500 hover:text-rose-500 transition-all rounded-xl hover:bg-rose-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
        <span v-if="isOpen" class="font-bold text-sm">Logout</span>
      </button>
    </div>
  </aside>
</template>

<style scoped></style>
