const express = require("express");
const router = express.Router();
const db = require("../config/db");

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
(product_id,product_name,name,email,phone,address,quantity,amount,payment_id)
VALUES (?,?,?,?,?,?,?,?,?)
`;

db.query(sql, [

product_id,
product_name,
name,
email,
phone,
address,
quantity,
amount,
payment_id

], (err,result)=>{

if(err){

console.log(err);
return res.status(500).json({error:"Database error"});

}

res.json({success:true});

});

});

module.exports = router;
