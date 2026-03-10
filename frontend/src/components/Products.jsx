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

    const res = await fetch(`${API}/api/admin/products`);

    const data = await res.json();

    console.log("Products from API:", data);

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

}, [API]);

if (loading) {
return <h2 style={{textAlign:"center"}}>Loading products...</h2>;
}

return (

```
<div className="products">

  <h2>Our Products</h2>

  {products.length === 0 ? (

    <p>No products available</p>

  ) : (

    <div className="product-grid">

      {products.map((product) => (

        <div
          key={product.id}
          className="product-card"
          onClick={() => navigate(`/product/${product.id}`)}
        >

          <img
            src={`${API}/uploads/${product.image}`}
            alt={product.title}
          />

          <h3>{product.title}</h3>

          <p>{product.description}</p>

          <p>₹ {product.price}</p>

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/product/${product.id}`);
            }}
          >
            Pre Booking
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
