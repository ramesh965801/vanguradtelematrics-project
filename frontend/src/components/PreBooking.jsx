import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
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

  // ✅ Backend URLs
  const BASE_URL = import.meta.env.VITE_API_URL;

  const PRODUCT_API = `${BASE_URL}/api/admin/products`;
  const PREBOOKING_API = `${BASE_URL}/api/prebooking`;

  // Load product
  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {

      const res = await fetch(PRODUCT_API);
      const data = await res.json();

      const foundProduct = data.find((item) => item.id === Number(id));

      setProduct(foundProduct);

    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!product) return;

    setLoading(true);

    try {

      const res = await fetch(PREBOOKING_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          product_id: product.id,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          quantity: formData.quantity,
          address: formData.address
        })
      });

      const data = await res.json();

      if (res.ok && data.success) {

        alert("✅ Pre-Booking Successful!");

        setFormData({
          name: "",
          email: "",
          phone: "",
          quantity: 1,
          address: ""
        });

        navigate(-1);

      } else {

        alert(data.message || "Failed to save prebooking");

      }

    } catch (error) {

      console.error("Prebooking Error:", error);
      alert("❌ Something went wrong while saving your pre-booking.");

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

        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <div className="prebooking-card">

          <h1>Pre-Booking for {product.title}</h1>

          {/* Product Image */}

          <img
            src={`${BASE_URL}/uploads/${product.image}`}
            alt={product.title}
            className="product-preview"
            onError={(e) => (e.target.src = "/placeholder.png")}
          />

          <p>Please fill the details below to reserve your product.</p>

          <form className="prebooking-form" onSubmit={handleSubmit}>

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
              {loading ? "Submitting..." : "Submit Pre-Booking"}
            </button>

          </form>

        </div>

      </div>

      <Footer />

    </div>

  );

};

export default PreBooking;
