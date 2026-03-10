const express = require("express");
const router = express.Router();
const db = require("../config/db");

// POST PreBooking
router.post("/", (req, res) => {

  const { product_id, name, email, phone, quantity, address } = req.body;

  if (!product_id || !name || !email || !phone || !quantity || !address) {
    return res.status(400).json({ success: false, message: "All fields required" });
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
        console.error("DB Error:", err);
        return res.status(500).json({ success: false, message: "Database error" });
      }

      res.json({
        success: true,
        bookingId: result.insertId,
        message: "Prebooking saved successfully"
      });
    }
  );
});

module.exports = router;
