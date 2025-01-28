const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
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

  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
