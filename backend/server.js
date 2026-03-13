require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

//razorpay integrated

const paymentRoutes = require("./routes/paymentRoutes");


// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/payment", paymentRoutes);

// Static folder for product images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Import Routes
const productRoutes = require("./routes/products");
const adminRoutes = require("./routes/admin");
const bookingRoutes = require("./routes/bookingRoutes");
app.use("/api/prebooking", prebookingRoutes);

// Use Routes
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
