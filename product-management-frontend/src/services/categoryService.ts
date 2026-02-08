import type { Category, CategoryFormData } from "../types/category";
import { categoryMockData } from "../mockData/categories";
import apiClient from "../config/api";

// Mock API service for categories
export const categoryService = {
  // Get all categories - Now using real API
  async getAll(): Promise<Category[]> {
    try {
      const response = await apiClient.get<{
        success: boolean;
        message: string;
        data: any[];
        pagination?: any;
      }>('/categories', {
        params: { page: 1, limit: 100 }
      });

      return response.data.data.map((category: any) => ({
        id: category._id,
        name: category.name,
        description: category.description || '',
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
      }));
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },

  // Get category by ID
  async getById(id: number | string): Promise<Category | null> {
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
  async update(id: number | string, data: CategoryFormData): Promise<Category | null> {
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
  async delete(id: number | string): Promise<boolean> {
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
