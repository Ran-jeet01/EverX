<script setup lang="ts">
definePageMeta({
  layout: "admin",
});

const { data: statsData } = useFetch('/api/admin/stats');

const stats = computed(() => [
  {
    title: "Total Users",
    value: statsData.value?.totalUsers?.toLocaleString() || "0",
    icon: "👤󠅄",
    change: "+12%",
    trend: "up",
    color: "#06b6d4",
  },
  {
    title: "Revenue",
    value: `$${statsData.value?.revenue?.toLocaleString() || "0"}`,
    icon: "💰",
    change: "+5.4%",
    trend: "up",
    color: "#10b981",
  },
  {
    title: "Active Sessions",
    value: statsData.value?.activeSessions?.toLocaleString() || "0",
    icon: "⚡",
    change: "-2%",
    trend: "down",
    color: "#f59e0b",
  },
  {
    title: "Products",
    value: statsData.value?.totalProducts?.toLocaleString() || "0",
    icon: "📦",
    change: "+8",
    trend: "up",
    color: "#8b5cf6",
  },
]);

const series = [
  {
    name: "Active Activity",
    data: [44, 55, 57, 56, 61, 58, 63, 60, 66, 70, 75, 100],
  },
];

const chartOptions = {
  chart: {
    type: "bar",
    fontFamily: "inherit",
    toolbar: { show: false },
    animations: {
      enabled: true,
      easing: "easeinout",
      speed: 800,
      animateGradually: { enabled: true, delay: 150 },
      dynamicAnimation: { enabled: true, speed: 350 },
    },
  },
  colors: ["#06b6d4"],
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "60%",
      borderRadius: 6,
      borderRadiusApplication: "end",
    },
  },
  dataLabels: { enabled: false },
  stroke: { show: true, width: 2, colors: ["transparent"] },
  xaxis: {
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dc",
    ],
    axisBorder: { show: false },
    axisTicks: { show: false },
    labels: { style: { colors: "#94a3b8", fontSize: "12px", fontWeight: 600 } },
  },
  yaxis: { show: false },
  fill: { opacity: 1 },
  tooltip: {
    theme: "light",
    y: {
      formatter: function (val: number) {
        return val + " active";
      },
    },
  },
  grid: { show: false },
};
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
        <!-- <button
          class="px-4 py-2 bg-white border border-cyan-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-cyan-50 transition-colors shadow-sm flex-1 sm:flex-none"
        >
         Today's Stats
        </button> -->
        <button
          class="px-4 py-2 bg-cyan-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-cyan-500/30 hover:bg-cyan-600 transition-all flex-1 sm:flex-none"
        >
            Download Report
        </button>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
      <div
        v-for="stat in stats"
        :key="stat.title"
        class="bg-white p-8 rounded-[2rem] shadow-sm border border-cyan-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group"
      >
        <div
          class="absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-[0.03] group-hover:scale-150 transition-transform duration-700"
          :style="{ backgroundColor: stat.color }"
        ></div>

        <div class="flex justify-between items-start mb-6">
          <!-- <div
              class="p-4 rounded-2xl bg-opacity-10 text-3xl"
              :style="{ backgroundColor: stat.color + '10' }"
            >
              {{ stat.icon }}
            </div> -->
          <span
            :class="
              stat.trend === 'up'
                ? 'text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10'
                : 'text-rose-500 bg-rose-50 dark:bg-rose-500/10'
            "
            class="px-2 py-1 text-[10px] font-bold rounded-lg uppercase tracking-wider"
          >
            {{ stat.change }}
          </span>
        </div>

        <div>
          <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">
            {{ stat.title }}
          </p>
          <h3 class="text-4xl font-extrabold text-slate-800 mt-1">
            {{ stat.value }}
          </h3>
        </div>
      </div>
    </div>

    <!-- Main Analytics Card -->
    <div
      class="bg-white p-6 md:p-10 rounded-[2.5rem] shadow-sm border border-cyan-100 relative overflow-hidden group"
    >
      <div
        class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4"
      >
        <h3 class="text-xl font-bold text-slate-800">Active Activity</h3>
        <div class="flex gap-2">
          <!-- <span class="h-2 w-2 rounded-full bg-cyan-500"></span>
          <span class="h-2 w-2 rounded-full bg-slate-200"></span> -->
        </div>
      </div>

      <!-- using  apex Chart  -->
      <div class="h-64 md:h-80 w-full relative z-10">
        <client-only>
          <apexchart
            type="bar"
            height="100%"
            :options="chartOptions"
            :series="series"
          ></apexchart>
        </client-only>
      </div>
    </div>
  </div>
</template>
