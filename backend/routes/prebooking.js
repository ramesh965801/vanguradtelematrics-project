const express = require("express");
const router = express.Router();
const db = require("../config/db");


// ✅ SAVE PREBOOKING
router.post("/", (req, res) => {
  const { product_id, name, email, phone, quantity, address } = req.body;

  if (!product_id || !name || !email || !phone || !quantity || !address) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql = `
    INSERT INTO prebookings 
    (product_id, name, email, phone, quantity, address) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [product_id, name, email, phone, quantity, address],
    (err, result) => {
      if (err) {
        console.error("POST ERROR:", err);
        return res.status(500).json({ message: "Database error" });
      }

      res.status(201).json({
        success: true,
        message: "Pre-booking saved successfully",
        bookingId: result.insertId
      });
    }
  );
});


// ✅ GET ALL BOOKINGS (ADMIN)
router.get("/", (req, res) => {
  const sql = `
    SELECT p.*, pr.title AS product_name
    FROM prebookings p
    LEFT JOIN products pr ON p.product_id = pr.id
    ORDER BY p.created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("GET ERROR:", err);
      return res.status(500).json({ message: "Database error" });
    }

    res.json(results);
  });
});

module.exports = router;