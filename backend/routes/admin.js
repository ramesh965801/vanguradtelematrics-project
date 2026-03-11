const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const adminController = require("../controllers/adminController");

router.post("/add-product", upload.single("image"), adminController.addProduct);
router.get("/products", adminController.getProducts);
router.delete("/delete-product/:id", adminController.deleteProduct);
router.get("/prebookings", adminController.getPrebookings);

module.exports = router;
