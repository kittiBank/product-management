// Product type definitions
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  categoryName?: string;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  categoryId: number;
  stock: number;
}
