<!-- Category Detail View - แสดงรายละเอียดหมวดหมู่ -->
<template>
  <AppLayout>
    <div class="flex justify-between items-center mb-6">
      <h2 class="m-0 text-gray-800 text-[28px]">Category Details</h2>
      <div class="flex gap-3">
        <button @click="editCategory" class="px-5 py-2.5 border-0 rounded cursor-pointer text-base font-medium transition-opacity hover:opacity-80 bg-orange-500 text-white">Edit</button>
        <button @click="goBack" class="px-5 py-2.5 border-0 rounded cursor-pointer text-base font-medium transition-opacity hover:opacity-80 bg-gray-600 text-white">Back</button>
      </div>
    </div>

    <div v-if="category" class="bg-white p-6 rounded-lg shadow-sm max-w-[800px]">
      <div class="grid grid-cols-[200px_1fr] py-4 border-b border-gray-200">
        <span class="font-semibold text-gray-600">ID:</span>
        <span class="text-gray-800">{{ category.id }}</span>
      </div>

      <div class="grid grid-cols-[200px_1fr] py-4 border-b border-gray-200">
        <span class="font-semibold text-gray-600">Category Name:</span>
        <span class="text-gray-800">{{ category.name }}</span>
      </div>

      <div class="grid grid-cols-[200px_1fr] py-4 border-b border-gray-200">
        <span class="font-semibold text-gray-600">Description:</span>
        <span class="text-gray-800">{{ category.description }}</span>
      </div>

      <div class="grid grid-cols-[200px_1fr] py-4 border-b border-gray-200">
        <span class="font-semibold text-gray-600">Created At:</span>
        <span class="text-gray-800">{{ formatDate(category.createdAt) }}</span>
      </div>

      <div class="grid grid-cols-[200px_1fr] py-4">
        <span class="font-semibold text-gray-600">Last Updated:</span>
        <span class="text-gray-800">{{ formatDate(category.updatedAt) }}</span>
      </div>
    </div>

    <div v-else class="text-center py-12 text-gray-400">Loading...</div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import AppLayout from "../../components/layout/AppLayout.vue";
import { categoryService } from "../../services/categoryService";
import type { Category } from "../../types/category";

const router = useRouter();
const route = useRoute();
const categoryId = computed(() => parseInt(route.params.id as string));
const category = ref<Category | null>(null);

// Load category on mount
onMounted(async () => {
  await loadCategory();
});

// Load category detail
const loadCategory = async () => {
  try {
    category.value = await categoryService.getById(categoryId.value);
    if (!category.value) {
      alert("Category not found");
      router.push("/categories");
    }
  } catch (error) {
    console.error("Error loading category:", error);
    alert("Error loading data");
  }
};

// Format date
const formatDate = (value: string) => {
  return new Date(value).toLocaleString("th-TH");
};

// Navigate to edit page
const editCategory = () => {
  router.push(`/categories/${categoryId.value}/edit`);
};

// Navigate back
const goBack = () => {
  router.push("/categories");
};
</script>
