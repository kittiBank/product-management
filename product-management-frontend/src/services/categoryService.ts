import type { Category, CategoryFormData } from "../types/category";
import { categoryMockData } from "../mockData/categories";

// Mock API service for categories
export const categoryService = {
  // Get all categories
  async getAll(): Promise<Category[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...categoryMockData.getAll()]), 300);
    });
  },

  // Get category by ID
  async getById(id: number): Promise<Category | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const category = categoryMockData.getAll().find((c) => c.id === id);
        resolve(category || null);
      }, 300);
    });
  },

  // Create a new category
  async create(data: CategoryFormData): Promise<Category> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newCategory: Category = {
          id: categoryMockData.getNextId(),
          ...data,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        categoryMockData.add(newCategory);
        resolve(newCategory);
      }, 300);
    });
  },

  // Update category
  async update(id: number, data: CategoryFormData): Promise<Category | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = categoryMockData.findIndex((c) => c.id === id);
        if (index !== -1) {
          const allCategories = categoryMockData.getAll();
          const existingCategory = allCategories[index];
          if (existingCategory) {
            const updatedCategory: Category = {
              id: existingCategory.id,
              createdAt: existingCategory.createdAt,
              ...data,
              updatedAt: new Date().toISOString(),
            };
            categoryMockData.update(index, updatedCategory);
            resolve(updatedCategory);
          } else {
            resolve(null);
          }
        } else {
          resolve(null);
        }
      }, 300);
    });
  },

  // Delete category
  async delete(id: number): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = categoryMockData.findIndex((c) => c.id === id);
        if (index !== -1) {
          categoryMockData.remove(index);
          resolve(true);
        } else {
          resolve(false);
        }
      }, 300);
    });
  },
};
