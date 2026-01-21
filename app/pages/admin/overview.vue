<script setup lang="ts">
definePageMeta({
  layout: "admin",
});

const stats = [
  {
    title: "Total Users",
    value: "1,234",
    icon: "👥",
    change: "+12%",
    trend: "up",
    color: "#06b6d4",
  },
  {
    title: "Revenue",
    value: "$12,345",
    icon: "💰",
    change: "+5.4%",
    trend: "up",
    color: "#10b981",
  },
  {
    title: "Active Sessions",
    value: "45",
    icon: "⚡",
    change: "-2%",
    trend: "down",
    color: "#f59e0b",
  },
  {
    title: "Products",
    value: "89",
    icon: "📦",
    change: "+8",
    trend: "up",
    color: "#8b5cf6",
  },
];
</script>

<template>
  <div class="animate-fade-in-down">
    <div
      class="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4"
    >
      <div>
        <h2 class="text-3xl font-bold text-slate-800 tracking-tight">
          Dashboard Overview
        </h2>
        <p class="text-slate-500 mt-1">
          Welcome back. Here's what's happening today.
        </p>
      </div>
      <div class="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
        <button
          class="px-4 py-2 bg-white border border-cyan-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-cyan-50 transition-colors shadow-sm flex-1 sm:flex-none"
        >
          Download Report
        </button>
        <button
          class="px-4 py-2 bg-cyan-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-cyan-500/30 hover:bg-cyan-600 transition-all flex-1 sm:flex-none"
        >
          Today's Stats
        </button>
      </div>
    </div>
  </div>
</template>
