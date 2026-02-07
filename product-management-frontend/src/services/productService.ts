import type { Product, ProductFormData } from "../types/product";
import { categoryService } from "./categoryService";
import { productMockData } from "../mockData/products";

// Mock API service for products
export const productService = {
  // Get all products (with category name)
  async getAll(): Promise<Product[]> {
    return new Promise(async (resolve) => {
      setTimeout(async () => {
        const categories = await categoryService.getAll();
        const productsWithCategory = productMockData.getAll().map((product) => {
          const category = categories.find((c) => c.id === product.categoryId);
          return {
            ...product,
            categoryName: category?.name || "ไม่มีหมวดหมู่",
          };
        });
        resolve(productsWithCategory);
      }, 300);
    });
  },

  // Get product by ID
  async getById(id: number): Promise<Product | null> {
    return new Promise(async (resolve) => {
      setTimeout(async () => {
        const product = productMockData.getAll().find((p) => p.id === id);
        if (product) {
          const category = await categoryService.getById(product.categoryId);
          resolve({
            ...product,
            categoryName: category?.name || "ไม่มีหมวดหมู่",
          });
        } else {
          resolve(null);
        }
      }, 300);
    });
  },

  // Create a new product
  async create(data: ProductFormData): Promise<Product> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newProduct: Product = {
          id: productMockData.getNextId(),
          ...data,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        productMockData.add(newProduct);
        resolve(newProduct);
      }, 300);
    });
  },

  // Update product
  async update(id: number, data: ProductFormData): Promise<Product | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = productMockData.findIndex((p) => p.id === id);
        if (index !== -1) {
          const allProducts = productMockData.getAll();
          const existingProduct = allProducts[index];
          if (existingProduct) {
            const updatedProduct: Product = {
              id: existingProduct.id,
              createdAt: existingProduct.createdAt,
              ...data,
              updatedAt: new Date().toISOString(),
            };
            productMockData.update(index, updatedProduct);
            resolve(updatedProduct);
          } else {
            resolve(null);
          }
        } else {
          resolve(null);
        }
      }, 300);
    });
  },

  // Delete product
  async delete(id: number): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = productMockData.findIndex((p) => p.id === id);
        if (index !== -1) {
          productMockData.remove(index);
          resolve(true);
        } else {
          resolve(false);
        }
      }, 300);
    });
  },
};
