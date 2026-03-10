import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  // ================= LOGIN =================
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");

  // ================= DASHBOARD DATA =================
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPreBookings, setTotalPreBookings] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [products, setProducts] = useState([]);
  const [preBookings, setPreBookings] = useState([]);
  const [activeSection, setActiveSection] = useState("");
  const [success, setSuccess] = useState(false);

  // ================= ADD PRODUCT FORM =================
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    description: "",
    image: null
  });
  const [preview, setPreview] = useState(null);

  // ================= API BASE =================
  const API = import.meta.env.VITE_API_URL; // Example: https://vanguradtelematrics-project.onrender.com/api/admin

  // ================= LOGIN HANDLERS =================
  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const { username, password } = loginData;
    if (username === "admin" && password === "Admin@123") {
      setIsLoggedIn(true);
      setLoginError("");
      loadDashboardData();
    } else {
      setLoginError("Invalid credentials!");
    }
  };

  // ================= LOAD DASHBOARD DATA =================
  const loadDashboardData = async () => {
    try {
      // -------- PRODUCTS --------
      const resProducts = await fetch(`${API}/products`);
      const productsData = await resProducts.json();
      setProducts(productsData);
      setTotalProducts(productsData.length);

      // -------- PRE-BOOKINGS --------
      const resPre = await fetch(`${API}/prebookings`);
      const preData = await resPre.json();
      setPreBookings(preData);
      setTotalPreBookings(preData.length);

      // -------- REVENUE --------
      let revenue = 0;
      preData.forEach((item) => {
        if (item.price && item.quantity) revenue += Number(item.price) * Number(item.quantity);
      });
      setTotalRevenue(revenue);
    } catch (err) {
      console.error("Dashboard load error:", err);
    }
  };

  useEffect(() => {
    if (isLoggedIn) loadDashboardData();
  }, [isLoggedIn]);

  // ================= FORM CHANGE =================
  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      setNewProduct((prev) => ({ ...prev, image: file }));
      if (file) setPreview(URL.createObjectURL(file));
    } else {
      setNewProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  // ================= ADD PRODUCT =================
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", newProduct.title);
      formData.append("price", newProduct.price);
      formData.append("description", newProduct.description);
      formData.append("image", newProduct.image);

      const res = await fetch(`${API}/add-product`, { method: "POST", body: formData });

      if (res.ok) {
        setSuccess(true);
        setNewProduct({ title: "", price: "", description: "", image: null });
        setPreview(null);
        loadDashboardData();
        setTimeout(() => setSuccess(false), 1500);
      } else {
        const errData = await res.json();
        console.error("Add product failed:", errData);
      }
    } catch (err) {
      console.error("Add product error:", err);
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id, type) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await fetch(`${API}/delete-${type}/${id}`, { method: "DELETE" });
      loadDashboardData();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // ================= NAVIGATION =================
  const showProducts = () => setActiveSection("products");
  const showPreBookings = () => setActiveSection("prebookings");
  const showAddProduct = () => setActiveSection("addProduct");

  // ================= LOGIN PAGE =================
  if (!isLoggedIn) {
    return (
      <div className="login-popup">
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Admin Login</h2>
          {loginError && <p className="error">{loginError}</p>}
          <input type="text" name="username" placeholder="Username" value={loginData.username} onChange={handleLoginChange} required />
          <input type="password" name="password" placeholder="Password" value={loginData.password} onChange={handleLoginChange} required />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  // ================= DASHBOARD =================
  return (
    <div className="admin-container">
      <h1 className="admin-title">Admin Dashboard</h1>

      <div className="dashboard-cards">
        <div className="dashboard-card" onClick={showProducts}>
          <h3>Total Products</h3>
          <h2>{totalProducts}</h2>
        </div>
        <div className="dashboard-card" onClick={showPreBookings}>
          <h3>Total Pre-Bookings</h3>
          <h2>{totalPreBookings}</h2>
        </div>
        <div className="dashboard-card">
          <h3>Total Revenue</h3>
          <h2>{`₹ ${totalRevenue}`}</h2>
        </div>
        <div className="dashboard-card" onClick={showAddProduct}>
          <h3>Add Product</h3>
          <h2>+</h2>
        </div>
      </div>

      {/* PRODUCTS SECTION */}
      {activeSection === "products" && (
        <div className="details-section">
          <h2>Product Details</h2>
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
                    <img src={item.image || "/placeholder.png"} alt={item.title} width="60" />
                  </td>
                  <td>{item.title}</td>
                  <td>{`₹ ${item.price}`}</td>
                  <td>{item.description}</td>
                  <td>
                    <button onClick={() => handleDelete(item.id, "product")}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* PRE-BOOKINGS SECTION */}
      {activeSection === "prebookings" && (
        <div className="details-section">
          <h2>Pre-Booking Details</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Product ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Quantity</th>
                <th>Address</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {preBookings.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.product_id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.quantity}</td>
                  <td>{item.address}</td>
                  <td>{`₹ ${item.price * item.quantity}`}</td>
                  <td>
                    <button onClick={() => handleDelete(item.id, "prebooking")}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ADD PRODUCT SECTION */}
      {activeSection === "addProduct" && (
        <div className="product-form-section">
          <h2>Add New Product</h2>
          {success && <div>✅ Product Added Successfully!</div>}
          <form onSubmit={handleAddProduct}>
            <input type="text" name="title" placeholder="Product Title" value={newProduct.title} onChange={handleChange} required />
            <input type="number" name="price" placeholder="Price" value={newProduct.price} onChange={handleChange} required />
            <textarea name="description" placeholder="Description" value={newProduct.description} onChange={handleChange} required />
            <input type="file" name="image" accept="image/*" onChange={handleChange} required />
            {preview && <img src={preview} width="100" alt="preview" />}
            <button type="submit">Add Product</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
