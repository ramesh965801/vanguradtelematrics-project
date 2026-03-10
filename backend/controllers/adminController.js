// backend/controllers/adminController.js
const db = require("../config/db");

// ADD PRODUCT
exports.addProduct = (req, res) => {
  const { title, price, description } = req.body;
  const image = req.file ? req.file.filename : null;

  if (!title || !price || !description || !image)
    return res.status(400).json({ message: "All fields required" });

  const sql = "INSERT INTO products (title, price, description, image) VALUES (?, ?, ?, ?)";
  db.query(sql, [title, price, description, image], (err, result) => {
    if (err) return res.status(500).json({ message: "DB error", error: err });
    res.json({ success: true, productId: result.insertId });
  });
};

// GET PRODUCTS
exports.getProducts = (req, res) => {
  db.query("SELECT * FROM products ORDER BY id DESC", (err, results) => {
    if (err) return res.status(500).json({ message: "DB error" });
    res.json(results);
  });
};

// DELETE PRODUCT
exports.deleteProduct = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM products WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ message: "DB error" });
    res.json({ success: true });
  });
};

// GET ALL PREBOOKINGS form
exports.getPrebookings = (req, res) => {
  const sql = `
    SELECT p.*, pr.title AS product_name, pr.price AS price
    FROM prebookings p
    LEFT JOIN products pr ON p.product_id = pr.id
    ORDER BY p.created_at DESC
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: "DB error" });
    res.json(results);
  });
};

// backend/middleware/upload.js
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });
module.exports = upload;
