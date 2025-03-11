const productService = require("../services/productServices");
const Product = require("../models/productModel");
const MESSAGES = require("../utils/constants");

/**
 * Creates a new product, ensuring that images are provided. The product is saved
 * with the given details and image file paths.
 *
 * @async
 * @function createProduct
 * @param {Object} req - The request object containing the product details (name, description, price, category) and images.
 * @param {Object} res - The response object used to send the response.
 * @returns {Object} JSON object containing the success status and the created product.
 */
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    // Ensure images are uploaded
    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: MESSAGES.ERROR.IMAGE_REQUIRED });
    }

    // Extract file paths
    const imagePaths = req.files.map((file) => `/uploads/${file.filename}`);

    // Create a new product
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      images: imagePaths,
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      message: MESSAGES.SUCCESS.PRODUCT_CREATED,
      product: newProduct,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Updates the details of an existing product, including optional new images.
 * If new images are uploaded, they are appended to the existing ones.
 *
 * @async
 * @function updateProduct
 * @param {Object} req - The request object containing the product ID and updated details (name, description, price, category, and images).
 * @param {Object} res - The response object used to send the response.
 * @returns {Object} JSON object containing the success status and the updated product.
 */
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category } = req.body;

    let product = await Product.findById(id);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: MESSAGES.ERROR.PRODUCT_NOT_FOUND });

    // Update fields if provided
    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (category) product.category = category;

    // Handle new image uploads
    if (req.files && req.files.length > 0) {
      const newImagePaths = req.files.map(
        (file) => `/uploads/${file.filename}`
      );
      product.images = [...product.images, ...newImagePaths]; // Append new images
    }

    await product.save();

    res.status(200).json({
      success: true,
      message: MESSAGES.SUCCESS.PRODUCT_UPDATED,
      product,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Retrieves all products based on optional filters provided in the query string.
 *
 * @async
 * @function getAllProducts
 * @param {Object} req - The request object containing the query parameters for filtering and pagination.
 * @param {Object} res - The response object used to send the response.
 * @returns {Object} JSON object containing the success status and the list of products.
 */
exports.getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts(req.query);
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * Adds a review for a product, allowing users to submit their feedback and rating.
 *
 * @async
 * @function addReview
 * @param {Object} req - The request object containing the review details (rating, comment) and the product ID in the URL.
 * @param {Object} res - The response object used to send the response.
 * @returns {Object} JSON object containing the success status and the added review.
 */
exports.addReview = async (req, res) => {
  try {
    const review = await productService.addReview(req.params.id, req.body);
    res.status(201).json({ success: true, data: review });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
