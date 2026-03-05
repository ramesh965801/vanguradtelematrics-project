import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./preBooking.css";

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

  // ✅ Correct VITE ENV
  const API = `${import.meta.env.VITE_API_URL}/api/admin`;
  const PREBOOKING_API = `${import.meta.env.VITE_API_URL}/api/prebooking`;
  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {

      const res = await fetch(`${API}/products`);
      const data = await res.json();

      const foundProduct = data.find(
        (item) => item.id === Number(id)
      );

      setProduct(foundProduct);

    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

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

      const res = await fetch(PREBOOKING_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          product_id: product.id,
          ...formData
        })
      });

      const data = await res.json();

      if (res.ok && (data.success || data.id)) {

        alert(`✅ Pre-Booking Successful!\nBooking ID: ${data.bookingId || data.id}`);

        setFormData({
          name: "",
          email: "",
          phone: "",
          quantity: 1,
          address: ""
        });

        navigate(-1);

      } else {
        alert(`❌ ${data.message || "Failed to submit pre-booking"}`);
      }

    } catch (error) {
      console.error(error);
      alert("Something went wrong while saving your pre-booking.");
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

          {/* Product Image */}
          {/* <img
            src={`${BASE_URL}/uploads/${product.image}`}
            alt={product.title}
            className="product-preview"
            onError={(e) => {
              e.target.src = "/placeholder.png";
            }}
          /> */}

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