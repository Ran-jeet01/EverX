<script setup lang="ts">
definePageMeta({
  layout: "admin",
});

const revenueSeries = [
  {
    name: "Revenue",
    data: [31000, 40000, 28000, 51000, 42000, 109000, 100000],
  },
  {
    name: "Target",
    data: [11000, 32000, 45000, 32000, 34000, 52000, 41000],
  },
];

const revenueChartOptions = {
  chart: {
    type: "area",
    fontFamily: "inherit",
    toolbar: { show: false },
    animations: { enabled: true },
  },
  colors: ["#06b6d4", "#10b981"],
  dataLabels: { enabled: false },
  stroke: { curve: "smooth", width: 2 },
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.4,
      opacityTo: 0.05,
      stops: [0, 90, 100],
    },
  },
  xaxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    axisBorder: { show: false },
    axisTicks: { show: false },
    labels: { style: { colors: "#94a3b8" } },
  },
  yaxis: { show: false },
  grid: { borderColor: "#f1f5f9", strokeDashArray: 4 },
  tooltip: {
    theme: "light",
    y: { formatter: (val: number) => "$" + val },
  },
};

const ordersSeries = [44, 55, 13, 33];

const ordersChartOptions = {
  chart: {
    type: "donut",
    fontFamily: "inherit",
    animations: { enabled: true },
  },
  labels: ["Electronics", "Clothing", "Home", "b2b"],
  colors: ["#06b6d4", "#8b5cf6", "#f59e0b", "#10b981"],
  plotOptions: {
    pie: {
      donut: {
        size: "70%",
        labels: {
          show: true,
          total: {
            show: true,
            label: "Total Orders",
            fontSize: "14px",
            fontWeight: 600,
            color: "#64748b",
          },
        },
      },
    },
  },
  dataLabels: { enabled: false },
  stroke: { show: false },
  legend: { position: "bottom", fontFamily: "inherit" },
  tooltip: { theme: "light" },
};
</script>

<template>
  <div>
    <h2 class="text-3xl font-bold text-slate-800 mb-8">Sales Analytics</h2>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Revenue Chart -->
      <div
        class="bg-white p-6 rounded-2xl shadow-sm border border-cyan-100 min-h-[400px] flex flex-col group overflow-hidden"
      >
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="text-lg font-bold text-slate-800">Revenue Growth</h3>
            <p class="text-sm text-slate-500">Monthly revenue statistics</p>
          </div>
          <div class="p-2 bg-emerald-50 rounded-lg text-emerald-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
        <div class="flex-1 w-full min-h-[300px]">
          <client-only>
            <apexchart
              type="area"
              height="100%"
              :options="revenueChartOptions"
              :series="revenueSeries"
            ></apexchart>
          </client-only>
        </div>
      </div>

      <!-- Orders Chart -->
      <div
        class="bg-white p-6 rounded-2xl shadow-sm border border-cyan-100 min-h-[400px] flex flex-col group overflow-hidden"
      >
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="text-lg font-bold text-slate-800">Orders by Category</h3>
            <p class="text-sm text-slate-500">Distribution of sales</p>
          </div>
          <div class="p-2 bg-purple-50 rounded-lg text-purple-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
        </div>
        <div
          class="flex-1 w-full min-h-[300px] flex items-center justify-center"
        >
          <client-only>
            <apexchart
              type="donut"
              width="100%"
              height="300"
              :options="ordersChartOptions"
              :series="ordersSeries"
            ></apexchart>
          </client-only>
        </div>
      </div>
    </div>
  </div>
</template>
