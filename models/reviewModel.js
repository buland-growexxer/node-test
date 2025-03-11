const mongoose = require("mongoose");

/**
 * Review schema for storing product reviews, including the rating and optional comment.
 * Each review is linked to a specific product.
 *
 * @typedef {Object} Review
 * @property {ObjectId} productId - The product that the review is associated with (references the Product model).
 * @property {number} rating - Rating given to the product (between 1 and 5).
 * @property {string} comment - Optional text comment provided by the reviewer.
 */
const reviewSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
