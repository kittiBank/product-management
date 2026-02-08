// Category type definitions
export interface Category {
  id: number | string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryFormData {
  name: string;
  description: string;
}
