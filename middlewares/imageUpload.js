const multer = require("multer");

const storage = multer.diskStorage({
  /**
   * Defines the destination folder for image uploads.
   *
   * @callback
   * @param {Object} req - The request object.
   * @param {Object} file - The file object containing file details.
   * @param {Function} cb - The callback function to specify the upload destination.
   */
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  /**
   * Defines the file naming convention for uploaded images, including a timestamp to avoid name conflicts.
   *
   * @callback
   * @param {Object} req - The request object.
   * @param {Object} file - The file object containing file details.
   * @param {Function} cb - The callback function to specify the file name.
   */
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

/**
 * Filters incoming files to allow only images, rejecting any non-image files.
 *
 * @callback
 * @param {Object} req - The request object containing file details.
 * @param {Object} file - The file object containing file details.
 * @param {Function} cb - The callback function to accept or reject the file.
 * @returns {void}
 */
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

/**
 * Configures multer to handle file uploads with the specified storage settings
 * and file type filter.
 *
 * @const
 * @type {Object} upload
 */
const upload = multer({ storage, fileFilter });

module.exports = upload;
