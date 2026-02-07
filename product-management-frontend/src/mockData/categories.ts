// Mock data for categories
import type { Category } from "../types/category";

let categories: Category[] = [
  {
    id: 1,
    name: "Mobile Phones",
    description: "Smartphones and mobile devices",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Laptop",
    description: "Computers and accessories",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 3,
    name: "Monitor",
    description: "Display screens and monitors",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

let nextCategoryId = 4;

export const categoryMockData = {
  getAll: () => categories,
  getNextId: () => nextCategoryId++,
  add: (category: Category) => categories.push(category),
  update: (index: number, category: Category) => {
    categories[index] = category;
  },
  remove: (index: number) => categories.splice(index, 1),
  findIndex: (predicate: (c: Category) => boolean) =>
    categories.findIndex(predicate),
};
