<script setup lang="ts">
import { ref } from "vue";

const isSidebarOpen = ref(true);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const handleLogout = () => {
  console.log("Logout clicked");
};
</script>

<template>
  <div class="flex h-screen bg-cyan-50 font-sans overflow-hidden relative">
    <AdminSidebar :is-open="isSidebarOpen" @logout="handleLogout" />

    <div
      v-if="isSidebarOpen"
      @click="toggleSidebar"
      class="fixed inset-0 bg-black/50 z-10 lg:hidden"
    ></div>

    <div class="flex-1 flex flex-col h-full overflow-hidden relative">
      <AdminNavbar
        @toggle-sidebar="toggleSidebar"
        user-name="Ranjit Poudel"
        user-role="Administrator"
        user-initials="RP"
      />

      <main class="flex-1 overflow-y-auto p-4 md:p-6 lg:p-10 scroll-smooth">
        <div class="container mx-auto">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>
