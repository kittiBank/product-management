import type { Category, CategoryFormData } from "../types/category";
import { categoryMockData } from "../mockData/categories";
import apiClient from "../config/api";

// API response type for pagination
interface CategoryListResponse {
  success: boolean;
  message: string;
  data: Category[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    limit: number;
  };
}

// Mock API service for categories
export const categoryService = {
  // Get all categories - Now using real API
  async getAll(page = 1, limit = 100, search = '') {
    try {
      const response = await apiClient.get<CategoryListResponse>('/categories', {
        params: { page, limit, search }
      });

      const categories = response.data.data.map((category: any) => ({
        id: category._id,
        name: category.name,
        description: category.description || '',
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
      }));

      return {
        categories,
        pagination: response.data.pagination,
      };
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },

  // Get category by ID - Now using real API
  async getById(id: number | string): Promise<Category | null> {
    try {
      const response = await apiClient.get<{
        success: boolean;
        message: string;
        data: any;
      }>(`/category/${id}`);

      const category = response.data.data;
      return {
        id: category._id,
        name: category.name,
        description: category.description || '',
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
      };
    } catch (error: any) {
      if (error.response?.status === 404) {
        return null;
      }
      console.error("Error fetching category:", error);
      throw error;
    }
  },

  // Create a new category - Now using real API
  async create(data: CategoryFormData): Promise<Category> {
    try {
      const response = await apiClient.post<{
        success: boolean;
        message: string;
        data: any;
      }>('/category', data);

      const category = response.data.data;
      return {
        id: category._id,
        name: category.name,
        description: category.description || '',
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
      };
    } catch (error) {
      console.error("Error creating category:", error);
      throw error;
    }
  },

  // Update category - Now using real API
  async update(id: number | string, data: CategoryFormData): Promise<Category | null> {
    try {
      const response = await apiClient.put<{
        success: boolean;
        message: string;
        data: any;
      }>(`/category/${id}`, data);

      const category = response.data.data;
      return {
        id: category._id,
        name: category.name,
        description: category.description || '',
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
      };
    } catch (error: any) {
      if (error.response?.status === 404) {
        return null;
      }
      console.error("Error updating category:", error);
      throw error;
    }
  },

  // Delete category - Now using real API
  async delete(id: number | string): Promise<boolean> {
    try {
      await apiClient.delete(`/category/${id}`);
      return true;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return false;
      }
      console.error("Error deleting category:", error);
      throw error;
    }
  },
};
