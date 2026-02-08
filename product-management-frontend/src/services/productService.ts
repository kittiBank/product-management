import type { Product, ProductFormData } from "../types/product";
import apiClient from "../config/api";

// API response type for pagination
interface ProductListResponse {
  success: boolean;
  message: string;
  data: Product[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    limit: number;
  };
}

// Mock API service for products
export const productService = {
  // Get all products (with category name) - Now using real API
  async getAll(page = 1, limit = 100, search = "") {
    try {
      const response = await apiClient.get<ProductListResponse>("/products", {
        params: { page, limit, search },
      });

      // Transform the response to match frontend Product type
      const products = response.data.data.map((product: any) => ({
        id: product._id,
        name: product.name,
        description: product.description,
        price: product.price,
        categoryId: product.categoryId?._id || product.categoryId,
        categoryName: product.categoryId?.name || "ไม่มีหมวดหมู่",
        stock: product.stock || 0,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      }));

      return {
        products,
        pagination: response.data.pagination,
      };
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },

  // Get product by ID - Now using real API
  async getById(id: number | string): Promise<Product | null> {
    try {
      const response = await apiClient.get<{
        success: boolean;
        message: string;
        data: any;
      }>(`/product/${id}`);

      const product = response.data.data;
      return {
        id: product._id,
        name: product.name,
        description: product.description,
        price: product.price,
        categoryId: product.categoryId?._id || product.categoryId,
        categoryName: product.categoryId?.name || "ไม่มีหมวดหมู่",
        stock: product.stock || 0,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      };
    } catch (error: any) {
      if (error.response?.status === 404) {
        return null;
      }
      console.error("Error fetching product:", error);
      throw error;
    }
  },

  // Create a new product - Now using real API
  async create(data: ProductFormData): Promise<Product> {
    try {
      const response = await apiClient.post<{
        success: boolean;
        message: string;
        data: any;
      }>('/product', data);

      const product = response.data.data;
      return {
        id: product._id,
        name: product.name,
        description: product.description,
        price: product.price,
        categoryId: product.categoryId?._id || product.categoryId,
        categoryName: product.categoryId?.name || "ไม่มีหมวดหมู่",
        stock: product.stock || 0,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      };
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  },

  // Update product - Now using real API
  async update(id: number | string, data: ProductFormData): Promise<Product | null> {
    try {
      const response = await apiClient.put<{
        success: boolean;
        message: string;
        data: any;
      }>(`/product/${id}`, data);

      const product = response.data.data;
      return {
        id: product._id,
        name: product.name,
        description: product.description,
        price: product.price,
        categoryId: product.categoryId?._id || product.categoryId,
        categoryName: product.categoryId?.name || "ไม่มีหมวดหมู่",
        stock: product.stock || 0,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      };
    } catch (error: any) {
      if (error.response?.status === 404) {
        return null;
      }
      console.error("Error updating product:", error);
      throw error;
    }
  },

  // Delete product - Now using real API
  async delete(id: number | string): Promise<boolean> {
    try {
      await apiClient.delete(`/product/${id}`);
      return true;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return false;
      }
      console.error("Error deleting product:", error);
      throw error;
    }
  },
};
