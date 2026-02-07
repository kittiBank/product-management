// Product Routes
const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// GET /products - Get all products with pagination
router.get("/products", productController.getAllProducts);

// GET /product/:id - Get product by ID
router.get("/product/:id", productController.getProductById);

// POST /product - Create new product
router.post("/product", productController.createProduct);

// PUT /product/:id - Update product
router.put("/product/:id", productController.updateProduct);

// DELETE /product/:id - Delete product
router.delete("/product/:id", productController.deleteProduct);

module.exports = router;
