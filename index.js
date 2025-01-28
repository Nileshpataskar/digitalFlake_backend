const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./db"); // MongoDB connection
const authRoutes = require("./routes/auth"); // Authentication routes
const userRoutes = require("./routes/user"); // User profile routes
const cors = require("cors");
const {
  getCategories,
  addCategories,
  updateCategory,
  deleteCategory,
  getCategoryById,
} = require("./controller/categoryController");
const {
  getSubCategory,
  addSubCategory,
  updateSubCategory,
  deleteSubCategory,
} = require("./controller/subCategoryController");
const {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("./controller/productController");
const { verifyToken } = require("./middleware/auth");
const upload = require("./middleware/upload");

const app = express();

const corsOptions = {
  origin: "*", // Allow all origins
  methods: "*",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));

// Connect to MongoDB
connectDB();

app.use(bodyParser.json());

// Routes
app.use("/auth", authRoutes); // Auth routes (login, register)
app.use("/user", userRoutes); // User routes (profile)

app.use("/uploads", express.static("uploads"));

// Category routes (protected)
app.get("/category", verifyToken, getCategories);
app.get("/category/:id", verifyToken, getCategoryById);

app.post("/category", verifyToken, upload.single("image"), addCategories);
app.patch("/category/:id", verifyToken, upload.single("image"), updateCategory);
app.delete("/category/:id", verifyToken, deleteCategory);

// Subcategory routes (protected)
app.get("/subcategory", verifyToken, getSubCategory);
app.post("/subcategory", verifyToken, addSubCategory);
app.patch("/subcategory/:id", verifyToken, updateSubCategory);
app.delete("/subcategory/:id", verifyToken, deleteSubCategory);

// Product routes (protected)
app.get("/product", verifyToken, getProducts);
app.post("/product", verifyToken, addProduct);
app.patch("/product/:id", verifyToken, updateProduct);
app.delete("/product/:id", verifyToken, deleteProduct);

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Express Backend!");
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
