<script setup lang="ts">
const { data: orders, pending, refresh } = await useFetch('/api/orders');

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

const getStatusColor = (status: string) => {
    switch (status) {
        case 'pending': return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/50';
        case 'processing': return 'bg-blue-500/20 text-blue-500 border-blue-500/50';
        case 'shipped': return 'bg-purple-500/20 text-purple-500 border-purple-500/50';
        case 'delivered': return 'bg-green-500/20 text-green-500 border-green-500/50';
        case 'cancelled': return 'bg-red-500/20 text-red-500 border-red-500/50';
        default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
};
</script>

<template>
    <div class="container mx-auto px-4 pt-[calc(var(--header-height)+2rem)] pb-12">
        <h1 class="text-3xl font-bold mb-8 text-primary">My Orders</h1>

        <div v-if="pending" class="text-text-secondary">Loading orders...</div>
        
        <div v-else-if="!orders || orders.length === 0" class="text-center py-12 bg-white rounded-2xl border border-secondary/10 shadow-sm">
            <p class="text-gray-400 text-lg">You haven't placed any orders yet.</p>
            <NuxtLink to="/products" class="inline-block mt-4 text-red-500 hover:text-red-400">Start Shopping &rarr;</NuxtLink>
        </div>

        <div v-else class="flex flex-col gap-4">
            <div v-for="order in orders" :key="order.id" class="bg-white p-6 rounded-2xl border border-secondary/10 shadow-sm hover:shadow-md transition-shadow">
                <div class="flex flex-col md:flex-row justify-between md:items-center gap-4">
                    <div>
                         <div class="text-xs font-bold uppercase tracking-wider text-text-secondary mb-1">Order #{{ order.id.slice(0, 8) }}</div>
                         <div class="text-primary font-bold text-lg">{{ formatDate(order.createdAt?.toString() || '') }}</div>
                         <div class="text-text-secondary text-sm mt-1">{{ order.address || 'No address' }}</div>
                    </div>
                    
                    <div class="flex flex-col items-end gap-2">
                        <div class="text-2xl font-bold text-primary">${{ order.total }}</div>
                        <span :class="['px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider', getStatusColor(order.status)]">
                            {{ order.status }}
                        </span>
                    </div>
                </div>
                
                <!-- Order Items & Details -->
                <div class="mt-4 border-t border-secondary/10 pt-4">
                    <div class="flex flex-col gap-3">
                        <div v-for="item in order.items" :key="item.id" class="flex items-center gap-4">
                            <div class="w-12 h-12 bg-gray-100 rounded-md overflow-hidden flex-shrink-0 border border-secondary/10">
                            <img :src="item.product.image || ''" :alt="item.product.name" class="w-full h-full object-cover" />
                            </div>
                            <div class="flex-grow">
                                 <div class="text-sm font-medium text-primary line-clamp-1">{{ item.product.name }}</div>
                                 <div class="text-xs text-text-secondary">Qty: {{ item.quantity }} x ${{ item.price }}</div>
                            </div>
                            <div class="text-sm font-bold text-primary">${{ (item.quantity * Number(item.price)).toFixed(2) }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
