const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

/**
 * User schema for managing user details including name, email, and password.
 * Also includes a pre-save hook to hash the password before storing it.
 *
 * @typedef {Object} User
 * @property {string} name - Name of the user.
 * @property {string} email - Email address of the user.
 * @property {string} password - Password for user authentication (hashed before saving).
 */
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    maxlength: 100,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, "Invalid email format"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 6,
  },
});

/**
 * Pre-save hook to hash the user's password before saving to the database.
 *
 * @function
 * @param {Function} next - Callback function to pass control to the next middleware or save operation.
 */
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Create User model
const User = mongoose.model("User", userSchema);

module.exports = User;
