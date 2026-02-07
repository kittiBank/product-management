import { createRouter, createWebHistory } from "vue-router";

// component imports
import ProductList from "../views/products/ProductList.vue";
import ProductForm from "../views/products/ProductForm.vue";
import ProductDetail from "../views/products/ProductDetail.vue";
import CategoryList from "../views/categories/CategoryList.vue";
import CategoryForm from "../views/categories/CategoryForm.vue";
import CategoryDetail from "../views/categories/CategoryDetail.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/products",
    },
    // Product routes
    {
      path: "/products",
      name: "product-list",
      component: ProductList,
    },
    {
      path: "/products/add",
      name: "product-add",
      component: ProductForm,
    },
    {
      path: "/products/:id",
      name: "product-detail",
      component: ProductDetail,
    },
    {
      path: "/products/:id/edit",
      name: "product-edit",
      component: ProductForm,
    },
    // Category routes
    {
      path: "/categories",
      name: "category-list",
      component: CategoryList,
    },
    {
      path: "/categories/add",
      name: "category-add",
      component: CategoryForm,
    },
    {
      path: "/categories/:id",
      name: "category-detail",
      component: CategoryDetail,
    },
    {
      path: "/categories/:id/edit",
      name: "category-edit",
      component: CategoryForm,
    },
  ],
});

export default router;
