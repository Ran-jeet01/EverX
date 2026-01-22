<script setup lang="ts">
import { ref, computed } from "vue";

definePageMeta({
  layout: "admin",
});

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
  status: "In Stock" | "Out of Stock";
  description: string;
  image: string | null;
}

// Fetch products from API
const {
  data: productData,
  pending,
  error,
} = await useFetch<Product[]>("/api/product/products");

// Use the fetched data directly
const products = productData;

// Form state
const defaultFormState = {
  name: "",
  price: 0,
  category: "Electronics",
  description: "",
  stock: 0,
  status: "In Stock" as "In Stock" | "Out of Stock",
  image: null as string | null,
};

const productForm = ref({ ...defaultFormState });
const showForm = ref(false);
const isEditing = ref(false);
const editingId = ref<number | null>(null);
const imagePreview = ref<string | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);

const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const url = URL.createObjectURL(target.files[0]);
    imagePreview.value = url;
    productForm.value.image = url;
  }
};

const triggerFileInput = () => fileInput.value?.click();

const resetForm = () => {
  productForm.value = { ...defaultFormState };
  imagePreview.value = null;
  isEditing.value = false;
  editingId.value = null;
};

const toggleForm = () => {
  if (showForm.value) resetForm();
  showForm.value = !showForm.value;
};

const editProduct = (product: Product) => {
  productForm.value = { ...product };
  imagePreview.value = product.image;
  isEditing.value = true;
  editingId.value = product.id;
  showForm.value = true;
};

const saveProduct = () => {
  // just for client side
  if (isEditing.value && editingId.value !== null) {
    const index = products.value?.findIndex((p) => p.id === editingId.value);
    if (index !== undefined && index !== -1 && products.value) {
      products.value[index] = {
        ...productForm.value,
        id: editingId.value,
        status: productForm.value.stock > 0 ? "In Stock" : "Out of Stock",
      };
    }
  } else {
    const newId = Math.max(...(products.value?.map((p) => p.id) || [0]), 0) + 1;
    products.value?.push({
      ...productForm.value,
      id: newId,
      status: productForm.value.stock > 0 ? "In Stock" : "Out of Stock",
    });
  }
  showForm.value = false;
  resetForm();
};

const deleteProduct = (id: number) => {
  if (!confirm("Delete this product?")) return;

  if (products.value) {
    products.value = products.value.filter((p) => p.id !== id);
  }
  resetForm();
};
</script>

<template>
  <div class="animate-fade-in-down">
    <div
      class="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4"
    >
      <div>
        <h2 class="text-3xl font-bold text-slate-800">Product Inventory</h2>
        <p class="text-slate-500">Manage your store listings and stock.</p>
      </div>

      <button
        @click="toggleForm"
        class="bg-cyan-500 hover:bg-cyan-600 text-white px-6 md:px-8 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-cyan-500/30 flex items-center gap-2 w-full md:w-auto justify-center"
        :disabled="pending"
      >
        <svg
          v-if="!showForm"
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clip-rule="evenodd"
          />
        </svg>
        {{ showForm ? "Back to List" : "Add Item" }}
      </button>
    </div>

    <!-- Loading / Error States -->
    <div v-if="pending" class="text-center py-20 text-slate-500">
      Loading products...
    </div>

    <div v-else-if="error" class="text-center py-20 text-rose-500">
      Error loading products: {{ error.message || "Unknown error" }}
    </div>

    <div v-else>
      <!-- Product Form -->
      <div
        v-if="showForm"
        class="bg-white p-6 md:p-10 rounded-[2.5rem] shadow-xl border border-cyan-100 mb-12 animate-fade-in-down"
      >
        <h3 class="text-xl font-bold mb-10 text-slate-800">
          {{ isEditing ? "Update Details" : "New Listing" }}
        </h3>
        <form @submit.prevent="saveProduct">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10">
            <!-- Media Section -->
            <div class="lg:col-span-1">
              <div
                class="aspect-square rounded-[2rem] bg-cyan-50 border-2 border-dashed border-cyan-200 flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer"
                @click="triggerFileInput"
              >
                <input
                  ref="fileInput"
                  type="file"
                  accept="image/*"
                  class="hidden"
                  @change="handleImageUpload"
                />
                <img
                  v-if="imagePreview"
                  :src="imagePreview"
                  alt="Preview"
                  class="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div
                  v-if="imagePreview"
                  class="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold text-sm"
                >
                  Update Image
                </div>
                <div
                  v-else
                  class="text-center group-hover:scale-105 transition-transform"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-12 w-12 text-cyan-300 mx-auto mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p
                    class="text-[10px] font-bold text-cyan-400 uppercase tracking-widest"
                  >
                    Upload Photo
                  </p>
                </div>
              </div>
            </div>

            <!-- Details Section -->
            <div
              class="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
            >
              <div>
                <label
                  class="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3"
                  >Item Name</label
                >
                <input
                  v-model="productForm.name"
                  type="text"
                  class="w-full px-5 py-4 rounded-2xl bg-cyan-50 border-none text-slate-800 focus:ring-2 focus:ring-cyan-500 transition-all outline-none"
                  required
                />
              </div>
              <div>
                <label
                  class="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3"
                  >Price ($)</label
                >
                <input
                  v-model.number="productForm.price"
                  type="number"
                  step="0.01"
                  class="w-full px-5 py-4 rounded-2xl bg-cyan-50 border-none text-slate-800 focus:ring-2 focus:ring-cyan-500 transition-all outline-none"
                  required
                />
              </div>
              <div>
                <label
                  class="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3"
                  >Category</label
                >
                <select
                  v-model="productForm.category"
                  class="w-full px-5 py-4 rounded-2xl bg-cyan-50 border-none text-slate-800 focus:ring-2 focus:ring-cyan-500 transition-all outline-none appearance-none"
                >
                  <option>Electronics</option>
                  <option>Furniture</option>
                  <option>Accessories</option>
                  <option>Clothing</option>
                </select>
              </div>
              <div>
                <label
                  class="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3"
                  >Manual Stock</label
                >
                <input
                  v-model.number="productForm.stock"
                  type="number"
                  class="w-full px-5 py-4 rounded-2xl bg-cyan-50 border-none text-slate-800 focus:ring-2 focus:ring-cyan-500 transition-all outline-none"
                />
              </div>
              <div class="md:col-span-2">
                <label
                  class="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3"
                  >Description</label
                >
                <textarea
                  v-model="productForm.description"
                  rows="3"
                  class="w-full px-5 py-4 rounded-2xl bg-cyan-50 border-none text-slate-800 focus:ring-2 focus:ring-cyan-500 transition-all outline-none resize-none"
                ></textarea>
              </div>
              <div
                class="md:col-span-2 flex flex-col sm:flex-row justify-end gap-4 mt-4"
              >
                <button
                  type="submit"
                  class="bg-cyan-500 hover:bg-cyan-600 text-white px-10 py-4 rounded-[1.5rem] font-bold transition-all shadow-xl shadow-cyan-500/30 w-full sm:w-auto"
                >
                  {{ isEditing ? "Update Item" : "Create Listing" }}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <!-- Inventory List -->
      <div
        class="bg-white rounded-[2.5rem] shadow-sm border border-cyan-100 overflow-hidden"
      >
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead
              class="bg-cyan-50/50 text-[10px] uppercase font-bold text-slate-400 tracking-widest"
            >
              <tr>
                <th class="px-10 py-6">Identity</th>
                <th class="px-10 py-6">Class</th>
                <th class="px-10 py-6">Price</th>
                <th class="px-10 py-6">Inventory</th>
                <th class="px-10 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-cyan-50">
              <tr
                v-for="product in products"
                :key="product.id"
                class="group hover:bg-cyan-50/30 transition-all"
              >
                <td class="px-10 py-8 flex items-center gap-6">
                  <div
                    class="h-16 w-16 rounded-2xl bg-cyan-50 overflow-hidden flex items-center justify-center border border-cyan-200 group-hover:scale-105 transition-transform duration-300"
                  >
                    <img
                      v-if="product.image"
                      :src="product.image"
                      alt="Product"
                      class="h-full w-full object-cover"
                    />
                    <svg
                      v-else
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-8 w-8 text-cyan-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div class="font-bold text-slate-800">
                      {{ product.name }}
                    </div>
                    <div
                      class="text-[10px] text-slate-400 uppercase tracking-tighter"
                    >
                      {{ product.description }}
                    </div>
                  </div>
                </td>
                <td class="px-10 py-8">
                  <span
                    class="text-xs font-bold text-slate-500 bg-cyan-50 px-3 py-1 rounded-lg"
                    >{{ product.category }}</span
                  >
                </td>
                <td class="px-10 py-8 font-extrabold text-cyan-600 text-lg">
                  ${{ product.price.toFixed(2) }}
                </td>
                <td class="px-10 py-8">
                  <span
                    class="text-sm font-extrabold"
                    :class="
                      product.stock > 0 ? 'text-emerald-500' : 'text-rose-500'
                    "
                    >{{ product.stock }} UNIT</span
                  >
                </td>
                <td class="px-10 py-8 text-right space-x-4">
                  <button
                    @click="editProduct(product)"
                    class="p-2 text-slate-400 hover:text-cyan-500 transition-colors"
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
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </button>
                  <button
                    @click="deleteProduct(product.id)"
                    class="p-2 text-slate-400 hover:text-rose-500 transition-colors"
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
