require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const adminRoutes = require("./routes/admin");
const prebookingRoutes = require("./routes/prebooking");
const productRoutes = require("./routes/products");

app.use("/api", productRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/prebooking", prebookingRoutes);

app.get("/", (req, res) => {
  res.send("Backend Running");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
