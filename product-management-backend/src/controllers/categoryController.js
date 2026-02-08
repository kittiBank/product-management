// Category Controller - Handle HTTP requests
const categoryService = require("../services/categoryService");

// GET /categories - Get all categories with pagination
const getAllCategories = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    
    const result = await categoryService.getAllCategories(page, limit, search);
    
    return res.status(200).json({
      success: true,
      message: "Categories retrieved successfully",
      data: result.categories,
      pagination: result.pagination
    });
  } catch (error) {
    next(error);
  }
};

// GET /category/:id - Get category by ID
const getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await categoryService.getCategoryById(id);
    
    return res.status(200).json({
      success: true,
      message: "Category retrieved successfully",
      data: category
    });
  } catch (error) {
    next(error);
  }
};

// POST /category - Create new category
const createCategory = async (req, res, next) => {
  try {
    const categoryData = req.body;
    const category = await categoryService.createCategory(categoryData);
    
    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: category
    });
  } catch (error) {
    next(error);
  }
};

// PUT /category/:id - Update category
const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const categoryData = req.body;
    const category = await categoryService.updateCategory(id, categoryData);
    
    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: category
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /category/:id - Delete category
const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const softDelete = req.query.soft !== 'false'; // Default to soft delete
    const category = await categoryService.deleteCategory(id, softDelete);
    
    return res.status(200).json({
      success: true,
      message: `Category ${softDelete ? 'soft' : 'hard'} deleted successfully`,
      data: category
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
