import React from "react";
import { useNavigate } from "react-router-dom";
import "./Products.css";

// Import images
import product1 from "../assets/images/product1.jpg";
import product2 from "../assets/images/product2.jpg";
import product3 from "../assets/images/product3.jpg";  

const Products = () => {

  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      title: "Vehicle GPS Tracker",
      price: 2999,
      description: "Advanced GPS tracker with real-time location tracking.",
      image: product1
    },
    {
      id: 2,
      title: "Smart Dash Camera",
      price: 4999,
      description: "HD dash camera with accident detection.",
      image:  product2
    },
    {
      id: 3,
      title: "Vehicle Safety Alarm",
      price: 1999,
      description: "Smart anti-theft alarm system.",
      image: product3
    }
  ];

  return (
    <section className="products">

      <h2 className="section-title">Our Products</h2>

      <div className="product-grid">

        {products.map((product, index) => {

          let animationClass = "";

          if (index % 3 === 0) animationClass = "slide-left";
          else if (index % 3 === 1) animationClass = "slide-up";
          else animationClass = "slide-right";

          return (

            <div
              key={product.id}
              className={`product-card ${animationClass}`}
              onClick={() => navigate(`/product/${product.id}`)}
            >

              <img
                src={product.image}
                alt={product.title}
              />

              <h3>{product.title}</h3>

              <p>{product.description}</p>

              <h4>₹{product.price}</h4>

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

    </section>
  );
};

export default Products;
