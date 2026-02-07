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
      @view="viewProduct"
      @edit="editProduct"
      @delete="deleteProduct"
    />
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import AppLayout from "../../components/layout/AppLayout.vue";
import DataTable from "../../components/common/DataTable.vue";
import { productService } from "../../services/productService";
import type { Product } from "../../types/product";

const router = useRouter();
const products = ref<Product[]>([]);

// Define table columns
const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "Product Name" },
  { key: "categoryName", label: "Category" },
  { key: "price", label: "Price", format: "currency" as const },
];

// Load products on mount
onMounted(async () => {
  await loadProducts();
});

// Load all products
const loadProducts = async () => {
  try {
    products.value = await productService.getAll();
  } catch (error) {
    console.error("Error loading products:", error);
    alert("Error loading products data");
  }
};

// Navigate to add product page
const goToAddProduct = () => {
  router.push("/products/add");
};

// View product detail
const viewProduct = (id: number) => {
  router.push(`/products/${id}`);
};

// Edit product
const editProduct = (id: number) => {
  router.push(`/products/${id}/edit`);
};

// Delete product with confirmation
const deleteProduct = async (id: number) => {
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
