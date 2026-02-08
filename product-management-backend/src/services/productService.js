// Product Service Layer - Business Logic
const Product = require("../models/Product");
const Category = require("../models/Category");

// Get all products with pagination and search
const getAllProducts = async (page = 1, limit = 10, search = '', categoryId = null) => {
  const skip = (page - 1) * limit;
  
  // Build query
  const query = { isDeleted: false };
  
  // Filter by category if provided
  if (categoryId) {
    query.categoryId = categoryId;
  }
  
  // Add search with RegEx if provided
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
  }
  
  // Get products and total count
  const [products, total] = await Promise.all([
    Product.find(query)
      .populate('categoryId', 'name description')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Product.countDocuments(query)
  ]);
  
  return {
    products,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      itemsPerPage: limit
    }
  };
};

// Get product by ID
const getProductById = async (id) => {
  const product = await Product.findOne({ _id: id, isDeleted: false })
    .populate('categoryId', 'name description');
  
  if (!product) {
    const error = new Error('Product not found');
    error.statusCode = 404;
    throw error;
  }
  
  return product;
};

// Create new product
const createProduct = async (productData) => {
  // Validate categoryId exists
  const category = await Category.findOne({ _id: productData.categoryId, isDeleted: false });
  if (!category) {
    const error = new Error('Category not found');
    error.statusCode = 404;
    throw error;
  }
  
  const product = new Product(productData);
  await product.save();
  
  // Populate category info
  await product.populate('categoryId', 'name description');
  
  return product;
};

// Update product
const updateProduct = async (id, productData) => {
  // Validate categoryId if being updated
  if (productData.categoryId) {
    const category = await Category.findOne({ _id: productData.categoryId, isDeleted: false });
    if (!category) {
      const error = new Error('Category not found');
      error.statusCode = 404;
      throw error;
    }
  }
  
  const product = await Product.findOneAndUpdate(
    { _id: id, isDeleted: false },
    productData,
    { new: true, runValidators: true }
  ).populate('categoryId', 'name description');
  
  if (!product) {
    const error = new Error('Product not found');
    error.statusCode = 404;
    throw error;
  }
  
  return product;
};

// Delete product (soft or hard delete)
const deleteProduct = async (id, softDelete = true) => {
  if (softDelete) {
    // Soft delete - mark as deleted
    const product = await Product.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { isDeleted: true },
      { new: true }
    ).populate('categoryId', 'name description');
    
    if (!product) {
      const error = new Error('Product not found');
      error.statusCode = 404;
      throw error;
    }
    
    return product;
  } else {
    // Hard delete - remove from database
    const product = await Product.findOneAndDelete({ _id: id })
      .populate('categoryId', 'name description');
    
    if (!product) {
      const error = new Error('Product not found');
      error.statusCode = 404;
      throw error;
    }
    
    return product;
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
