import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Products.css";

const Products = () => {

  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {

    const loadProducts = async () => {

      try {

        const res = await fetch(API + "/api/admin/products");
        const data = await res.json();

        setProducts(data);

      } catch (err) {
        console.log(err);
      }

    };

    loadProducts();

  }, []);

  return (

    <div>

      <h2>Products</h2>

      {products.length === 0 ? (
        <p>No products available</p>
      ) : (

        products.map((product) => (

          <div key={product.id}>

            <img
              src={API + "/uploads/" + product.image}
              width="150"
            />

            <h3>{product.title}</h3>

            <button onClick={() => navigate("/product/" + product.id)}>
              Pre Booking
            </button>

          </div>

        ))

      )}

    </div>

  );

};

export default Products;
