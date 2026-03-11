import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Products.css";

// Import images
import product1Img from "../assets/images/product1.jpg";
import product2Img from "../assets/images/product2.jpg";
import placeholderImg from "../assets/images/placeholder.png";

// Map image names to imported images
const imageMap = {
  "product1.jpg": product1Img,
  "product2.jpg": product2Img,
};

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
      console.error(error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Loading products...</h2>;

  return (
    <section className="products">
      <h2 className="section-title">Our Products</h2>

      {products.length === 0 ? (
        <p style={{ textAlign: "center" }}>No products available</p>
      ) : (
        <div className={`product-grid ${products.length === 1 ? "single-product" : ""}`}>
          {products.map((product, index) => {
            const animationClass = index % 3 === 0 ? "slide-left" : index % 3 === 1 ? "slide-up" : "slide-right";

            // Use local image if exists, otherwise placeholder
            const imgSrc = imageMap[product.image_filename] || placeholderImg;

            return (
              <div
                key={product.id}
                className={`product-card ${animationClass}`}
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <img src={product1Img} alt={product.title} />
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
