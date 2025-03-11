const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const upload = require("../middlewares/imageUpload");

/**
 * POST /products - Creates a new product with multiple image uploads.
 *
 * @route POST /products
 * @param {Array} req.files - The images to be uploaded for the product.
 * @param {Object} req.body - The product data (name, price, etc.).
 * @returns {Object} 200 - The created product object.
 * @returns {Object} 400 - Error message for invalid product data.
 */
router.post("/", upload.array("images", 5), productController.createProduct);

/**
 * PATCH /products/:id - Updates an existing product, including image uploads.
 *
 * @route PATCH /products/:id
 * @param {string} req.params.id - The ID of the product to update.
 * @param {Array} req.files - The new images to upload for the product.
 * @param {Object} req.body - The updated product data (name, price, etc.).
 * @returns {Object} 200 - The updated product object.
 * @returns {Object} 404 - Error message if the product is not found.
 */
router.patch(
  "/:id",
  upload.array("images", 5),
  productController.updateProduct
);

/**
 * GET /products - Retrieves all products with optional filtering, sorting, and pagination.
 *
 * @route GET /products
 * @param {string} req.query.category - The category to filter products by.
 * @param {number} req.query.page - The page number for pagination.
 * @param {number} req.query.limit - The number of products per page.
 * @param {string} req.query.sort - Sorting option (e.g., "asc" or "desc").
 * @returns {Array<Object>} 200 - A list of products.
 */
router.get("/", productController.getAllProducts);

/**
 * POST /products/:id/reviews - Adds a review for a specific product.
 *
 * @route POST /products/:id/reviews
 * @param {string} req.params.id - The product ID to add the review to.
 * @param {Object} req.body - The review data (rating and optional comment).
 * @returns {Object} 200 - The created review object.
 * @returns {Object} 400 - Error message if the rating is invalid.
 */
router.post("/:id/reviews", productController.addReview);

module.exports = router;
