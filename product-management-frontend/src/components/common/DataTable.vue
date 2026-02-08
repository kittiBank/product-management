<!-- Data Table Component - แสดงข้อมูลในรูปแบบตาราง -->
<template>
  <div class="overflow-x-auto bg-white rounded-lg shadow-sm">
    <table class="w-full border-collapse">
      <thead>
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
            class="bg-gray-100 px-3 py-3 text-left font-semibold text-gray-700 border-b-2 border-gray-300"
          >
            {{ column.label }}
          </th>
          <th v-if="showActions" class="bg-gray-100 px-3 py-3 text-left font-semibold text-gray-700 border-b-2 border-gray-300">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data" :key="item.id" class="hover:bg-gray-50 transition-colors">
          <td
            v-for="column in columns"
            :key="column.key"
            class="px-3 py-3 border-b border-gray-200 text-gray-600"
          >
            {{ column.key === 'no' ? startIndex + index + 1 : formatValue(item[column.key], column.format) }}
          </td>
          <td v-if="showActions" class="px-3 py-3 border-b border-gray-200">
            <div class="flex gap-2">
              <button
                @click="$emit('view', item.id)"
                class="px-3 py-1.5 bg-primary-500 text-white text-sm rounded hover:bg-primary-600 transition-colors"
              >
                View
              </button>
              <button
                @click="$emit('edit', item.id)"
                class="px-3 py-1.5 bg-orange-500 text-white text-sm rounded hover:bg-orange-600 transition-colors"
              >
                Edit
              </button>
              <button
                @click="$emit('delete', item.id)"
                class="px-3 py-1.5 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
        <tr v-if="data.length === 0">
          <td
            :colspan="columns.length + (showActions ? 1 : 0)"
            class="text-center text-gray-400 py-6"
          >
            No data available
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
// Props definition
interface Column {
  key: string;
  label: string;
  format?: "currency" | "date" | "number";
}

interface Props {
  columns: Column[];
  data: any[];
  showActions?: boolean;
  startIndex?: number; // For pagination support
}

withDefaults(defineProps<Props>(), {
  showActions: true,
  startIndex: 0,
});

// Events definition
defineEmits<{
  view: [id: number | string];
  edit: [id: number | string];
  delete: [id: number | string];
}>();

// Format value based on type
const formatValue = (value: any, format?: string) => {
  if (value === null || value === undefined) return "-";

  switch (format) {
    case "currency":
      return new Intl.NumberFormat("th-TH", {
        style: "currency",
        currency: "THB",
      }).format(value);
    case "date":
      return new Date(value).toLocaleDateString("th-TH");
    case "number":
      return new Intl.NumberFormat("th-TH").format(value);
    default:
      return value;
  }
};
</script>
