require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// Static uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const adminRoutes = require("./routes/admin");
const productRoutes = require("./routes/products");
const prebookingRoutes = require("./routes/prebooking");

app.use("/api/products", productRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/prebooking", prebookingRoutes);

app.get("/", (req, res) => {
  res.send("Backend running");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
