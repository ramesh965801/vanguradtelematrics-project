import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import "./ProductsPage.css";

const ProductsPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const API = "http://localhost:5000/api/admin";
  const BASE_URL = "http://localhost:5000";

  // Fetch all products added by admin
  useEffect(() => {
    fetch(`${API}/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div className="products-page">
      <Navbar />

      <section className="products-landing">
        <h1>Our Complete Product Collection</h1>

        {products.length === 0 ? (
          <p>No products available.</p>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <div
                key={product.id}
                className="product-card-full"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <img
                  src={`${BASE_URL}/uploads/${product.image}`}
                  alt={product.title}
                />
                <div className="product-info">
                  <h3>{product.title}</h3>
                  <p>{product.description || "No description available"}</p>
                </div>
                <div className="buy-wrapper">
                  <button
                    className="more-products-btn"
                    onClick={(e) => {
                      e.stopPropagation(); // prevent card click
                      navigate(`/product/${product.id}`);
                    }}
                  >
                    Pre Booking Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default ProductsPage;