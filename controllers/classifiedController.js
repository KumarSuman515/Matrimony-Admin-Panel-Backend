const ClassifiedListing = require("../models/classifiedModel");

// Create a new classified listing
exports.createClassifiedListing = async (req, res) => {
  try {
    const {
      person_name,
      firm_name,
      firm_address,
      phone,
      email,
      website,
      business_category,
      photos,
    } = req.body;

    // Check if listing already exists by phone or email
    const existingListing = await ClassifiedListing.findOne({
      where: { phone, email },
    });
    if (existingListing) {
      return res
        .status(400)
        .json({ error: "Classified listing already exists" });
    }

    // If file(s) uploaded, convert them into comma-separated string
    if (req.files && req.files.length > 0) {
      req.body.photos = req.files.map((file) => file.path).join(",");
    }

    const listing = await ClassifiedListing.create(req.body);
    res.status(201).json({
      message: "Classified listing created successfully",
      listing,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to create classified listing",
      details: error.message,
    });
  }
};

// Get all classified listings
exports.getAllClassifiedListings = async (req, res) => {
  try {
    const listings = await ClassifiedListing.findAll();
    res.status(200).json(listings);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch classified listings",
      details: error.message,
    });
  }
};

// Get a single classified listing by ID
exports.getClassifiedListingById = async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await ClassifiedListing.findByPk(id);

    if (!listing) {
      return res.status(404).json({ error: "Classified listing not found" });
    }

    res.status(200).json(listing);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch classified listing",
      details: error.message,
    });
  }
};

// Update a classified listing by ID
exports.updateClassifiedListing = async (req, res) => {
  try {
    const { id } = req.params;

    const listing = await ClassifiedListing.findByPk(id);
    if (!listing) {
      return res.status(404).json({ error: "Classified listing not found" });
    }

    if (req.files && req.files.length > 0) {
      req.body.photos = req.files.map((file) => file.path).join(",");
    }

    await listing.update(req.body);

    res.status(200).json({
      message: "Classified listing updated successfully",
      listing,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to update classified listing",
      details: error.message,
    });
  }
};

// Delete a classified listing by ID
exports.deleteClassifiedListing = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await ClassifiedListing.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ error: "Classified listing not found" });
    }

    res
      .status(200)
      .json({ message: "Classified listing deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to delete classified listing",
      details: error.message,
    });
  }
};
