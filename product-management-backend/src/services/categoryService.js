// Category Service Layer - Business Logic
const Category = require("../models/Category");

// Get all categories with pagination and search
const getAllCategories = async (page = 1, limit = 10, search = '') => {
  const skip = (page - 1) * limit;
  
  // Build query
  const query = { isDeleted: false };
  
  // Add search with RegEx if provided
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
  }
  
  // Get categories and total count
  const [categories, total] = await Promise.all([
    Category.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Category.countDocuments(query)
  ]);
  
  return {
    categories,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      itemsPerPage: limit
    }
  };
};

// Get category by ID
const getCategoryById = async (id) => {
  const category = await Category.findOne({ _id: id, isDeleted: false });
  
  if (!category) {
    const error = new Error('Category not found');
    error.statusCode = 404;
    throw error;
  }
  
  return category;
};

// Create new category
const createCategory = async (categoryData) => {
  const category = new Category(categoryData);
  await category.save();
  return category;
};

// Update category
const updateCategory = async (id, categoryData) => {
  const category = await Category.findOneAndUpdate(
    { _id: id, isDeleted: false },
    categoryData,
    { new: true, runValidators: true }
  );
  
  if (!category) {
    const error = new Error('Category not found');
    error.statusCode = 404;
    throw error;
  }
  
  return category;
};

// Delete category (soft or hard delete)
const deleteCategory = async (id, softDelete = true) => {
  if (softDelete) {
    // Soft delete - mark as deleted
    const category = await Category.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );
    
    if (!category) {
      const error = new Error('Category not found');
      error.statusCode = 404;
      throw error;
    }
    
    return category;
  } else {
    // Hard delete - remove from database
    const category = await Category.findOneAndDelete({ _id: id });
    
    if (!category) {
      const error = new Error('Category not found');
      error.statusCode = 404;
      throw error;
    }
    
    return category;
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
