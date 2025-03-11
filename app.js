/**
 * @fileoverview Product and Order Management Backend API | NodeJS Training Test
 * @description This is a Node.js-based backend API for an e-commerce usecase. It provides features such as authentication,
 * product management, order processing, and review handling. The API follows the MVC architecture with structured routing
 * and middleware for security, validation, and error handling.
 *
 * @version 1.0.0
 * @author buland
 * @mentors Rahul Sir, Hiten Sir and Dhruv Sir
 *
 * @requires express
 * @requires dotenv
 * @requires cors
 * @requires morgan
 * @requires path
 * @requires mongoose
 *
 * @project E-Commerce API
 * @architecture MVC (Model-View-Controller)
 * @database MongoDB
 *
 * @features
 * - User Authentication (JWT-based login & registration)
 * - Product Management (CRUD operations, Image Uploads)
 * - Order Management (Placement, Updates, Status Tracking)
 * - Review & Rating System
 * - Secure Routes with Middleware
 * - Error Handling & Logging
 *
 * @usage
 * 1. Clone the repository: `git clone https://github.com/yourusername/your-repo.git`
 * 2. Install dependencies: `npm install`
 * 3. Create a `.env` file and configure environment variables
 * 4. Start the server: `npm start`
 * 5. API is accessible at `http://localhost:5000`
 */

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const connectDB = require("./config/db");

// Import Routes
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const authRoutes = require("./routes/authRoutes");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(morgan("dev")); // Log HTTP requests

// Serve static files from the uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API Routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Server Error" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
