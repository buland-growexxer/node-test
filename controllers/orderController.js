const orderServices = require("../services/orderServices");

/**
 * Places a new order by receiving the customer's name, email, and product details,
 * passing them to the orderServices to create the order, and returning the created order.
 *
 * @async
 * @function placeOrder
 * @param {Object} req - The request object containing order details (customerName, customerEmail, products).
 * @param {Object} res - The response object used to send the response.
 * @returns {Object} JSON object containing the success status and the created order.
 */
exports.placeOrder = async (req, res) => {
  try {
    const { customerName, customerEmail, products } = req.body;
    const order = await orderServices.placeOrder(
      customerName,
      customerEmail,
      products
    );
    res.status(201).json({ success: true, order });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * Updates the status of an existing order by receiving the new status and order ID,
 * passing the data to orderServices, and returning the updated order.
 *
 * @async
 * @function updateOrderStatus
 * @param {Object} req - The request object containing the order ID and new status.
 * @param {Object} res - The response object used to send the response.
 * @returns {Object} JSON object containing the success status and updated order.
 */
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await orderServices.updateOrderStatus(req.params.id, status);
    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * Retrieves the details of a specific order by the given order ID.
 *
 * @async
 * @function getOrderDetails
 * @param {Object} req - The request object containing the order ID in the URL params.
 * @param {Object} res - The response object used to send the response.
 * @returns {Object} JSON object containing the success status and order details.
 */
exports.getOrderDetails = async (req, res) => {
  try {
    const order = await orderServices.getOrderDetails(req.params.id);
    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

/**
 * Lists all orders with optional filters for status, pagination for page and limit.
 *
 * @async
 * @function listOrders
 * @param {Object} req - The request object containing optional filters (status, page, limit).
 * @param {Object} res - The response object used to send the response.
 * @returns {Object} JSON object containing the success status and an array of orders.
 */
exports.listOrders = async (req, res) => {
  try {
    const { status, page, limit } = req.query;
    const orders = await orderServices.listOrders(
      status,
      parseInt(page),
      parseInt(limit)
    );
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
