const jwt = require("jsonwebtoken");
const MESSAGES = require("../utils/constants");

/**
 * Middleware to authenticate users via JWT. It checks the Authorization header
 * for the token, verifies its validity, and attaches the decoded user data to
 * the request object for further processing by subsequent middleware or controllers.
 *
 * @middleware
 * @function authenticateUser
 * @param {Object} req - The request object containing the Authorization header with the token.
 * @param {Object} res - The response object used to send the response if authentication fails.
 * @param {Function} next - The callback function to pass control to the next middleware or controller.
 * @returns {Object} JSON object containing success or failure status along with appropriate message.
 */
const authenticateUser = (req, res, next) => {
  // Extract token from Authorization header
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: MESSAGES.ERROR.NO_TOKEN });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user details to the request object
    next(); // Proceed to next middleware/controller
  } catch (error) {
    res
      .status(403)
      .json({ success: false, message: MESSAGES.ERROR.INVALID_TOKEN });
  }
};

module.exports = authenticateUser;
