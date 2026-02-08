// Request Validation Middleware
const mongoose = require("mongoose");

// Validate Product Input
const validateProductInput = (req, res, next) => {
  const { name, price, categoryId } = req.body;
  const errors = [];

  // Validate name
  if (!name || typeof name !== "string" || name.trim().length === 0) {
    errors.push({
      field: "name",
      message: "Product name is required and must be a non-empty string",
    });
  } else if (name.trim().length > 200) {
    errors.push({
      field: "name",
      message: "Product name must not exceed 200 characters",
    });
  }

  // Validate price
  if (price === undefined || price === null) {
    errors.push({
      field: "price",
      message: "Price is required",
    });
  } else if (typeof price !== "number" || isNaN(price)) {
    errors.push({
      field: "price",
      message: "Price must be a valid number",
    });
  } else if (price < 0) {
    errors.push({
      field: "price",
      message: "Price must be a positive number",
    });
  }

  // Validate categoryId
  if (!categoryId) {
    errors.push({
      field: "categoryId",
      message: "Category ID is required",
    });
  } else if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    errors.push({
      field: "categoryId",
      message: "Invalid category ID format",
    });
  }

  // If there are validation errors, return 400
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors,
    });
  }

  next();
};

// Validate Product Update Input
const validateProductUpdate = (req, res, next) => {
  const { name, price, categoryId, description } = req.body;
  const errors = [];

  // At least one field must be provided
  if (
    !name &&
    price === undefined &&
    !categoryId &&
    description === undefined &&
    req.body.isActive === undefined
  ) {
    return res.status(400).json({
      success: false,
      message: "At least one field must be provided for update",
    });
  }

  // Validate name if provided
  if (name !== undefined) {
    if (typeof name !== "string" || name.trim().length === 0) {
      errors.push({
        field: "name",
        message: "Product name must be a non-empty string",
      });
    } else if (name.trim().length > 200) {
      errors.push({
        field: "name",
        message: "Product name must not exceed 200 characters",
      });
    }
  }

  // Validate price if provided
  if (price !== undefined) {
    if (typeof price !== "number" || isNaN(price)) {
      errors.push({
        field: "price",
        message: "Price must be a valid number",
      });
    } else if (price < 0) {
      errors.push({
        field: "price",
        message: "Price must be a positive number",
      });
    }
  }

  // Validate categoryId if provided
  if (categoryId !== undefined) {
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      errors.push({
        field: "categoryId",
        message: "Invalid category ID format",
      });
    }
  }

  // Validate description if provided
  if (description !== undefined && description !== null) {
    if (typeof description !== "string") {
      errors.push({
        field: "description",
        message: "Description must be a string",
      });
    } else if (description.length > 1000) {
      errors.push({
        field: "description",
        message: "Description must not exceed 1000 characters",
      });
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors,
    });
  }

  next();
};

// Validate Category Input
const validateCategoryInput = (req, res, next) => {
  const { name } = req.body;
  const errors = [];

  // Validate name
  if (!name || typeof name !== "string" || name.trim().length === 0) {
    errors.push({
      field: "name",
      message: "Category name is required and must be a non-empty string",
    });
  } else if (name.trim().length > 100) {
    errors.push({
      field: "name",
      message: "Category name must not exceed 100 characters",
    });
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors,
    });
  }

  next();
};

// Validate Category Update Input
const validateCategoryUpdate = (req, res, next) => {
  const { name, description } = req.body;
  const errors = [];

  // At least one field must be provided
  if (!name && description === undefined && req.body.isActive === undefined) {
    return res.status(400).json({
      success: false,
      message: "At least one field must be provided for update",
    });
  }

  // Validate name if provided
  if (name !== undefined) {
    if (typeof name !== "string" || name.trim().length === 0) {
      errors.push({
        field: "name",
        message: "Category name must be a non-empty string",
      });
    } else if (name.trim().length > 100) {
      errors.push({
        field: "name",
        message: "Category name must not exceed 100 characters",
      });
    }
  }

  // Validate description if provided
  if (description !== undefined && description !== null) {
    if (typeof description !== "string") {
      errors.push({
        field: "description",
        message: "Description must be a string",
      });
    } else if (description.length > 500) {
      errors.push({
        field: "description",
        message: "Description must not exceed 500 characters",
      });
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors,
    });
  }

  next();
};

// Validate MongoDB ObjectId
const validateObjectId = (req, res, next) => {
  const { id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid ID format",
    });
  }
  
  next();
};

// Validate Pagination Parameters
const validatePagination = (req, res, next) => {
  const { page, limit } = req.query;
  const errors = [];
  
  // Validate page if provided
  if (page !== undefined) {
    const pageNum = parseInt(page);
    if (isNaN(pageNum) || pageNum < 1) {
      errors.push({
        field: "page",
        message: "Page must be a positive integer",
      });
    }
  }
  
  // Validate limit if provided
  if (limit !== undefined) {
    const limitNum = parseInt(limit);
    if (isNaN(limitNum) || limitNum < 1 || limitNum > 100) {
      errors.push({
        field: "limit",
        message: "Limit must be an integer between 1 and 100",
      });
    }
  }
  
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors,
    });
  }
  
  next();
};

module.exports = {
  validateProductInput,
  validateProductUpdate,
  validateCategoryInput,
  validateCategoryUpdate,
  validateObjectId,
  validatePagination,
};
