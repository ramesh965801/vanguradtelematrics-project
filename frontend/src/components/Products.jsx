import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Products.css";

const Products = () => {

const navigate = useNavigate();

const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);

const API = import.meta.env.VITE_API_URL;

useEffect(() => {

```
const fetchProducts = async () => {

  try {

    const response = await fetch(API + "/api/admin/products");

    const data = await response.json();

    console.log("Products:", data);

    if (Array.isArray(data)) {
      setProducts(data);
    } else {
      setProducts([]);
    }

  } catch (error) {

    console.error("Fetch error:", error);

  } finally {

    setLoading(false);

  }

};

fetchProducts();
```

}, []);

if (loading) {
return <h2 style={{ textAlign: "center" }}>Loading products...</h2>;
}

return (

```
<div className="products">

  <h2 className="section-title">Our Products</h2>

  {products.length === 0 ? (

    <p style={{ textAlign: "center" }}>No products available</p>

  ) : (

    <div className="product-grid">

      {products.map((product) => (

        <div key={product.id} className="product-card">

          <img
            src={API + "/uploads/" + product.image}
            alt={product.title}
          />

          <h3>{product.title}</h3>

          <p>{product.description}</p>

          <p>₹ {product.price}</p>

          <button
            onClick={() => navigate("/product/" + product.id)}
          >
            Pre Booking Now
          </button>

        </div>

      ))}

    </div>

  )}

</div>
```

);

};

export default Products;
