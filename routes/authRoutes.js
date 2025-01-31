const express = require("express");
const { body } = require("express-validator");
const { signup, login } = require("../controllers/authController");

const router = express.Router();

// Signup Route
router.post(
  "/signup",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    body("role")
      .isIn(["participant", "admin"])
      .withMessage("Role must be either 'participant' or 'admin'"),
  ],
  signup
);

// Login Route
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  login
);

module.exports = router;
