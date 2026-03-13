import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  // LOGIN
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");

  // DASHBOARD DATA
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalBookings, setTotalBookings] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  const [products, setProducts] = useState([]);
  const [bookings, setBookings] = useState([]);

  const [activeSection, setActiveSection] = useState("");
  const [success, setSuccess] = useState(false);

  // ADD PRODUCT
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    description: "",
    image: null
  });
  const [preview, setPreview] = useState(null);

  const API = `${import.meta.env.VITE_API_URL}/api/admin`;
  const BASE_URL = import.meta.env.VITE_API_URL;

  // LOGIN INPUT HANDLER
  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  // LOGIN SUBMIT
  const handleLogin = (e) => {
    e.preventDefault();
    if (loginData.username === "admin" && loginData.password === "Admin@123") {
      setIsLoggedIn(true);
      setLoginError("");
      loadDashboardData();
    } else {
      setLoginError("Invalid credentials!");
    }
  };

  // LOAD DASHBOARD DATA
  const loadDashboardData = async () => {
    try {
      // PRODUCTS
      const resProducts = await fetch(`${API}/products`);
      const productsData = await resProducts.json();
      setProducts(productsData);
      setTotalProducts(productsData.length);

      // BOOKINGS
const resBookings = await fetch(`${BASE_URL}/api/bookings`);
      const bookingData = await resBookings.json();
      setBookings(bookingData);
      setTotalBookings(bookingData.length);

      // REVENUE
      let revenue = 0;
      bookingData.forEach((item) => {
        if (item.amount) revenue += Number(item.amount);
      });
      setTotalRevenue(revenue);
    } catch (err) {
      console.error("Dashboard error:", err);
    }
  };

  // PRODUCT FORM CHANGE
  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      setNewProduct({ ...newProduct, image: file });
      if (file) setPreview(URL.createObjectURL(file));
    } else {
      setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    }
  };

  // ADD PRODUCT
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", newProduct.title);
      formData.append("price", newProduct.price);
      formData.append("description", newProduct.description);
      formData.append("image", newProduct.image);

      const res = await fetch(`${API}/add-product`, {
        method: "POST",
        body: formData
      });

      if (res.ok) {
        setSuccess(true);
        setNewProduct({ title: "", price: "", description: "", image: null });
        setPreview(null);
        loadDashboardData();
        setTimeout(() => setSuccess(false), 1500);
      }
    } catch (err) {
      console.error("Add product error:", err);
    }
  };

  // DELETE PRODUCT OR BOOKING
  const handleDelete = async (id, type) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await fetch(`${API}/delete-${type}/${id}`, { method: "DELETE" });
      loadDashboardData();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const showProducts = () => setActiveSection("products");
  const showBookings = () => setActiveSection("bookings");
  const showAddProduct = () => setActiveSection("addProduct");

  // LOGIN PAGE
  if (!isLoggedIn) {
    return (
      <div className="login-popup">
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Admin Login</h2>
          {loginError && <p className="error">{loginError}</p>}
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={loginData.username}
            onChange={handleLoginChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleLoginChange}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  // DASHBOARD PAGE
  return (
    <div className="admin-container">
      <h1 className="admin-title">Admin Dashboard</h1>

      {/* DASHBOARD CARDS */}
      <div className="dashboard-cards">
        <div className="dashboard-card" onClick={showProducts}>
          <h3>Total Products</h3>
          <h2>{totalProducts}</h2>
        </div>
        <div className="dashboard-card">
          <h3>Total Revenue</h3>
          <h2>₹ {totalRevenue}</h2>
        </div>
        <div className="dashboard-card" onClick={showBookings}>
          <h3>Total Bookings</h3>
          <h2>{totalBookings}</h2>
        </div>
        <div className="dashboard-card" onClick={showAddProduct}>
          <h3>Add Product</h3>
          <h2>+</h2>
        </div>
      </div>

      {/* PRODUCTS TABLE */}
      {activeSection === "products" && (
        <div className="details-section">
          <h2>Products</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>
                    <img
                      src={`${BASE_URL}/uploads/${item.image}`}
                      alt={item.title}
                      width="60"
                    />
                  </td>
                  <td>{item.title}</td>
                  <td>₹ {item.price}</td>
                  <td>{item.description}</td>
                  <td>
                    <button onClick={() => handleDelete(item.id, "product")}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* BOOKINGS TABLE */}
      {activeSection === "bookings" && (
        <div className="details-section">
          <h2>Bookings</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Product</th>
                <th>Customer</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Payment ID</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.product_name}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.address}</td>
                  <td>{item.quantity}</td>
                  <td>₹ {item.amount}</td>
                  <td>{item.payment_id}</td>
                  <td>
                    {item.created_at
                      ? new Date(item.created_at).toLocaleString("en-IN")
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ADD PRODUCT FORM */}
      {activeSection === "addProduct" && (
        <div className="product-form-section">
          <h2>Add Product</h2>
          {success && <div className="success-msg">Product Added Successfully</div>}
          <form onSubmit={handleAddProduct}>
            <input
              type="text"
              name="title"
              placeholder="Product Title"
              value={newProduct.title}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={newProduct.price}
              onChange={handleChange}
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={newProduct.description}
              onChange={handleChange}
              required
            />
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              required
            />
            {preview && <img src={preview} alt="Preview" width="100" />}
            <button type="submit">Add Product</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
