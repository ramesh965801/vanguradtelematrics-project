import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import products from "../data/products";
import "./PreBooking.css";

const PreBooking = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    quantity: 1,
    address: ""
  });

  const PREBOOKING_API = `${import.meta.env.VITE_API_URL}/api/prebooking`;

  useEffect(() => {

    const foundProduct = products.find(
      (item) => item.id === Number(id)
    );

    setProduct(foundProduct);

  }, [id]);

  const handleChange = (e) => {

    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!product) return;

    setLoading(true);

    try {

      const amount = product.price * formData.quantity;

      /* STEP 1 : Create Razorpay Order */

      const orderRes = await fetch(
        "http://localhost:5000/api/payment/create-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ amount })
        }
      );

      const order = await orderRes.json();

      /* STEP 2 : Razorpay Payment */

      const options = {

        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: order.amount,
        currency: "INR",
        order_id: order.id,

        name: "My Store",
        description: product.title,

        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },

        theme: {
          color: "#27ae60"
        },

        handler: async function (response) {

          try {

            /* STEP 3 : Verify Payment */

            const verifyRes = await fetch(
              "http://localhost:5000/api/payment/verify-payment",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature
                })
              }
            );

            const verifyData = await verifyRes.json();

            if (verifyData.success) {

              /* STEP 4 : Save Booking */

             await fetch(PREBOOKING_API,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({

product_id:product.id,
product_name:product.title,

name:formData.name,
email:formData.email,
phone:formData.phone,
address:formData.address,

quantity:formData.quantity,

amount:amount,

payment_id:response.razorpay_payment_id

})
});
              /* STEP 5 : Redirect to Success Page */

              navigate("/payment-success", {
                state: {
                  transactionId: response.razorpay_payment_id,
                  productName: product.title,
                  amount: amount
                }
              });

            } else {

              alert("❌ Payment verification failed");

            }

          } catch (error) {

            console.error(error);
            alert("Payment verification error");

          }

        }

      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {

      console.error(error);
      alert("Payment failed. Please try again.");

    }

    setLoading(false);
  };

  if (!product) {

    return (
      <div className="prebooking-page">
        <Navbar />
        <h2 style={{ textAlign: "center", marginTop: "100px" }}>
          Loading Product...
        </h2>
        <Footer />
      </div>
    );

  }

  return (

    <div className="prebooking-page">

      <Navbar />

      <div className="prebooking-wrapper">

        <button
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <div className="prebooking-card">

          <h1>Pre-Booking for {product.title}</h1>

          <p>Please fill the details below to reserve your product.</p>

          <form
            className="prebooking-form"
            onSubmit={handleSubmit}
          >

            <label>
              Full Name
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Email
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Phone
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Quantity
              <input
                type="number"
                name="quantity"
                min="1"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Address
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </label>

            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >
              {loading ? "Processing..." : "Pay & Pre-Book"}
            </button>

          </form>

        </div>

      </div>

      <Footer />

    </div>

  );

};

export default PreBooking;
