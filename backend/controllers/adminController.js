const db = require("../config/db");

// Add Product
exports.addProduct = (req, res) => {
  const { title, price, description } = req.body;
  const image = req.file ? req.file.filename : null;

  const sql = `
    INSERT INTO products (title, price, description, image)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [title, price, description, image], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database error" });
    }
    res.json({ success: true, productId: result.insertId });
  });
};

// Get Products
exports.getProducts = (req, res) => {
  const sql = "SELECT * FROM products ORDER BY id DESC";

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database error" });
    }

    const products = results.map((product) => ({
      ...product,
      image_url: product.image
        ? `${process.env.BASE_URL}/uploads/${product.image}`
        : null
    }));

    res.json(products);
  });
};

// Delete Product
exports.deleteProduct = (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM products WHERE id=?", [id], (err) => {
    if (err) return res.status(500).json({ message: "Delete error" });

    res.json({ success: true });
  });
};

// Get Prebookings
exports.getPrebookings = (req, res) => {
  const sql = `
    SELECT p.title, p.price, pr.*
    FROM prebookings pr
    JOIN products p ON pr.product_id = p.id
    ORDER BY pr.id DESC
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });

    res.json(results);
  });
};
