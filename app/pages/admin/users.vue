<script setup lang="ts">
import { ref, computed } from "vue";

definePageMeta({
  layout: "admin",
});

interface User {
  id: string;
  name: string | null;
  email: string;
  role: string;
}

// Reactive state
const searchQuery = ref("");
const isEditing = ref(false);
const editingUser = ref<User | null>(null);
const selectedRole = ref<User["role"]>("User");

const { user: currentUser } = useAuth();

// Fetch users from API
const { data, pending, error } = useFetch<User[]>("/api/user/users");

// Use the fetched data directly (data is Ref<User[] | null>)
const users = data;
// Computed filtered users (safe against null)
const filteredUsers = computed(() => {
  if (!users.value) return [];

  if (!searchQuery.value.trim()) {
    return users.value;
  }

  const query = searchQuery.value.toLowerCase().trim();
  return users.value.filter((user) => user.email.toLowerCase().includes(query));
});

// Open edit modal
const openEditModal = (user: User) => {
  editingUser.value = { ...user }; // create a copy to avoid mutating original directly
  selectedRole.value = user.role;
  isEditing.value = true;
};

const closeEditModal = () => {
  isEditing.value = false;
  editingUser.value = null;
  // selectedRole.value = "User"; // optional reset
};

// Save role change
const saveRole = async () => {
  if (!editingUser.value || !users.value) return;

  try {
    await $fetch('/api/user/users', {
      method: 'PUT',
      body: {
        id: editingUser.value.id,
        role: selectedRole.value.toLowerCase() // Ensure backend receives lowercase 'admin'/'user'
      }
    });

    const user = users.value.find((u) => u.id === editingUser.value!.id);
    if (user) {
      user.role = selectedRole.value.toLowerCase(); // Update local state
    }
    const { success } = useToast();
    success('Role updated successfully');
    closeEditModal();
  } catch (e) {
    const { error } = useToast();
    error('Failed to update role');
  }
};

// Delete user
const deleteUser = async (id: string) => {
  if (!confirm("Are you sure you want to delete this user?")) return;

  try {
    await $fetch(`/api/user/users?id=${id}`, {
      method: 'DELETE'
    });

    if (users.value) {
      users.value = users.value.filter((u) => u.id !== id);
    }
    const { success } = useToast();
    success('User deleted successfully');
  } catch (e) {
    const { error } = useToast();
    error('Failed to delete user');
  }
};
</script>

<template>
  <div class="animate-fade-in-down">
    <div
      class="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4"
    >
      <div>
        <h2 class="text-3xl font-bold text-slate-800">Admin Access Control</h2>
        <p class="text-slate-500">Manage user roles and system permissions.</p>
      </div>
      <div class="relative w-full md:w-72 group">
        <div
          class="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none"
        >
          <svg
            class="h-4 w-4 text-slate-400 group-focus-within:text-cyan-500 transition-colors"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          v-model="searchQuery"
          type="text"
          class="block w-full pl-12 pr-5 py-3 bg-white rounded-2xl border border-cyan-200 text-sm focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all placeholder:text-slate-400 shadow-sm"
          placeholder="Filter by email..."
        />
      </div>
    </div>

    <!-- Users Table -->
    <div
      class="bg-white rounded-[2.5rem] shadow-sm border border-cyan-100 overflow-hidden"
    >
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead
            class="bg-cyan-50/50 text-[10px] uppercase font-bold text-slate-400 tracking-widest"
          >
            <tr>
              <th class="px-10 py-6">Member</th>
              <th class="px-10 py-6">Email Address</th>
              <th class="px-10 py-6">System Role</th>
              <th class="px-10 py-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-cyan-50">
            <tr
              v-for="user in filteredUsers"
              :key="user.id"
              class="hover:bg-cyan-50/30 transition-colors"
              :class="{
                'bg-cyan-50/60 border-l-4 border-cyan-500':
                  user.id === currentUser?.id,
              }"
            >
              <td class="px-10 py-8 flex items-center gap-5">
                <div
                  class="h-12 w-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-cyan-400 flex items-center justify-center text-white font-black text-sm shadow-md shadow-cyan-500/20"
                >
                  {{ (user.name || user.email).charAt(0).toUpperCase() }}
                </div>
                <span class="font-bold text-slate-800"
                  >{{ user.name || "Unknown" }}
                  <span
                    v-if="user.id === currentUser?.id"
                    class="ml-2 text-xs text-cyan-500 bg-cyan-100 px-2 py-0.5 rounded-full"
                    >You</span
                  ></span
                >
              </td>
              <td class="px-10 py-8 text-slate-500 font-medium text-sm">
                {{ user.email }}
              </td>
              <td class="px-10 py-8">
                <span
                  :class="{
                    'bg-cyan-500/10 text-cyan-600': user.role === 'admin',
                    'bg-slate-100 text-slate-500': user.role !== 'admin',
                  }"
                  class="px-4 py-1.5 text-[10px] font-black rounded-xl uppercase tracking-widest"
                >
                  {{ user.role }}
                </span>
              </td>
              <td class="px-10 py-8 text-right space-x-2">
                <button
                  v-if="user.id !== currentUser?.id"
                  @click="openEditModal(user)"
                  class="px-5 py-2 text-xs font-bold text-slate-600 hover:bg-cyan-50 rounded-xl border border-cyan-200 transition-all"
                >
                  Assign Role
                </button>
                <button
                  v-if="user.id !== currentUser?.id"
                  @click="deleteUser(user.id)"
                  class="p-2 text-slate-300 hover:text-rose-500 transition-colors"
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
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Edit Role Modal -->
    <div
      v-if="isEditing"
      class="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm animate-fade-in"
      @click.self="closeEditModal"
    >
      <div
        class="bg-white rounded-[2rem] shadow-2xl w-full max-w-sm p-8 transform transition-all animate-fade-in-down border border-cyan-100"
      >
        <h3 class="text-xl font-bold text-slate-800 mb-1">Change User Role</h3>
        <p class="text-slate-500 text-sm mb-6">
          Updating role for
          <span class="text-cyan-600 font-semibold">{{
            editingUser?.name
          }}</span>
        </p>

        <div class="flex flex-col gap-3 mb-8">
          <button
            v-for="role in ['Admin', 'User'] as const"
            :key="role"
            @click="selectedRole = role"
            :class="
              selectedRole === role
                ? 'border-cyan-500 bg-cyan-50 ring-1 ring-cyan-500'
                : 'border-cyan-100 bg-slate-50'
            "
            class="w-full p-4 text-left rounded-xl border-2 transition-all flex items-center justify-between group"
          >
            <span
              class="font-bold text-sm tracking-wide"
              :class="
                selectedRole === role ? 'text-cyan-600' : 'text-slate-600'
              "
              >{{ role }}</span
            >
            <div
              v-if="selectedRole === role"
              class="h-5 w-5 rounded-full bg-cyan-500 flex items-center justify-center text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-3 w-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </button>
        </div>

        <div class="flex gap-3">
          <button
            @click="closeEditModal"
            class="flex-1 py-3 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors"
          >
            Cancel
          </button>
          <button
            @click="saveRole"
            class="flex-1 py-3 bg-cyan-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-cyan-500/30 hover:bg-cyan-600 transition-all"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.2s ease-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
