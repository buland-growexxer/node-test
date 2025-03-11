const mongoose = require("mongoose");

/**
 * Product schema for managing products in the system.
 * Includes product details such as name, description, price, images, stock, and average rating.
 *
 * @typedef {Object} Product
 * @property {string} name - Name of the product.
 * @property {string} description - Description of the product.
 * @property {number} price - Price of the product.
 * @property {string} category - Category the product belongs to.
 * @property {Array<string>} images - List of image URLs for the product.
 * @property {number} averageRating - Average rating of the product (default 0).
 * @property {number} stock - Available stock for the product.
 */
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
