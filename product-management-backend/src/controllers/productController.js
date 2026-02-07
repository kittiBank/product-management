// Product Controller - Handle HTTP requests
const productService = require("../services/productService");

// GET /products - Get all products with pagination
const getAllProducts = async (req, res, next) => {
  try {
    // TODO: Extract query params (page, limit, search)
    // TODO: Call productService.getAllProducts()
    // TODO: Return response

    return res.status(200).json({
      success: true,
      message: "getAllProducts working",
      data: [],
    });
  } catch (error) {
    next(error);
  }
};

// GET /product/:id - Get product by ID
const getProductById = async (req, res, next) => {
  try {
    // TODO: Extract id from params
    // TODO: Call productService.getProductById()
    // TODO: Return response

    const { id } = req.params;
    return res.status(200).json({
      success: true,
      message: "getProductById working",
      data: { id },
    });
  } catch (error) {
    next(error);
  }
};

// POST /product - Create new product
const createProduct = async (req, res, next) => {
  try {
    // TODO: Extract data from req.body
    // TODO: Validate input
    // TODO: Call productService.createProduct()
    // TODO: Return response

    return res.status(201).json({
      success: true,
      message: "createProduct working",
      data: req.body,
    });
  } catch (error) {
    next(error);
  }
};

// PUT /product/:id - Update product
const updateProduct = async (req, res, next) => {
  try {
    // TODO: Extract id from params and data from body
    // TODO: Validate input
    // TODO: Call productService.updateProduct()
    // TODO: Return response

    const { id } = req.params;
    return res.status(200).json({
      success: true,
      message: "updateProduct working",
      data: { id, ...req.body },
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /product/:id - Delete product
const deleteProduct = async (req, res, next) => {
  try {
    // TODO: Extract id from params
    // TODO: Determine soft/hard delete from query
    // TODO: Call productService.deleteProduct()
    // TODO: Return response

    const { id } = req.params;
    return res.status(200).json({
      success: true,
      message: "deleteProduct working",
      data: { id },
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
