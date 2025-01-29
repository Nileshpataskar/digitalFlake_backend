const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  id: {
    type: Number,
  },
  name: {
    type: String,
    required: true, // Correct usage
  },
  category: {
    type: String,
  },
  subCategory: {
    type: String,
  },
  image: {
    type: String,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming User is the name of your User model
  },
});

const ProductModel = mongoose.model("Products", productSchema);
module.exports = ProductModel;
