// Global Error Handler Middleware
const errorHandler = (err, req, res, next) => {
  // Log error to console
  console.error('Error:', {
    message: err.message,
    timestamp: new Date().toISOString(),
    path: req.path,
    method: req.method,
  });

  // Use custom status code if provided, otherwise default to 500
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // Send error response
  res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = errorHandler;
