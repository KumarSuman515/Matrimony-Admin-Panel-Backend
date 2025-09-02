const express = require("express");
const router = express.Router();
const classifiedController = require("../controllers/classifiedController");
const upload = require("../middlewares/uploadMiddleware");
const {
  validateClassified,
  validateClassifiedUpdate,
} = require("../middlewares/classifiedValidation");

// Create a new classified listing
router.post(
  "/",
  upload.array("photos", 5), // allow up to 5 photos
  validateClassified,
  classifiedController.createClassifiedListing
);

// Get all classified listings
router.get("/", classifiedController.getAllClassifiedListings);

// Get a single classified listing by ID
router.get("/:id", classifiedController.getClassifiedListingById);

// Update a classified listing
router.put(
  "/:id",
  upload.array("photos", 5),
  validateClassifiedUpdate,
  classifiedController.updateClassifiedListing
);

// Delete a classified listing
router.delete("/:id", classifiedController.deleteClassifiedListing);

module.exports = router;
