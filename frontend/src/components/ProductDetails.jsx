import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./ProductDetails.css";

const ProductDetails = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const API = `${import.meta.env.VITE_API_URL}/api/admin`;
  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {

    try {

      const response = await fetch(`${API}/products`);

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();

      console.log("Products API:", data);

      const products = Array.isArray(data) ? data : data.products;

      const foundProduct = products.find(
        (item) => item.id === Number(id)
      );

      setProduct(foundProduct);

    } catch (error) {

      console.error("Fetch product error:", error);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {
    return (
      <div className="details-page">
        <Navbar />
        <h2 style={{ textAlign: "center", marginTop: "80px" }}>
          Loading product...
        </h2>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="details-page">
        <Navbar />
        <h2 style={{ textAlign: "center", marginTop: "80px" }}>
          Product Not Found
        </h2>
        <Footer />
      </div>
    );
  }

  return (

    <div className="details-page">

      <Navbar />

      <div className="details-content-wrapper">

        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <div className="details-card">

          <img
            src={`${BASE_URL}/uploads/${product.image}`}
            alt={product.title}
            onError={(e) => {
              e.target.src = "/placeholder.png";
            }}
          />

          <div className="details-content">

            <h1>{product.title}</h1>

            <p>{product.description}</p>

            <div className="price-box">
              <span className="old-price">₹19,998.67</span>
              <span className="new-price">₹14,999</span>
              <span className="discount">25% OFF</span>
            </div>

            <p className="exclusive-offer">
              🔥 Exclusive offer for first 15 customers
            </p>

            <button
              className="action-btn"
              onClick={() => navigate(`/prebooking/${product.id}`)}
            >
              Pre Booking Now
            </button>

          </div>

        </div>

      </div>

      <Footer />

    </div>

  );

};

export default ProductDetails;
