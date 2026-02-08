// Product type definitions
export interface Product {
  id: number | string;
  name: string;
  description: string;
  price: number;
  categoryId: number | string;
  categoryName?: string;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  categoryId: number | string;
  stock: number;
}
