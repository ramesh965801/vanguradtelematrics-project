import React from "react";
import { useNavigate } from "react-router-dom";
import "./Products.css";
import products from "../products";   // ✅ import data file

const Products = () => {

  const navigate = useNavigate();

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
