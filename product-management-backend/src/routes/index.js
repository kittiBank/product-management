// Main Routes Index
const express = require("express");
const router = express.Router();

const productRoutes = require("./productRoutes");
const categoryRoutes = require("./categoryRoutes");

// API Routes
router.use("/", productRoutes);
router.use("/", categoryRoutes);

// Health check endpoint
router.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running" });
});

module.exports = router;
