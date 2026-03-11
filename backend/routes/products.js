const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/", (req, res) => {

  const sql = "SELECT * FROM products ORDER BY id DESC";

  db.query(sql, (err, result) => {

    if (err) {
      return res.status(500).json({ error: "Database error" });
    }

    const products = result.map((product) => ({

      ...product,

      image_url: product.image
        ? `${process.env.BASE_URL}/uploads/${product.image}`
        : null

    }));

    res.json(products);

  });

});

module.exports = router;
