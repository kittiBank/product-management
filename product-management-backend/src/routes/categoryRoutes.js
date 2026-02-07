// Category Routes
const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

// GET /categories - Get all categories with pagination
router.get("/categories", categoryController.getAllCategories);

// GET /category/:id - Get category by ID
router.get("/category/:id", categoryController.getCategoryById);

// POST /category - Create new category
router.post("/category", categoryController.createCategory);

// PUT /category/:id - Update category
router.put("/category/:id", categoryController.updateCategory);

// DELETE /category/:id - Delete category
router.delete("/category/:id", categoryController.deleteCategory);

module.exports = router;
