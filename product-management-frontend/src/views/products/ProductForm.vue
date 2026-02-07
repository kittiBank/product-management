<!-- Product Form View - เพิ่ม/แก้ไขสินค้า -->
<template>
  <AppLayout>
    <div class="mb-6">
      <h2 class="m-0 text-gray-800 text-[28px]">{{ isEditMode ? "Edit Product" : "Add Product" }}</h2>
    </div>

    <div class="bg-white p-6 rounded-lg shadow-sm max-w-[600px]">
      <form @submit.prevent="handleSubmit">
        <FormInput
          id="name"
          label="Product Name"
          v-model="formData.name"
          :required="true"
          :error-message="errors.name"
          placeholder="Enter product name"
        />

        <FormInput
          id="description"
          label="Description"
          type="textarea"
          v-model="formData.description"
          :required="true"
          :error-message="errors.description"
          placeholder="Enter product description"
        />

        <FormInput
          id="categoryId"
          label="Category"
          type="select"
          v-model="formData.categoryId"
          :required="true"
          :error-message="errors.categoryId"
          :options="categoryOptions"
          placeholder="Select category"
        />

        <FormInput
          id="price"
          label="Price (THB)"
          type="number"
          v-model="formData.price"
          :required="true"
          :error-message="errors.price"
          :min="0"
          :step="0.01"
          placeholder="0.00"
        />

        <FormInput
          id="stock"
          label="Stock Quantity"
          type="number"
          v-model="formData.stock"
          :required="true"
          :error-message="errors.stock"
          :min="0"
          placeholder="0"
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
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import AppLayout from "../../components/layout/AppLayout.vue";
import FormInput from "../../components/common/FormInput.vue";
import { productService } from "../../services/productService";
import { categoryService } from "../../services/categoryService";
import {
  required,
  positiveNumber,
  nonNegativeNumber,
} from "../../utils/validation";
import type { ProductFormData } from "../../types/product";
import type { Category } from "../../types/category";

const router = useRouter();
const route = useRoute();
const productId = computed(() =>
  route.params.id ? parseInt(route.params.id as string) : null,
);
const isEditMode = computed(() => !!productId.value);

// Form data
const formData = reactive<ProductFormData>({
  name: "",
  description: "",
  price: 0,
  categoryId: 0,
  stock: 0,
});

// Validation errors
const errors = reactive({
  name: "",
  description: "",
  price: "",
  categoryId: "",
  stock: "",
});

// Categories for select options
const categories = ref<Category[]>([]);
const categoryOptions = computed(() =>
  categories.value.map((cat) => ({
    value: cat.id,
    label: cat.name,
  })),
);

// Load data on mount
onMounted(async () => {
  await loadCategories();
  if (isEditMode.value && productId.value) {
    await loadProduct(productId.value);
  }
});

// Load categories
const loadCategories = async () => {
  try {
    categories.value = await categoryService.getAll();
  } catch (error) {
    console.error("Error loading categories:", error);
    alert("Error loading categories data");
  }
};

// Load product for editing
const loadProduct = async (id: number) => {
  try {
    const product = await productService.getById(id);
    if (product) {
      formData.name = product.name;
      formData.description = product.description;
      formData.price = product.price;
      formData.categoryId = product.categoryId;
      formData.stock = product.stock;
    }
  } catch (error) {
    console.error("Error loading product:", error);
    alert("Error loading product data");
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
  const nameError = required(formData.name, "Product Name");
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

  // Validate category
  const categoryError = required(formData.categoryId, "Category");
  if (categoryError || formData.categoryId === 0) {
    errors.categoryId = "Please select a category";
    isValid = false;
  }

  // Validate price
  const priceError = positiveNumber(formData.price, "Price");
  if (priceError) {
    errors.price = priceError.message;
    isValid = false;
  }

  // Validate stock
  const stockError = nonNegativeNumber(formData.stock, "Stock Quantity");
  if (stockError) {
    errors.stock = stockError.message;
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
    if (isEditMode.value && productId.value) {
      await productService.update(productId.value, formData);
      alert("Product updated successfully");
    } else {
      await productService.create(formData);
      alert("Product added successfully");
    }
    router.push("/products");
  } catch (error) {
    console.error("Error saving product:", error);
    alert("Error saving data");
  }
};

// Navigate back
const goBack = () => {
  router.push("/products");
};
</script>
