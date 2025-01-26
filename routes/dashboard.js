const express = require("express");
const isAuthenticated = require("../middleware/isAuthenticated");
const router = express.Router();

router.get("/", isAuthenticated, (req, res) => {
  res.send(`Welcome, ${req.session.user.username}! This is your dashboard.`);
});

module.exports = router;
