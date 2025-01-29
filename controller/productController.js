const ProductModel = require("../models/ProductModel");

const getProducts = async (req, res) => {
  try {
    const products = await ProductModel.find({ userId: req.user });
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
const getProductsById = async (req, res) => {
  try {
    const { id } = req.params;
    const products = await ProductModel.findById(id);

    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const addProduct = async (req, res) => {
  try {
    const { name, category, subCategory, status } = req.body;

    const image = req.file ? req.file.path : null;

    const newProduct = new ProductModel({
      name,
      category,
      subCategory,
      image,
      status,
      userId: req.user,
    });

    await newProduct.save();

    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Update a subcategory
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, subCategory, status } = req.body;

    const updateData = { name, category, subCategory, status };
    if (image) updateData.image = image;

    const image = req.file ? req.file.path : undefined;
    // Find subcategory and update
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true } // Return the updated document
    );

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, data: updatedProduct });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await ProductModel.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = {
  getProducts,
  getProductsById,
  addProduct,
  updateProduct,
  deleteProduct,
};
