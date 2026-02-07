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
      @view="viewCategory"
      @edit="editCategory"
      @delete="deleteCategory"
    />
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import AppLayout from "../../components/layout/AppLayout.vue";
import DataTable from "../../components/common/DataTable.vue";
import { categoryService } from "../../services/categoryService";
import type { Category } from "../../types/category";

const router = useRouter();
const categories = ref<Category[]>([]);

// Define table columns
const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "Category Name" },
  { key: "description", label: "Description" },
];

// Load categories on mount
onMounted(async () => {
  await loadCategories();
});

// Load all categories
const loadCategories = async () => {
  try {
    categories.value = await categoryService.getAll();
  } catch (error) {
    console.error("Error loading categories:", error);
    alert("Error loading categories data");
  }
};

// Navigate to add category page
const goToAddCategory = () => {
  router.push("/categories/add");
};

// View category detail
const viewCategory = (id: number) => {
  router.push(`/categories/${id}`);
};

// Edit category
const editCategory = (id: number) => {
  router.push(`/categories/${id}/edit`);
};

// Delete category with confirmation
const deleteCategory = async (id: number) => {
  if (confirm("Are you sure you want to delete this category?")) {
    try {
      await categoryService.delete(id);
      await loadCategories();
      alert("Category deleted successfully");
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("Error deleting category");
    }
  }
};
</script>
