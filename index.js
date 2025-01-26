const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./db"); // MongoDB connection
const authRoutes = require("./routes/auth"); // Authentication routes
const userRoutes = require("./routes/user"); // User profile routes

const app = express();

// Connect to MongoDB
connectDB();

// Middleware for parsing JSON
app.use(bodyParser.json());

// Routes
app.use("/auth", authRoutes); // Auth routes (login, register)
app.use("/user", userRoutes); // User routes (profile)

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Express Backend!");
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
