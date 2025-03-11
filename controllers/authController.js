const authService = require("../services/authServices");
const MESSAGES = require("../utils/constants");

/**
 * Registers a new user by receiving user details (name, email, and password),
 * passing them to the authService to register, and returning the created user
 * along with a success message.
 *
 * @async
 * @function register
 * @param {Object} req - The request object containing the user details.
 * @param {Object} res - The response object used to send the response.
 * @returns {Object} JSON object containing the success status, message, and user data.
 */
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await authService.registerUser(name, email, password);
    res
      .status(201)
      .json({ success: true, message: MESSAGES.SUCCESS.USER_REGISTERED, user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * Logs in a user by verifying the email and password, and generating a JWT token
 * upon successful authentication. The response includes the JWT token and user info.
 *
 * @async
 * @function login
 * @param {Object} req - The request object containing the user's email and password.
 * @param {Object} res - The response object used to send the response.
 * @returns {Object} JSON object containing the success status, message, JWT token, and user data.
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await authService.loginUser(email, password);
    res.status(200).json({
      success: true,
      message: MESSAGES.SUCCESS.LOGIN_SUCCESS,
      token,
      user,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
