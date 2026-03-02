const express = require("express");
const router = express.Router();
const { createPreBooking } = require("../controllers/prebookingController");

// POST /api/prebooking
router.post("/", createPreBooking);

module.exports = router;