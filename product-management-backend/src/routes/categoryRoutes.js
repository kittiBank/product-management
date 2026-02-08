// Category Routes
const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const {
  validateCategoryInput,
  validateCategoryUpdate,
  validateObjectId,
  validatePagination,
} = require("../middleware/validator");

// GET /categories - Get all categories with pagination
router.get("/categories", validatePagination, categoryController.getAllCategories);

// GET /category/:id - Get category by ID
router.get("/category/:id", validateObjectId, categoryController.getCategoryById);

// POST /category - Create new category
router.post("/category", validateCategoryInput, categoryController.createCategory);

// PUT /category/:id - Update category
router.put("/category/:id", validateObjectId, validateCategoryUpdate, categoryController.updateCategory);

// DELETE /category/:id - Delete category
router.delete("/category/:id", validateObjectId, categoryController.deleteCategory);

module.exports = router;
