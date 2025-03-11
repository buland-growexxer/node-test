/**
 * Connect to the MongoDB database using the connection string from environment variables.
 * The connection is established using Mongoose, with the necessary configurations
 * for the MongoDB connection to work properly.
 *
 * @async
 * @function connectDB
 * @throws {Error} If the connection to MongoDB fails, the process will exit with a non-zero status code.
 */

const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.ATLAS_MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
