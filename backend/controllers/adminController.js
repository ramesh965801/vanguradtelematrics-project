const db = require("../config/db");

// ================= ADD PRODUCT =================
exports.addProduct = (req, res) => {
  const { title, price, description } = req.body;
  const image = req.file ? req.file.filename : null;

  if (!title || !price || !description || !image)
    return res.status(400).json({ message: "All fields required" });

  const sql = "INSERT INTO products (title, price, description, image) VALUES (?, ?, ?, ?)";
  db.query(sql, [title, price, description, image], (err, result) => {
    if (err) {
      console.error("DB error on addProduct:", err);
      return res.status(500).json({ message: "DB error", error: err });
    }

    const host = process.env.BACKEND_HOST || `http://localhost:${process.env.PORT || 8080}`;

    res.json({
      success: true,
      product: {
        id: result.insertId,
        title,
        price,
        description,
        image: `${host}/uploads/${image}`
      }
    });
  });
};

// ================= GET PRODUCTS =================
exports.getProducts = (req, res) => {
  db.query("SELECT * FROM products ORDER BY id DESC", (err, results) => {
    if (err) {
      console.error("DB error on getProducts:", err);
      return res.status(500).json({ message: "DB error", error: err });
    }

    const host = process.env.BACKEND_HOST || `http://localhost:${process.env.PORT || 8080}`;
    const productsWithFullImage = results.map((p) => ({
      ...p,
      image: `${host}/uploads/${p.image}`
    }));

    res.json(productsWithFullImage);
  });
};

// ================= DELETE PRODUCT =================
exports.deleteProduct = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM products WHERE id = ?", [id], (err) => {
    if (err) {
      console.error("DB error on deleteProduct:", err);
      return res.status(500).json({ message: "DB error", error: err });
    }
    res.json({ success: true });
  });
};

// ================= GET ALL PREBOOKINGS =================
exports.getPrebookings = (req, res) => {
  const sql = `
    SELECT p.*, pr.title AS product_name, pr.price AS price
    FROM prebookings p
    LEFT JOIN products pr ON p.product_id = pr.id
    ORDER BY p.created_at DESC
  `;
  db.query(sql, (err, results) => {
    if (err) {
      console.error("DB error on getPrebookings:", err);
      return res.status(500).json({ message: "DB error", error: err });
    }
    res.json(results);
  });
};
