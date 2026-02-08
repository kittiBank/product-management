// Product Controller - Handle HTTP requests
const productService = require("../services/productService");

// GET /products - Get all products with pagination
const getAllProducts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const categoryId = req.query.categoryId || null;
    
    const result = await productService.getAllProducts(page, limit, search, categoryId);
    
    return res.status(200).json({
      success: true,
      message: "Products retrieved successfully",
      data: result.products,
      pagination: result.pagination
    });
  } catch (error) {
    next(error);
  }
};

// GET /product/:id - Get product by ID
const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productService.getProductById(id);
    
    return res.status(200).json({
      success: true,
      message: "Product retrieved successfully",
      data: product
    });
  } catch (error) {
    next(error);
  }
};

// POST /product - Create new product
const createProduct = async (req, res, next) => {
  try {
    const productData = req.body;
    const product = await productService.createProduct(productData);
    
    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product
    });
  } catch (error) {
    next(error);
  }
};

// PUT /product/:id - Update product
const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const productData = req.body;
    const product = await productService.updateProduct(id, productData);
    
    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /product/:id - Delete product
const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const softDelete = req.query.soft !== 'false'; // Default to soft delete
    const product = await productService.deleteProduct(id, softDelete);
    
    return res.status(200).json({
      success: true,
      message: `Product ${softDelete ? 'soft' : 'hard'} deleted successfully`,
      data: product
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
