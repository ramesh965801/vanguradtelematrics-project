const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config(); // load .env variables

const app = express();

app.use(cors());
app.use(express.json());

// Static folder for images
app.use("/uploads", express.static(path.join(__dirname, process.env.UPLOAD_DIR)));

// Routes
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/prebooking", require("./routes/prebooking"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});