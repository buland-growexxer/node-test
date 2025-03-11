const mongoose = require("mongoose");

/**
 * Order schema for managing customer orders in the system.
 * Stores customer information, the products ordered, and order status.
 *
 * @typedef {Object} Order
 * @property {string} customerName - Name of the customer placing the order.
 * @property {string} customerEmail - Email address of the customer.
 * @property {Array<Object>} products - List of products in the order, each with a reference to the Product model and the quantity ordered.
 * @property {number} totalPrice - Total price for all products in the order.
 * @property {string} status - The current status of the order (Pending, Shipped, Delivered).
 */
const orderSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: [true, "Customer name is required"],
    },
    customerEmail: {
      type: String,
      required: [true, "Customer email is required"],
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, "Quantity must be at least 1"],
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
      min: [0, "Total price must be a positive value"],
    },
    status: {
      type: String,
      enum: ["Pending", "Shipped", "Delivered"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
