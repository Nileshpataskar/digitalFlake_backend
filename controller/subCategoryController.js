const SubCategory = require("../models/SubCategory");

// Get all subcategories
const getSubCategory = async (req, res) => {
  try {
    const subCategories = await SubCategory.find({ userId: req.user });
    res.status(200).json({ success: true, data: subCategories });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getSubcategoryById = async (req, res) => {
  try {
    const { id } = req.params; // Extract id from params

    // Find the category by id
    const subCategories = await SubCategory.findById(id);

    if (!subCategories) {
      return res
        .status(404)
        .json({ success: false, error: "SubCategory not found" });
    }

    res.status(200).json({ success: true, data: subCategories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Add a new subcategory
const addSubCategory = async (req, res) => {
  try {
    const { name, categoryName, status } = req.body;

    const image = req.file ? req.file.path : null;
    // Validate required fields
    if (!name || !categoryName) {
      return res.status(400).json({
        success: false,
        message: "Name and categoryName are required",
      });
    }

    const newSubCategory = new SubCategory({
      name,
      categoryName,
      image,
      status,
      userId: req.user, // Optional, defaults to "active"
    });

    await newSubCategory.save();
    res.status(201).json({ success: true, data: newSubCategory });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Update a subcategory
const updateSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, categoryName, status } = req.body;
    const image = req.file ? req.file.path : undefined;

    const updateData = { name, categoryName, status };

    if (image) updateData.image = image;
    // Find subcategory and update
    const updatedSubCategory = await SubCategory.findByIdAndUpdate(
      id,
      updateData,
      { new: true } // Return the updated document
    );

    if (!updatedSubCategory) {
      return res
        .status(404)
        .json({ success: false, message: "SubCategory not found" });
    }

    res.status(200).json({ success: true, data: updatedSubCategory });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Delete a subcategory
const deleteSubCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedSubCategory = await SubCategory.findByIdAndDelete(id);

    if (!deletedSubCategory) {
      return res
        .status(404)
        .json({ success: false, message: "SubCategory not found" });
    }

    res.status(200).json({
      success: true,
      message: "SubCategory deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = {
  getSubCategory,
  addSubCategory,
  updateSubCategory,
  getSubcategoryById,
  deleteSubCategory,
};
