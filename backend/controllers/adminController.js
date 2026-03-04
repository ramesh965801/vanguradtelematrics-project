const db = require("../config/db");

// ✅ ADD PRODUCT
exports.addProduct = (req, res) => {
  const { title, price, description } = req.body; // include description
  const image = req.file ? req.file.filename : null;

  if (!title || !price || !description || !image) {
    return res.status(400).json({ message: "All fields required" });
  }

  const sql = "INSERT INTO products (title, price, description, image) VALUES (?, ?, ?, ?)";

  db.query(sql, [title, price, description, image], (err, result) => {
    if (err) {
      console.log("DB Insert Error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    res.json({ success: true, message: "Product Added", productId: result.insertId });
  });
};

// ✅ GET PRODUCTS
exports.getProducts = (req, res) => {
  db.query("SELECT * FROM products ORDER BY id DESC", (err, results) => {
    if (err) {
      console.log("DB Fetch Error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    res.json(results);
  });
};

// ✅ DELETE PRODUCT
exports.deleteProduct = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM products WHERE id = ?", [id], (err) => {
    if (err) {
      console.log("DB Delete Error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    res.json({ success: true, message: "Product Deleted" });
  });
};

// ✅ GET ALL PREBOOKINGS (ADMIN SIDE)
exports.getPrebookings = (req, res) => {
  const sql = `
    SELECT p.*, pr.title AS product_name
    FROM prebookings p
    LEFT JOIN products pr ON p.product_id = pr.id
    ORDER BY p.created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.log("DB Prebooking Fetch Error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    res.json(results);
  });
};