<script setup lang="ts">
definePageMeta({
  layout: 'admin'
});

const { data: orders, pending, refresh } = await useFetch('/api/admin/orders');

const statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
const updating = ref<string | null>(null);
const expandedOrder = ref<string | null>(null); // Track expanded order

const toggleExpand = (orderId: string) => {
    expandedOrder.value = expandedOrder.value === orderId ? null : orderId;
};

const filterStatus = ref('all');
const filterOptions = ['all', ...statuses];

const filteredOrders = computed(() => {
    if (!orders.value) return [];
    if (filterStatus.value === 'all') return orders.value;
    return orders.value.filter(order => order.status === filterStatus.value);
});

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
};

const updateStatus = async (orderId: string, newStatus: string) => {
    updating.value = orderId;
    try {
        await $fetch(`/api/admin/orders/${orderId}/status`, {
            method: 'PUT',
            body: { status: newStatus }
        });
        await refresh();
    } catch (e) {
        alert('Failed to update status');
    } finally {
        updating.value = null;
    }
};

const getStatusColor = (status: string) => {
     switch (status) {
        case 'pending': return 'bg-amber-100 text-amber-600';
        case 'processing': return 'bg-blue-100 text-blue-600';
        case 'shipped': return 'bg-purple-100 text-purple-600';
        case 'delivered': return 'bg-emerald-100 text-emerald-600';
        case 'cancelled': return 'bg-rose-100 text-rose-600';
        default: return 'bg-slate-100 text-slate-500';
    }
};
</script>

<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-2xl font-bold text-slate-800">Order Management</h1>
      <button @click="refresh()" class="px-4 py-2 bg-white border border-cyan-200 text-slate-600 rounded-xl hover:bg-cyan-50 shadow-sm transition-colors">Refresh</button>
    </div>

    <!-- Filter Tabs -->
    <div class="flex gap-2 mb-6 overflow-x-auto pb-2">
        <button 
            v-for="status in filterOptions" 
            :key="status"
            @click="filterStatus = status"
            class="px-4 py-2 rounded-full text-sm font-semibold transition-all capitalize whitespace-nowrap"
            :class="filterStatus === status ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30' : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'"
        >
            {{ status }}
        </button>
    </div>

    <div v-if="pending" class="text-slate-500">Loading...</div>

    <div v-else class="overflow-x-auto bg-white rounded-2xl border border-cyan-100 shadow-sm">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="border-b border-cyan-100 text-slate-400 uppercase text-xs tracking-wider">
            <th class="p-4">Order ID</th>
            <th class="p-4">Customer</th>
            <th class="p-4">Date</th>
            <th class="p-4">Total</th>
            <th class="p-4">Status</th>
            <th class="p-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody class="text-slate-600">
          <template v-for="order in filteredOrders" :key="order.id">
            <tr class="border-b border-cyan-50 hover:bg-slate-50 transition-colors">
                <td class="p-4 font-mono text-sm text-slate-500">
                    {{ order.id.slice(0, 8) }}...
                </td>
                <td class="p-4">
                    <div class="font-medium text-slate-800">{{ order.user?.name || 'Unknown' }}</div>
                    <div class="text-xs text-slate-400">{{ order.user?.email }}</div>
                </td>
                <td class="p-4 text-sm">{{ formatDate(order.createdAt?.toString() || '') }}</td>
                <td class="p-4 font-bold text-slate-800">${{ order.total }}</td>
                <td class="p-4">
                    <span :class="['font-medium uppercase text-xs px-2 py-1 rounded-lg', getStatusColor(order.status)]">
                        {{ order.status }}
                    </span>
                </td>
                <td class="p-4">
                    <div class="flex items-center justify-center gap-2">
                         <select 
                            :value="order.status" 
                            @change="updateStatus(order.id, ($event.target as HTMLSelectElement).value)"
                            :disabled="updating === order.id"
                            class="bg-white text-slate-600 border border-slate-200 rounded-lg px-2 py-1 text-sm focus:border-cyan-500 outline-none shadow-sm"
                        >
                            <option v-for="s in statuses" :key="s" :value="s">{{ s }}</option>
                        </select>
                        <button 
                            @click="toggleExpand(order.id)"
                            class="p-2 text-cyan-500 hover:bg-cyan-50 rounded-lg transition-colors"
                            title="View Details"
                        >
                            <Icon name="ri:eye-line" size="18" />
                        </button>
                    </div>
                </td>
            </tr>
            <!-- Expanded Details Row -->
            <tr v-if="expandedOrder === order.id" class="bg-slate-50 border-b border-cyan-100">
                <td colspan="6" class="p-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in-down">
                        <!-- Shipping Info -->
                        <div>
                            <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Shipping Details</h4>
                            <div class="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                                <p class="text-slate-700 text-sm font-medium">{{ order.address }}</p>
                                <p class="text-slate-400 text-xs mt-1">User: {{ order.user?.name }} ({{ order.user?.email }})</p>
                            </div>
                        </div>

                        <!-- Order Items -->
                        <div>
                            <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Items</h4>
                            <div class="flex flex-col gap-3">
                                <div v-for="item in order.items" :key="item.id" class="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                    <div class="w-10 h-10 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0 border border-slate-100">
                                        <img :src="item.product.image || ''" class="w-full h-full object-cover" />
                                    </div>
                                    <div class="flex-grow">
                                        <div class="text-sm font-semibold text-slate-700 line-clamp-1">{{ item.product.name }}</div>
                                        <div class="text-xs text-slate-400">Qty: {{ item.quantity }} x ${{ item.price }}</div>
                                    </div>
                                     <div class="text-sm font-bold text-slate-800">${{ (item.quantity * Number(item.price)).toFixed(2) }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
          </template>
        </tbody>
      </table>
      
      <div v-if="filteredOrders.length === 0" class="p-8 text-center text-slate-500">
          No orders found.
      </div>
    </div>
  </div>
</template>
