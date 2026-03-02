const db = require("../config/db");

exports.createPreBooking = (req, res) => {
  const { product_id, name, email, phone, quantity, address } = req.body;

  const query = `
    INSERT INTO prebookings (product_id, name, email, phone, quantity, address)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [product_id, name, email, phone, quantity, address], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database error" });
    }
    res.json({ message: "Pre-Booking saved successfully", id: result.insertId });
  });
};