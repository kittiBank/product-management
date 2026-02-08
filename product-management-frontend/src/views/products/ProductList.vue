<!-- Product List View - แสดงรายการสินค้าทั้งหมด -->
<template>
  <AppLayout>
    <div class="flex justify-between items-center mb-6">
      <h2 class="m-0 text-gray-800 text-3xl font-semibold">Product List</h2>
      <button 
        @click="goToAddProduct" 
        class="px-5 py-2.5 bg-primary-500 text-white rounded font-medium text-base transition-colors hover:bg-primary-700"
      >
        Add Product
      </button>
    </div>

    <DataTable
      :columns="columns"
      :data="products"
      :startIndex="(currentPage - 1) * limit"
      @view="viewProduct"
      @edit="editProduct"
      @delete="deleteProduct"
    />

    <!-- Pagination Controls -->
    <div class="flex justify-between items-center mt-6">
      <div class="text-gray-600">
        Showing {{ (currentPage - 1) * limit + 1 }} to {{ Math.min(currentPage * limit, totalItems) }} of {{ totalItems }} products
      </div>
      <div class="flex gap-2">
        <button
          @click="changePage(currentPage - 1)"
          :disabled="currentPage === 1"
          class="px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>
        <button
          v-for="page in displayPages"
          :key="page"
          @click="changePage(page)"
          :class="[
            'px-4 py-2 border rounded transition-colors',
            currentPage === page
              ? 'bg-primary-500 text-white border-primary-500'
              : 'bg-white border-gray-300 hover:bg-gray-50'
          ]"
        >
          {{ page }}
        </button>
        <button
          @click="changePage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import AppLayout from "../../components/layout/AppLayout.vue";
import DataTable from "../../components/common/DataTable.vue";
import { productService } from "../../services/productService";
import type { Product } from "../../types/product";

const router = useRouter();
const products = ref<Product[]>([]);
const currentPage = ref(1);
const totalPages = ref(1);
const totalItems = ref(0);
const limit = 5;

// Define table columns
const columns = [
  { key: "no", label: "No" },
  { key: "name", label: "Product Name" },
  { key: "categoryName", label: "Category" },
  { key: "price", label: "Price", format: "currency" as const },
];

// Computed property for pagination display
const displayPages = computed(() => {
  const pages = [];
  const maxDisplayPages = 5;
  let startPage = Math.max(1, currentPage.value - Math.floor(maxDisplayPages / 2));
  let endPage = Math.min(totalPages.value, startPage + maxDisplayPages - 1);
  
  if (endPage - startPage + 1 < maxDisplayPages) {
    startPage = Math.max(1, endPage - maxDisplayPages + 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  
  return pages;
});

// Load products on mount
onMounted(async () => {
  await loadProducts();
});

// Load all products
const loadProducts = async () => {
  try {
    const result = await productService.getAll(currentPage.value, limit);
    products.value = result.products;
    currentPage.value = result.pagination.currentPage;
    totalPages.value = result.pagination.totalPages;
    totalItems.value = result.pagination.totalItems;
  } catch (error) {
    console.error("Error loading products:", error);
    alert("Error loading products data");
  }
};

// Change page
const changePage = async (page: number) => {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
  await loadProducts();
};

// Navigate to add product page
const goToAddProduct = () => {
  router.push("/products/add");
};

// View product detail
const viewProduct = (id: number | string) => {
  router.push(`/products/${id}`);
};

// Edit product
const editProduct = (id: number | string) => {
  router.push(`/products/${id}/edit`);
};

// Delete product with confirmation
const deleteProduct = async (id: number | string) => {
  if (confirm("Are you sure you want to delete this product?")) {
    try {
      await productService.delete(id);
      await loadProducts();
      alert("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error deleting product");
    }
  }
};
</script>
