<!-- Product Detail View - แสดงรายละเอียดสินค้า -->
<template>
  <AppLayout>
    <div class="flex justify-between items-center mb-6">
      <h2 class="m-0 text-gray-800 text-[28px]">Product Details</h2>
      <div class="flex gap-3">
        <button @click="editProduct" class="px-5 py-2.5 border-0 rounded cursor-pointer text-base font-medium transition-opacity hover:opacity-80 bg-orange-500 text-white">Edit</button>
        <button @click="goBack" class="px-5 py-2.5 border-0 rounded cursor-pointer text-base font-medium transition-opacity hover:opacity-80 bg-gray-600 text-white">Back</button>
      </div>
    </div>

    <div v-if="product" class="bg-white p-6 rounded-lg shadow-sm max-w-[800px]">
      <div class="grid grid-cols-[200px_1fr] py-4 border-b border-gray-200">
        <span class="font-semibold text-gray-600">ID:</span>
        <span class="text-gray-800">{{ product.id }}</span>
      </div>

      <div class="grid grid-cols-[200px_1fr] py-4 border-b border-gray-200">
        <span class="font-semibold text-gray-600">Product Name:</span>
        <span class="text-gray-800">{{ product.name }}</span>
      </div>

      <div class="grid grid-cols-[200px_1fr] py-4 border-b border-gray-200">
        <span class="font-semibold text-gray-600">Description:</span>
        <span class="text-gray-800">{{ product.description }}</span>
      </div>

      <div class="grid grid-cols-[200px_1fr] py-4 border-b border-gray-200">
        <span class="font-semibold text-gray-600">Category:</span>
        <span class="text-gray-800">{{ product.categoryName }}</span>
      </div>

      <div class="grid grid-cols-[200px_1fr] py-4 border-b border-gray-200">
        <span class="font-semibold text-gray-600">Price:</span>
        <span class="text-gray-800">{{ formatCurrency(product.price) }}</span>
      </div>

      <div class="grid grid-cols-[200px_1fr] py-4 border-b border-gray-200">
        <span class="font-semibold text-gray-600">Stock:</span>
        <span class="text-gray-800">{{ formatNumber(product.stock) }}</span>
      </div>

      <div class="grid grid-cols-[200px_1fr] py-4 border-b border-gray-200">
        <span class="font-semibold text-gray-600">Created At:</span>
        <span class="text-gray-800">{{ formatDate(product.createdAt) }}</span>
      </div>

      <div class="grid grid-cols-[200px_1fr] py-4">
        <span class="font-semibold text-gray-600">Last Updated:</span>
        <span class="text-gray-800">{{ formatDate(product.updatedAt) }}</span>
      </div>
    </div>

    <div v-else class="text-center py-12 text-gray-400">Loading...</div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import AppLayout from "../../components/layout/AppLayout.vue";
import { productService } from "../../services/productService";
import type { Product } from "../../types/product";

const router = useRouter();
const route = useRoute();
const productId = computed(() => parseInt(route.params.id as string));
const product = ref<Product | null>(null);

// Load product on mount
onMounted(async () => {
  await loadProduct();
});

// Load product detail
const loadProduct = async () => {
  try {
    product.value = await productService.getById(productId.value);
    if (!product.value) {
      alert("Product not found");
      router.push("/products");
    }
  } catch (error) {
    console.error("Error loading product:", error);
    alert("Error loading data");
  }
};

// Format currency
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
  }).format(value);
};

// Format number
const formatNumber = (value: number) => {
  return new Intl.NumberFormat("th-TH").format(value);
};

// Format date
const formatDate = (value: string) => {
  return new Date(value).toLocaleString("th-TH");
};

// Navigate to edit page
const editProduct = () => {
  router.push(`/products/${productId.value}/edit`);
};

// Navigate back
const goBack = () => {
  router.push("/products");
};
</script>
