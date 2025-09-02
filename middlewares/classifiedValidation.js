const { body, validationResult } = require("express-validator");

// Validation for creating a classified listing (all required fields)
exports.validateClassified = [
  // Basic Info
  body("person_name").notEmpty().withMessage("Person name is required"),
  body("firm_name").notEmpty().withMessage("Firm name is required"),
  body("firm_address").notEmpty().withMessage("Firm address is required"),

  // Contact Info
  body("phone").notEmpty().withMessage("Phone is required"),
  body("email").isEmail().withMessage("Valid email is required"),

  // Optional Website
  body("website").optional().isURL().withMessage("Website must be a valid URL"),

  // Business Info
  body("business_category")
    .notEmpty()
    .withMessage("Business category is required"),

  // Photos (optional, but validate if present)
  body("photos")
    .optional()
    .isString()
    .withMessage("Photos must be a comma-separated string"),

  // Validation result handler
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Validation for updating a classified listing (all fields optional)
exports.validateClassifiedUpdate = [
  body("person_name")
    .optional()
    .notEmpty()
    .withMessage("Person name cannot be empty"),
  body("firm_name")
    .optional()
    .notEmpty()
    .withMessage("Firm name cannot be empty"),
  body("firm_address")
    .optional()
    .notEmpty()
    .withMessage("Firm address cannot be empty"),
  body("phone").optional().notEmpty().withMessage("Phone cannot be empty"),
  body("email").optional().isEmail().withMessage("Must be a valid email"),
  body("website").optional().isURL().withMessage("Website must be a valid URL"),
  body("business_category")
    .optional()
    .notEmpty()
    .withMessage("Business category cannot be empty"),
  body("photos")
    .optional()
    .isString()
    .withMessage("Photos must be a comma-separated string"),

  // Validation result handler
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
