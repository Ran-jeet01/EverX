<script setup lang="ts">
definePageMeta({
  layout: "admin",
});
</script>

<template>
  <div>
    <h2 class="text-3xl font-bold text-slate-800 mb-8">Sales Analytics</h2>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Revenue Chart Placeholder -->
        <div class="bg-white p-6 rounded-2xl shadow-sm border border-cyan-100 min-h-[400px] flex flex-col justify-center items-center relative group overflow-hidden">
             <div class="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-cyan-50/50 transition-opacity group-hover:opacity-100 opacity-50"></div>
             <div class="relative z-10 text-center">
                 <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-cyan-200 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                 </svg>
                 <h3 class="text-lg font-semibold text-slate-500">Revenue Growth</h3>
                 <p class="text-sm text-slate-400">Chart rendering...</p>
             </div>
        </div>

        <!-- Orders Chart Placeholder -->
         <div class="bg-white p-6 rounded-2xl shadow-sm border border-cyan-100 min-h-[400px] flex flex-col justify-center items-center relative group overflow-hidden">
             <div class="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/50 transition-opacity group-hover:opacity-100 opacity-50"></div>
             <div class="relative z-10 text-center">
                 <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-purple-200 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                 </svg>
                 <h3 class="text-lg font-semibold text-slate-500">Orders by Category</h3>
                 <p class="text-sm text-slate-400">Chart rendering...</p>
             </div>
        </div>
    </div>
  </div>
</template>
