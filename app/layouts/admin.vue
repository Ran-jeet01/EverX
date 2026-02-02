<script setup lang="ts">
const { user, logout } = useAuth();

const userInitials = computed(() => {
  const name = user.value?.name;
  if (!name) return "??";
  const parts = name.trim().split(/\s+/);
  const first = parts[0];
  const last = parts[parts.length - 1];
  
  if (parts.length >= 2 && first && last) {
    return (first.charAt(0) + last.charAt(0)).toUpperCase();
  }
  return first ? first.charAt(0).toUpperCase() : "?";
});

const isSidebarOpen = ref(true);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const handleLogout = () => {
  logout();
};
</script>

<template>
  <ClientOnly>
    <div class="flex h-screen bg-cyan-50 font-sans overflow-hidden relative">
      <AdminSidebar :is-open="isSidebarOpen" @logout="handleLogout" @toggle="toggleSidebar" />

      <div
        v-if="isSidebarOpen"
        @click="toggleSidebar"
        class="fixed inset-0 bg-black/50 z-10 lg:hidden"
      ></div>

      <div class="flex-1 flex flex-col h-full overflow-hidden relative">
        <ToastContainer />
        <AdminNavbar
          @toggle-sidebar="toggleSidebar"
          :user-name="user?.name || 'User'"
          :user-role="user?.role || 'Guest'"
          :user-initials="userInitials"
        />

        <main class="flex-1 overflow-y-auto p-4 md:p-6 lg:p-10 scroll-smooth">
          <div class="container mx-auto">
            <slot />
          </div>
        </main>
      </div>
    </div>
  </ClientOnly>
</template>
