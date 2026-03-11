const express = require("express");
const router = express.Router();
const upload = require("../middleware/cloudinary");
const db = require("../config/db");

router.post("/add-product", upload.single("image"), (req, res) => {
  const { title, price, description } = req.body;

  const image_url = req.file.path; // Cloudinary returns public URL here

  const sql =
    "INSERT INTO products (title, price, description, image_url) VALUES (?, ?, ?, ?)";

  db.query(sql, [title, price, description, image_url], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }

    res.json({
      success: true,
      productId: result.insertId,
    });
  });
});

module.exports = router;
