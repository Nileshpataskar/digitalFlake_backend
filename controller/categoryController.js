const Category = require("../models/Category");

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ userId: req.user.id });
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const addCategories = async (req, res) => {
  try {
    const { name, description, image } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ success: false, error: "Name is required" });
    }
    const newCategory = new Category({
      name,
      description,
      image,
      userId: req.user,
    });
    await newCategory.save();
    res.status(201).json({ success: true, data: newCategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, image, status } = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name, description, image, status },
      { new: true }
    );

    if (!updatedCategory) {
      return res
        .status(404)
        .json({ success: false, error: "Category not found" });
    }

    res.status(200).json({ success: true, data: updatedCategory });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res
        .status(404)
        .json({ success: false, error: "Category not found" });
    }

    res
      .status(200)
      .json({ success: true, data: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

module.exports = {
  getCategories,
  addCategories,
  updateCategory,
  deleteCategory,
};
