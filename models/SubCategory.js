const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  name: {
    type: String,
    required: true,
  },
  categoryName: {
    type: String,
    required: true,
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

const SubCategory = new mongoose.model("subCategory", subCategorySchema);
module.exports = SubCategory;
