// Category Controller - Handle HTTP requests
const categoryService = require("../services/categoryService");

// GET /categories - Get all categories with pagination
const getAllCategories = async (req, res, next) => {
  try {
    // TODO: Extract query params (page, limit, search)
    // TODO: Call categoryService.getAllCategories()
    // TODO: Return response

    return res.status(200).json({
      success: true,
      message: "getAllCategories working",
      data: [],
    });
  } catch (error) {
    next(error);
  }
};

// GET /category/:id - Get category by ID
const getCategoryById = async (req, res, next) => {
  try {
    // TODO: Extract id from params
    // TODO: Call categoryService.getCategoryById()
    // TODO: Return response

    const { id } = req.params;
    return res.status(200).json({
      success: true,
      message: "getCategoryById working",
      data: { id },
    });
  } catch (error) {
    next(error);
  }
};

// POST /category - Create new category
const createCategory = async (req, res, next) => {
  try {
    // TODO: Extract data from req.body
    // TODO: Validate input
    // TODO: Call categoryService.createCategory()
    // TODO: Return response

    return res.status(201).json({
      success: true,
      message: "createCategory working",
      data: req.body,
    });
  } catch (error) {
    next(error);
  }
};

// PUT /category/:id - Update category
const updateCategory = async (req, res, next) => {
  try {
    // TODO: Extract id from params and data from body
    // TODO: Validate input
    // TODO: Call categoryService.updateCategory()
    // TODO: Return response

    const { id } = req.params;
    return res.status(200).json({
      success: true,
      message: "updateCategory working",
      data: { id, ...req.body },
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /category/:id - Delete category
const deleteCategory = async (req, res, next) => {
  try {
    // TODO: Extract id from params
    // TODO: Determine soft/hard delete from query
    // TODO: Call categoryService.deleteCategory()
    // TODO: Return response

    const { id } = req.params;
    return res.status(200).json({
      success: true,
      message: "deleteCategory working",
      data: { id },
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
