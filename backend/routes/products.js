const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET ALL PRODUCTS
router.get("/products", (req, res) => {

  const sql = "SELECT * FROM products ORDER BY id DESC";

  db.query(sql, (err, result) => {

    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database error" });
    }

    const products = result.map((product) => {

      return {
        ...product,
        image_url: product.image
          ? `${process.env.BASE_URL}/uploads/${product.image}`
          : null
      };

    });

    res.json(products);

  });

});

module.exports = router;
