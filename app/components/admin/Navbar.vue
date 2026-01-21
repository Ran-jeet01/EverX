<script setup lang="ts">
interface Props {
  userName?: string;
  userRole?: string;
  userInitials?: string;
}

const props = withDefaults(defineProps<Props>(), {
  userName: "Ranjit Poudel",
  userRole: "Administrator",
  userInitials: "RP",
});

const emit = defineEmits<{
  (e: "toggleSidebar"): void;
}>();

const handleToggleSidebar = () => {
  emit("toggleSidebar");
};
</script>

<template>
  <header
    class="h-16 bg-white/90 backdrop-blur-xl border-b border-cyan-200 flex items-center justify-between px-4 md:px-8 z-10 w-full sticky top-0"
  >
    <!-- Menu Toggle Button -->
    <button
      @click="handleToggleSidebar"
      class="p-2 rounded-xl bg-cyan-100 hover:bg-cyan-200 text-cyan-700 transition-colors"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>

    <!-- User Info -->
    <div class="flex items-center gap-3 md:gap-6">
      <div class="hidden sm:flex flex-col items-end">
        <span class="text-sm font-bold text-slate-900">{{ userName }}</span>
        <span
          class="text-[10px] font-medium text-cyan-500 uppercase tracking-widest"
          >{{ userRole }}</span
        >
      </div>
      <div
        class="h-10 w-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-cyan-400 shadow-md shadow-cyan-500/30 flex items-center justify-center text-white font-bold text-sm"
      >
        {{ userInitials }}
      </div>
    </div>
  </header>
</template>

<style scoped></style>
