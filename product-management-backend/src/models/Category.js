// Category Model Schema
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

// Indexes for search optimization
categorySchema.index({ name: "text", description: "text" });
categorySchema.index({ isDeleted: 1 });
categorySchema.index({ createdAt: -1 });

module.exports = mongoose.model("Category", categorySchema);
