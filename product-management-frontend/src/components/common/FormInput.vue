<!-- Form Input Component - Input field พร้อม validation -->
<template>
  <div class="mb-4">
    <label :for="id" v-if="label" class="block mb-2 font-medium text-gray-700">
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>

    <input
      v-if="type !== 'textarea' && type !== 'select'"
      :id="id"
      :type="type"
      :value="modelValue"
      @input="handleInput"
      :placeholder="placeholder"
      :required="required"
      :min="min"
      :max="max"
      :step="step"
      :class="[
        'w-full px-3 py-2.5 border rounded text-sm transition-colors box-border',
        errorMessage
          ? 'border-red-500 focus:outline-none focus:border-red-500'
          : 'border-gray-300 focus:outline-none focus:border-primary-500'
      ]"
    />

    <textarea
      v-else-if="type === 'textarea'"
      :id="id"
      :value="modelValue"
      @input="handleInput"
      :placeholder="placeholder"
      :required="required"
      :rows="rows"
      :class="[
        'w-full px-3 py-2.5 border rounded text-sm transition-colors resize-y min-h-[80px] box-border',
        errorMessage
          ? 'border-red-500 focus:outline-none focus:border-red-500'
          : 'border-gray-300 focus:outline-none focus:border-primary-500'
      ]"
    />

    <select
      v-else-if="type === 'select'"
      :id="id"
      :value="modelValue"
      @change="handleInput"
      :required="required"
      :class="[
        'w-full px-3 py-2.5 border rounded text-sm cursor-pointer bg-white transition-colors box-border',
        errorMessage
          ? 'border-red-500 focus:outline-none focus:border-red-500'
          : 'border-gray-300 focus:outline-none focus:border-primary-500'
      ]"
    >
      <option value="" disabled>{{ placeholder || "เลือก..." }}</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>

    <span v-if="errorMessage" class="block mt-1 text-xs text-red-500">
      {{ errorMessage }}
    </span>
  </div>
</template>

<script setup lang="ts">
// Props definition
interface Option {
  value: string | number;
  label: string;
}

interface Props {
  id?: string;
  label?: string;
  type?: "text" | "number" | "email" | "password" | "textarea" | "select";
  modelValue: string | number;
  placeholder?: string;
  required?: boolean;
  errorMessage?: string;
  min?: number;
  max?: number;
  step?: number;
  rows?: number;
  options?: Option[];
}

withDefaults(defineProps<Props>(), {
  type: "text",
  required: false,
  rows: 4,
});

// Events definition
const emit = defineEmits<{
  "update:modelValue": [value: string | number];
}>();

// Handle input change
const handleInput = (event: Event) => {
  const target = event.target as
    | HTMLInputElement
    | HTMLTextAreaElement
    | HTMLSelectElement;
  const value =
    target.type === "number" ? parseFloat(target.value) : target.value;
  emit("update:modelValue", value);
};
</script>
