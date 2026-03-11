import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Products.css";

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = `${import.meta.env.VITE_API_URL}/api/admin`;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API}/products`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();

      if (Array.isArray(data)) setProducts(data);
      else if (data.products && Array.isArray(data.products)) setProducts(data.products);
      else setProducts([]);
    } catch (error) {
      console.error("Fetch error:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Loading products...</h2>;
  }

  return (
    <section className="products">
      <h2 className="section-title">Our Products</h2>

      {products.length === 0 ? (
        <p style={{ textAlign: "center" }}>No products available</p>
      ) : (
        <div className={`product-grid ${products.length === 1 ? "single-product" : ""}`}>
          {products.map((product, index) => {
            const animationClass =
              index % 3 === 0 ? "slide-left" : index % 3 === 1 ? "slide-up" : "slide-right";

            // Use public folder images
            const imgSrc = product.image_filename
              ? `/images/${product.image_filename}`
              : "/images/placeholder.png";

            return (
              <div
                key={product.id}
                className={`product-card ${animationClass}`}
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <img
                  src={imgSrc}
                  alt={product.title}
                  onError={(e) => {
                    e.target.src = "/images/placeholder.png";
                  }}
                />
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <div className="buy-wrapper">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/product/${product.id}`);
                    }}
                  >
                    Pre Booking Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Products;
