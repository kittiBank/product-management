// Utility Functions

// Response formatter
const successResponse = (data, message = "Success") => {
  return {
    success: true,
    message,
    data,
  };
};

const errorResponse = (message, statusCode = 500) => {
  return {
    success: false,
    message,
    statusCode,
  };
};

// Pagination helper
const getPaginationParams = (page = 1, limit = 10) => {
  // TODO: Implement pagination calculation
};

module.exports = {
  successResponse,
  errorResponse,
  getPaginationParams,
};
