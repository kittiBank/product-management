<!-- Category List View - แสดงรายการหมวดหมู่ทั้งหมด -->
<template>
  <AppLayout>
    <div class="flex justify-between items-center mb-6">
      <h2 class="m-0 text-gray-800 text-3xl font-semibold">Category List</h2>
      <button 
        @click="goToAddCategory" 
        class="px-5 py-2.5 bg-primary-500 text-white rounded font-medium text-base transition-colors hover:bg-primary-700"
      >
        Add Category
      </button>
    </div>

    <DataTable
      :columns="columns"
      :data="categories"
      :startIndex="(currentPage - 1) * limit"
      @view="viewCategory"
      @edit="editCategory"
      @delete="deleteCategory"
    />

    <!-- Pagination Controls -->
    <div class="flex justify-between items-center mt-6">
      <div class="text-gray-600">
        Showing {{ (currentPage - 1) * limit + 1 }} to {{ Math.min(currentPage * limit, totalItems) }} of {{ totalItems }} categories
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
import { categoryService } from "../../services/categoryService";
import type { Category } from "../../types/category";
import { showError, showSuccess, showConfirm } from "../../utils/toast";

const router = useRouter();
const categories = ref<Category[]>([]);
const currentPage = ref(1);
const totalPages = ref(1);
const totalItems = ref(0);
const limit = 5;

// Define table columns
const columns = [
  { key: "no", label: "No" },
  { key: "name", label: "Category Name" },
  { key: "description", label: "Description" },
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

// Load categories on mount
onMounted(async () => {
  await loadCategories();
});

// Load all categories
const loadCategories = async () => {
  try {
    const result = await categoryService.getAll(currentPage.value, limit);
    categories.value = result.categories;
    currentPage.value = result.pagination.currentPage;
    totalPages.value = result.pagination.totalPages;
    totalItems.value = result.pagination.totalItems;
  } catch (error) {
    console.error("Error loading categories:", error);
    showError("Error loading categories data");
  }
};

// Change page
const changePage = async (page: number) => {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
  await loadCategories();
};

// Navigate to add category page
const goToAddCategory = () => {
  router.push("/categories/add");
};

// View category detail
const viewCategory = (id: number | string) => {
  router.push(`/categories/${id}`);
};

// Edit category
const editCategory = (id: number | string) => {
  router.push(`/categories/${id}/edit`);
};

// Delete category with confirmation
const deleteCategory = async (id: number | string) => {
  const confirmed = await showConfirm(
    "Are you sure?",
    "Do you want to delete this category?",
    "Confirm",
    "Cancel"
  );
  
  if (confirmed) {
    try {
      await categoryService.delete(id);
      await loadCategories();
      showSuccess("Category deleted successfully");
    } catch (error) {
      console.error("Error deleting category:", error);
      showError("Error deleting category");
    }
  }
};
</script>
