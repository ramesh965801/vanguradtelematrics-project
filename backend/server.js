const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Static folder for product images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Routes
const prebookingRoutes = require("./routes/prebooking");
app.use("/api/prebooking", prebookingRoutes);

// ❗ Admin route (unchanged as you requested)
app.use("/api/admin", require("./routes/admin"));

// ✅ Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
