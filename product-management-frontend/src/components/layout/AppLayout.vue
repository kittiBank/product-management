<!-- Main Layout Component with Navigation -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-white">
    <header class="bg-gradient-to-r from-primary-500 to-primary-400 shadow-lg shadow-primary-500/30 sticky top-0 z-50">
      <div class="max-w-screen-xl mx-auto px-5">
        <div class="flex justify-between items-center py-4">
          <h1 class="text-2xl font-semibold text-white drop-shadow-sm m-0">
            Product Management System
          </h1>
          <nav class="flex gap-6">
            <RouterLink
              to="/products"
              class="text-white font-medium px-4 py-2 rounded transition-all duration-200 hover:bg-white/20 hover:-translate-y-0.5"
              active-class="bg-white/30 shadow-sm"
            >
              Products
            </RouterLink>
            <RouterLink
              to="/categories"
              class="text-white font-medium px-4 py-2 rounded transition-all duration-200 hover:bg-white/20 hover:-translate-y-0.5"
              active-class="bg-white/30 shadow-sm"
            >
              Categories
            </RouterLink>
          </nav>
        </div>
      </div>
    </header>

    <main class="py-6">
      <div class="max-w-screen-xl mx-auto px-5">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>
