<script setup lang="ts">
const { toasts, remove } = useToast()
</script>

<template>
  <div
    class="fixed bottom-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]"
  >
    <TransitionGroup
      name="toast"
      tag="div"
      class="flex flex-col gap-2"
    >
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none"
        :class="{
          'bg-white text-slate-950 border-slate-200 dark:bg-slate-950 dark:text-slate-50 dark:border-slate-800': !toast.type || toast.type === 'info',
          'bg-slate-900 text-white border-slate-800 dark:bg-slate-50 dark:text-slate-900 dark:border-slate-200': toast.type === 'success',
          'bg-red-50 text-red-900 border-red-200 dark:bg-red-900/20 dark:text-red-50 dark:border-red-900/50': toast.type === 'error',
          'bg-yellow-50 text-yellow-900 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-50 dark:border-yellow-900/50': toast.type === 'warning',
        }"
      >
        <div class="grid gap-1">
          <div v-if="toast.title" class="text-sm font-semibold">
            {{ toast.title }}
          </div>
          <div v-if="toast.description" class="text-sm opacity-90">
            {{ toast.description }}
          </div>
        </div>
        
        <button
          @click="remove(toast.id)"
          class="absolute right-2 top-2 rounded-md p-1 opacity-0 transition-opacity focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100"
          :class="{
            'hover:bg-slate-100 dark:hover:bg-slate-800': !toast.type || toast.type === 'info',
            'hover:bg-slate-700 dark:hover:bg-slate-200': toast.type === 'success', 
            'hover:bg-red-100 dark:hover:bg-red-800/50': toast.type === 'error',
            'hover:bg-yellow-100 dark:hover:bg-yellow-800/50': toast.type === 'warning',
          }"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
  margin-bottom: -4rem; /* Collapse space */
}
</style>
