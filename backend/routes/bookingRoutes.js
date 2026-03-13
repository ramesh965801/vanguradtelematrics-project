const express = require("express");
const router = express.Router();
const db = require("../config/db");

// SAVE NEW BOOKING (POST)
router.post("/", (req, res) => {
  const {
    product_id,
    product_name,
    name,
    email,
    phone,
    address,
    quantity,
    amount,
    payment_id
  } = req.body;

  const sql = `
    INSERT INTO bookings
    (product_id, product_name, name, email, phone, address, quantity, amount, payment_id)
    VALUES (?,?,?,?,?,?,?,?,?)
  `;

  db.query(
    sql,
    [product_id, product_name, name, email, phone, address, quantity, amount, payment_id],
    (err, result) => {
      if (err) {
        console.error("DB Error:", err);
        return res.status(500).json({ success: false, error: "Database error" });
      }
      res.json({ success: true, id: result.insertId });
    }
  );
});

// GET ALL BOOKINGS
router.get("/", (req, res) => {
  const sql = `SELECT * FROM bookings ORDER BY created_at DESC`;
  db.query(sql, (err, results) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ success: false, error: "Database error" });
    }
    res.json(results);
  });
});

module.exports = router;
