require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Static folder for product images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Import Routes
const prebookingRoutes = require("./routes/prebooking");
const productRoutes = require("./routes/products");
const adminRoutes = require("./routes/admin");

// Use Routes
app.use("/api/prebooking", prebookingRoutes);
app.use("/api/products", productRoutes);
app.use("/api/admin", adminRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("🚀 Backend Server Running");
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
