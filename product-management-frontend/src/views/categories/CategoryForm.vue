<!-- Category Form View - เพิ่ม/แก้ไขหมวดหมู่ -->
<template>
  <AppLayout>
    <div class="flex flex-col items-center pt-8">
      <div class="mb-6">
        <h2 class="m-0 text-gray-800 text-[28px] text-center">{{ isEditMode ? "Edit Category" : "Add Category" }}</h2>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-sm max-w-[600px] w-full">
      <form @submit.prevent="handleSubmit">
        <FormInput
          id="name"
          label="Category Name"
          v-model="formData.name"
          :required="true"
          :error-message="errors.name"
          placeholder="Enter category name"
        />

        <FormInput
          id="description"
          label="Description"
          type="textarea"
          v-model="formData.description"
          :required="true"
          :error-message="errors.description"
          placeholder="Enter category description"
        />

        <div class="flex gap-3 justify-end mt-6">
          <button type="button" @click="goBack" class="px-5 py-2.5 border-0 rounded cursor-pointer text-base font-medium transition-opacity hover:opacity-80 bg-gray-600 text-white">
            Cancel
          </button>
          <button type="submit" class="px-5 py-2.5 border-0 rounded cursor-pointer text-base font-medium transition-opacity hover:opacity-80 bg-primary-500 text-white">
            {{ isEditMode ? "Save" : "Add" }}
          </button>
        </div>
      </form>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { reactive, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import AppLayout from "../../components/layout/AppLayout.vue";
import FormInput from "../../components/common/FormInput.vue";
import { categoryService } from "../../services/categoryService";
import { required } from "../../utils/validation";
import type { CategoryFormData } from "../../types/category";
const router = useRouter();
const route = useRoute();
const categoryId = computed(() =>
  route.params.id ? parseInt(route.params.id as string) : null,
);
const isEditMode = computed(() => !!categoryId.value);

// Form data
const formData = reactive<CategoryFormData>({
  name: "",
  description: "",
});

// Validation errors
const errors = reactive({
  name: "",
  description: "",
});

// Load category for editing
onMounted(async () => {
  if (isEditMode.value && categoryId.value) {
    await loadCategory(categoryId.value);
  }
});

// Load category data
const loadCategory = async (id: number) => {
  try {
    const category = await categoryService.getById(id);
    if (category) {
      formData.name = category.name;
      formData.description = category.description;
    }
  } catch (error) {
    console.error("Error loading category:", error);
    alert("Error loading category data");
  }
};

// Validate form
const validateForm = (): boolean => {
  let isValid = true;

  // Clear errors
  Object.keys(errors).forEach((key) => {
    errors[key as keyof typeof errors] = "";
  });

  // Validate name
  const nameError = required(formData.name, "Category Name");
  if (nameError) {
    errors.name = nameError.message;
    isValid = false;
  }

  // Validate description
  const descError = required(formData.description, "Description");
  if (descError) {
    errors.description = descError.message;
    isValid = false;
  }

  return isValid;
};

// Handle form submission
const handleSubmit = async () => {
  if (!validateForm()) {
    return;
  }

  try {
    if (isEditMode.value && categoryId.value) {
      await categoryService.update(categoryId.value, formData);
      alert("Category updated successfully");
    } else {
      await categoryService.create(formData);
      alert("Category added successfully");
    }
    router.push("/categories");
  } catch (error) {
    console.error("Error saving category:", error);
    alert("Error saving data");
  }
};

// Navigate back
const goBack = () => {
  router.push("/categories");
};
</script>
