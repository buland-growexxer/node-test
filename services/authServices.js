const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const MESSAGES = require("../utils/constants");

/**
 * Registers a new user.
 *
 * @param {string} name - The user's full name.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @throws {Error} If the email is already registered.
 * @returns {Promise<Object>} The newly registered user object.
 */
exports.registerUser = async (name, email, password) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error(MESSAGES.ERROR.EMAIL_ALREADY_REGISTERED);
  }

  // Hash password
  // const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    email,
    password,
  });

  await newUser.save();
  return newUser;
};

/**
 * Logs in a user and generates a JWT token.
 *
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @throws {Error} If the user is not found or the password is invalid.
 * @returns {Promise<Object>} An object containing the JWT token and user details.
 */
exports.loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error(MESSAGES.ERROR.USER_NOT_FOUND);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error(MESSAGES.ERROR.INVALID_PASSWORD);
  }

  // Generate JWT token
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  return { token, user };
};
