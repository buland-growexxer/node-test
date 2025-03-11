const Product = require("../models/productModel");
const Review = require("../models/reviewModel");

/**
 * Creates a new product in the system.
 *
 * @param {Object} data - The product data to create the product.
 * @returns {Promise<Object>} The created product object.
 */
exports.createProduct = async (data) => {
  return await Product.create(data);
};

/**
 * Updates the details of an existing product.
 *
 * @param {string} id - The ID of the product to update.
 * @param {Object} updateData - The updated product data.
 * @returns {Promise<Object>} The updated product object.
 */
exports.updateProduct = async (id, updateData) => {
  return await Product.findByIdAndUpdate(id, updateData, { new: true });
};

/**
 * Retrieves all products with filtering, sorting, and pagination.
 *
 * @param {Object} query - The query parameters for filtering, sorting, and pagination.
 * @param {string} [query.category] - The category to filter products by.
 * @param {number} [query.page=1] - The page number for pagination.
 * @param {number} [query.limit=10] - The number of products per page.
 * @param {string} [query.sort] - The sort order of products (e.g., "asc" or "desc").
 * @returns {Promise<Array<Object>>} A list of products.
 */
exports.getAllProducts = async (query) => {
  const { category, page = 1, limit = 10, sort } = query;
  const filter = category ? { category } : {};
  const sortOption = sort === "desc" ? { price: -1 } : { price: 1 };

  return await Product.find(filter)
    .sort(sortOption)
    .limit(limit)
    .skip((page - 1) * limit);
};

/**
 * Adds a review for a specific product.
 *
 * @param {string} productId - The ID of the product to add the review to.
 * @param {Object} reviewData - The review data (rating and optional comment).
 * @returns {Promise<Object>} The created review object.
 */
exports.addReview = async (productId, reviewData) => {
  const review = await Review.create({ productId, ...reviewData });

  // Update product's average rating
  const reviews = await Review.find({ productId });
  const avgRating =
    reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

  await Product.findByIdAndUpdate(productId, { averageRating: avgRating });

  return review;
};
