const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/bookings", async (req, res) => {

  try {

    const [rows] = await db.promise().query(
      "SELECT * FROM bookings ORDER BY created_at DESC"
    );

    res.json(rows);

  } catch (err) {

    console.error(err);
    res.status(500).json({ error: "Server Error" });

  }

});

module.exports = router;
