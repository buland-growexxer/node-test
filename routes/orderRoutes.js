const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authenticateUser = require("../middlewares/authMiddleware");

/**
 * POST /orders - Places a new order for the authenticated user.
 *
 * @route POST /orders
 * @param {string} req.body.customerName - The customer's name.
 * @param {string} req.body.customerEmail - The customer's email.
 * @param {Array<Object>} req.body.products - List of products with their quantities.
 * @returns {Object} 200 - The created order object.
 * @returns {Object} 400 - Error message for insufficient stock or invalid data.
 */
router.post("/", authenticateUser, orderController.placeOrder);

/**
 * PATCH /orders/:id - Updates the status of an existing order.
 *
 * @route PATCH /orders/:id
 * @param {string} req.params.id - The ID of the order to update.
 * @param {string} req.body.status - The new order status (e.g., "Shipped").
 * @returns {Object} 200 - The updated order object.
 * @returns {Object} 404 - Error message if the order is not found.
 */
router.patch("/:id", authenticateUser, orderController.updateOrderStatus);

/**
 * GET /orders/:id - Retrieves the details of a specific order.
 *
 * @route GET /orders/:id
 * @param {string} req.params.id - The ID of the order to retrieve.
 * @returns {Object} 200 - The order details.
 * @returns {Object} 404 - Error message if the order is not found.
 */
router.get("/:id", authenticateUser, orderController.getOrderDetails);

/**
 * GET /orders - Lists all orders with optional filtering and pagination.
 *
 * @route GET /orders
 * @param {string} req.query.status - The order status to filter by (e.g., "Shipped").
 * @param {number} req.query.page - The page number for pagination.
 * @param {number} req.query.limit - The number of orders per page.
 * @returns {Array<Object>} 200 - A list of orders.
 */
router.get("/", authenticateUser, orderController.listOrders);

module.exports = router;
