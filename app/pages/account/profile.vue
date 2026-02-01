<script setup lang="ts">
const { user, fetchUser } = useAuth();
const loading = ref(false);
const message = ref('');
const error = ref('');

const form = reactive({
    name: '',
    address: '',
    password: '',
    currentPassword: ''
});

// Initialize form with user data
const showPasswordSection = ref(false);

const resetForm = () => {
    if (user.value) {
        form.name = user.value.name || '';
        form.address = user.value.address || '';
    }
    form.password = '';
    form.currentPassword = ''; // Ensure current password lines up with earlier form definition
    showPasswordSection.value = false;
    error.value = '';
    message.value = '';
};

watchEffect(() => {
    if (user.value) {
        form.name = user.value.name || '';
        form.address = user.value.address || '';
    }
});

const handleUpdate = async () => {
    loading.value = true;
    message.value = '';
    error.value = '';
    
    try {
        await $fetch('/api/auth/profile', {
            method: 'PUT',
            body: form
        });
        message.value = 'Profile updated successfully';
        form.password = '';
        form.currentPassword = '';
        showPasswordSection.value = false;
        
        if (fetchUser) await fetchUser();
    } catch (e: any) {
        error.value = e.data?.message || 'Update failed';
    } finally {
        loading.value = false;
    }
};
</script>

<template>
    <div class="container mx-auto px-4 pt-[calc(var(--header-height)+2rem)] pb-12">
        <h1 class="text-3xl font-bold mb-8 text-primary">My Profile</h1>
        
        <div class="bg-white p-8 rounded-2xl shadow-xl border border-secondary/10 max-w-2xl">
            <div v-if="message" class="mb-4 p-4 bg-green-500/20 text-green-400 rounded-lg">{{ message }}</div>
            <div v-if="error" class="mb-4 p-4 bg-red-500/20 text-red-400 rounded-lg">{{ error }}</div>

            <form @submit.prevent="handleUpdate" class="flex flex-col gap-6">
                <!-- Name -->
                <div class="flex flex-col gap-2">
                    <label class="text-secondary font-medium uppercase text-xs tracking-wider">Full Name</label>
                    <input v-model="form.name" type="text" class="w-full px-4 py-3 bg-surface border border-secondary/20 rounded-xl text-primary focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all placeholder:text-gray-400" placeholder="Your Name" />
                </div>

                <!-- Address -->
                <div class="flex flex-col gap-2">
                    <label class="text-secondary font-medium uppercase text-xs tracking-wider">Shipping Address</label>
                    <textarea v-model="form.address" rows="3" class="w-full px-4 py-3 bg-surface border border-secondary/20 rounded-xl text-primary focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all placeholder:text-gray-400" placeholder="Your Address"></textarea>
                </div>

                <div class="h-px bg-secondary/10 my-2"></div>
                
                <!-- Password Toggle -->
                <div class="flex justify-between items-center">
                    <h3 class="text-lg text-primary font-bold">Security</h3>
                    <button type="button" @click="showPasswordSection = !showPasswordSection" class="text-accent text-sm font-medium hover:text-accent-hover transition-colors">
                        {{ showPasswordSection ? 'Cancel Change' : 'Change Password' }}
                    </button>
                </div>

                <!-- Password Section -->
                <div v-if="showPasswordSection" class="bg-background rounded-xl p-5 border border-secondary/20 flex flex-col gap-4 animate-in fade-in slide-in-from-top-2">
                     <div class="flex flex-col gap-2">
                        <label class="text-secondary font-medium uppercase text-xs tracking-wider">New Password</label>
                        <input v-model="form.password" type="password" class="w-full px-4 py-3 bg-surface border border-secondary/20 rounded-xl text-primary focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all" placeholder="New Password" />
                    </div>

                    <div class="flex flex-col gap-2">
                        <label class="text-secondary font-medium uppercase text-xs tracking-wider">Current Password</label>
                        <input v-model="form.currentPassword" type="password" required class="w-full px-4 py-3 bg-surface border border-secondary/20 rounded-xl text-primary focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all" placeholder="Current Password" />
                        <p class="text-xs text-secondary">Required to confirm changes</p>
                    </div>
                </div>

                <div class="flex gap-4 pt-4">
                     <button type="button" @click="resetForm" class="flex-1 px-6 py-3 border border-secondary/20 text-text-secondary font-bold rounded-xl hover:bg-secondary/10 transition-colors">
                        Cancel
                    </button>
                    <button type="submit" :disabled="loading" class="flex-1 bg-primary text-white font-bold py-3 px-6 rounded-xl hover:bg-primary/90 transition shadow-lg shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed">
                        {{ loading ? 'Saving...' : 'Save Changes' }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
