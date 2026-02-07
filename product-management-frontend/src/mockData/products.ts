// Mock data for products
import type { Product } from "../types/product";

let products: Product[] = [
  {
    id: 1,
    name: "Samsung Galaxy S21",
    description: "Smartphone samsung lastest model",
    price: 25900,
    categoryId: 1,
    stock: 50,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Apple MacBook Air M2",
    description: "Apple MacBook Air laptop",
    price: 29900,
    categoryId: 2,
    stock: 150,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 3,
    name: "LG 24MP59G Monitor",
    description: "LG 24MP59G Monitor display screen",
    price: 10000,
    categoryId: 3,
    stock: 500,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

let nextProductId = 4;

export const productMockData = {
  getAll: () => products,
  getNextId: () => nextProductId++,
  add: (product: Product) => products.push(product),
  update: (index: number, product: Product) => {
    products[index] = product;
  },
  remove: (index: number) => products.splice(index, 1),
  findIndex: (predicate: (p: Product) => boolean) =>
    products.findIndex(predicate),
};
