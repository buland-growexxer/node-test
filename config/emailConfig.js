/**
 * Configures the email transport using nodemailer, specifically with Gmail's SMTP service.
 * This configuration is used to send emails from the application using a Gmail account
 * that is stored in the environment variables.
 *
 * @constant
 * @type {Object}
 */

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Failed to send email:", error);
  }
};

module.exports = sendEmail;
