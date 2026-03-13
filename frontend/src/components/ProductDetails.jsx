import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import products from "../data/products";   // ✅ import product data
import "./ProductDetails.css";

const ProductDetails = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const foundProduct = products.find(
      (item) => item.id === Number(id)
    );

    setProduct(foundProduct);
    setLoading(false);

  }, [id]);

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

        <button
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <div className="details-card">

          <img
            src={product.image}
            alt={product.title}
          />

          <div className="details-content">

            <h1>{product.title}</h1>

            <p>{product.description}</p>

            <div className="price-box">

              <span className="old-price">
                ₹19,998.67
              </span>

              <span className="new-price">
                ₹{product.price}
              </span>

              <span className="discount">
                25% OFF
              </span>

            </div>

          <p className="exclusive-offer">
  Pre Reserve Now At Just 
  <span style={{ color: "rgb(129 0 0)", fontWeight: "bold", fontSize: "20px",margin-left:"5px", }}>
      ₹ 699
  </span>
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
