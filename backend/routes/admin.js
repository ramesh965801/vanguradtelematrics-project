const express = require("express");
const router = express.Router();
const upload = require("../middleware/cloudinary"); // Cloudinary middleware
const db = require("../config/db");

// ---------- ADD PRODUCT (Cloudinary) ----------
router.post("/add-product", upload.single("image"), (req, res) => {
  const { title, price, description } = req.body;
  const image_url = req.file.path; // Cloudinary public URL

  const sql = "INSERT INTO products (title, price, description, image_url) VALUES (?, ?, ?, ?)";
  db.query(sql, [title, price, description, image_url], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });
    res.json({ success: true, productId: result.insertId });
  });
});

// ---------- GET ALL PRODUCTS ----------
router.get("/products", (req, res) => {
  const sql = "SELECT * FROM products ORDER BY id DESC";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });
    res.json(results);
  });
});

// ---------- DELETE PRODUCT ----------
router.delete("/delete-product/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM products WHERE id=?", [id], (err) => {
    if (err) return res.status(500).json({ message: "Delete error", error: err });
    res.json({ success: true });
  });
});

// ---------- GET PREBOOKINGS ----------
router.get("/prebookings", (req, res) => {
  const sql = `
    SELECT p.title, p.price, pr.*
    FROM prebookings pr
    JOIN products p ON pr.product_id = p.id
    ORDER BY pr.id DESC
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });
    res.json(results);
  });
});

module.exports = router;
