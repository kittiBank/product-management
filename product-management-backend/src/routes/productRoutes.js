// Product Routes
const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const {
  validateProductInput,
  validateProductUpdate,
  validateObjectId,
  validatePagination,
} = require("../middleware/validator");

// GET /products - Get all products with pagination
router.get("/products", validatePagination, productController.getAllProducts);

// GET /product/:id - Get product by ID
router.get("/product/:id", validateObjectId, productController.getProductById);

// POST /product - Create new product
router.post("/product", validateProductInput, productController.createProduct);

// PUT /product/:id - Update product
router.put("/product/:id", validateObjectId, validateProductUpdate, productController.updateProduct);

// DELETE /product/:id - Delete product
router.delete("/product/:id", validateObjectId, productController.deleteProduct);

module.exports = router;
