// Category Service Layer - Business Logic
const Category = require("../models/Category");

// Get all categories with pagination and search
const getAllCategories = async (page, limit, search) => {
  // TODO: Implement pagination logic
  // TODO: Implement RegEx search logic
};

// Get category by ID
const getCategoryById = async (id) => {
  // TODO: Implement get category by ID logic
};

// Create new category
const createCategory = async (categoryData) => {
  // TODO: Implement create category logic
};

// Update category
const updateCategory = async (id, categoryData) => {
  // TODO: Implement update category logic
};

// Delete category (soft or hard delete)
const deleteCategory = async (id, softDelete = true) => {
  // TODO: Implement delete logic (soft/hard)
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
