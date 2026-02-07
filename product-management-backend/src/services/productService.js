// Product Service Layer - Business Logic
const Product = require("../models/Product");

// Get all products with pagination and search
const getAllProducts = async (page, limit, search) => {
  // TODO: Implement pagination logic
  // TODO: Implement RegEx search logic
};

// Get product by ID
const getProductById = async (id) => {
  // TODO: Implement get product by ID logic
};

// Create new product
const createProduct = async (productData) => {
  // TODO: Implement create product logic
  // TODO: Validate categoryId exists
};

// Update product
const updateProduct = async (id, productData) => {
  // TODO: Implement update product logic
};

// Delete product (soft or hard delete)
const deleteProduct = async (id, softDelete = true) => {
  // TODO: Implement delete logic (soft/hard)
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
