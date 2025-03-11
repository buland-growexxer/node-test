const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const sendEmail = require("../config/emailConfig");
const MESSAGES = require("../utils/constants");

/**
 * Places a new order for the customer.
 *
 * @param {string} customerName - The name of the customer placing the order.
 * @param {string} customerEmail - The email address of the customer.
 * @param {Array<Object>} productList - A list of products with their quantities to be ordered.
 * @throws {Error} If a product is not found or if there is insufficient stock.
 * @returns {Promise<Object>} The created order object.
 */
exports.placeOrder = async (customerName, customerEmail, productList) => {
  let totalPrice = 0;

  const orderProducts = await Promise.all(
    productList.map(async ({ productId, quantity }) => {
      const product = await Product.findById(productId);
      if (!product)
        throw new Error(`${MESSAGES.ERROR.PRODUCT_NOT_FOUND} ${productId}`);
      if (product.stock < quantity)
        throw new Error(`${MESSAGES.ERROR.INSUFFICIENT_STOCK} ${product.name}`);

      product.stock -= quantity;
      await product.save();
      totalPrice += product.price * quantity;

      return { product: productId, quantity };
    })
  );

  const order = await Order.create({
    customerName,
    customerEmail,
    products: orderProducts,
    totalPrice,
  });

  await sendEmail(
    customerEmail,
    "Order Confirmation",
    `Thank you for your order! Your order ID is ${order._id}.`
  );

  return order;
};

/**
 * Updates the status of an existing order.
 *
 * @param {string} orderId - The ID of the order to update.
 * @param {string} status - The new status of the order (e.g., Pending, Shipped, Delivered).
 * @throws {Error} If the order is not found.
 * @returns {Promise<Object>} The updated order object.
 */
exports.updateOrderStatus = async (orderId, status) => {
  const order = await Order.findById(orderId);
  if (!order) throw new Error(MESSAGES.ERROR.ORDER_NOT_FOUND);

  order.status = status;
  await order.save();
  return order;
};

/**
 * Retrieves the details of a specific order.
 *
 * @param {string} orderId - The ID of the order to retrieve.
 * @throws {Error} If the order is not found.
 * @returns {Promise<Object>} The order details.
 */
exports.getOrderDetails = async (orderId) => {
  const order = await Order.findById(orderId).populate("products.product");
  if (!order) throw new Error(MESSAGES.ERROR.ORDER_NOT_FOUND);

  return order;
};

/**
 * Lists orders with filters and pagination.
 *
 * @param {string} [status] - The status to filter orders by (e.g., Pending, Shipped).
 * @param {number} [page=1] - The page number for pagination.
 * @param {number} [limit=10] - The number of orders per page.
 * @returns {Promise<Array<Object>>} A list of orders.
 */
exports.listOrders = async (status, page = 1, limit = 10) => {
  const query = status ? { status } : {};

  const orders = await Order.find(query)
    .populate("products.product")
    .skip((page - 1) * limit)
    .limit(limit);

  return orders;
};
