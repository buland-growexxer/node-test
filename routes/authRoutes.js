const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

/**
 * POST /register - Registers a new user.
 *
 * @route POST /register
 * @param {string} req.body.name - The user's full name.
 * @param {string} req.body.email - The user's email address.
 * @param {string} req.body.password - The user's password.
 * @returns {Object} 200 - The created user object.
 * @returns {Object} 400 - Error message for invalid input.
 */
router.post("/register", authController.register);

/**
 * POST /login - Logs in a user and returns a JWT token.
 *
 * @route POST /login
 * @param {string} req.body.email - The user's email address.
 * @param {string} req.body.password - The user's password.
 * @returns {Object} 200 - JWT token and user details.
 * @returns {Object} 400 - Error message for invalid credentials.
 */
router.post("/login", authController.login);

module.exports = router;
