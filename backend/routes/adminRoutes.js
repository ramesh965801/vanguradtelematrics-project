const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/orders", async (req,res)=>{

try{

const [rows] = await db.query(
"SELECT * FROM bookings ORDER BY order_date DESC"
);

res.json(rows);

}catch(err){

console.error(err);
res.status(500).json({error:"Server Error"});

}

});

module.exports = router;
