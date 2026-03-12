import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";

// Import products from products.js
import productsData from "../products";

const AdminDashboard = () => {

  // ---------------- LOGIN ----------------
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");

  // ---------------- DASHBOARD DATA ----------------
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPreBookings, setTotalPreBookings] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  const [products, setProducts] = useState([]);
  const [preBookings, setPreBookings] = useState([]);

  const [activeSection, setActiveSection] = useState("");

  const API = `${import.meta.env.VITE_API_URL}/api/admin`;

  // ---------------- LOGIN ----------------
  const handleLoginChange = (e) =>
    setLoginData({ ...loginData, [e.target.name]: e.target.value });

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

  // ---------------- LOAD DATA ----------------
  const loadDashboardData = async () => {

    try {

      // Load products from products.js
      setProducts(productsData);
      setTotalProducts(productsData.length);

      // Load PreBookings from backend
      const resPre = await fetch(`${API}/prebookings`);
      const preData = await resPre.json();

      const preArray = Array.isArray(preData)
        ? preData
        : preData.data || [];

      setPreBookings(preArray);
      setTotalPreBookings(preArray.length);

      // Calculate revenue
      const revenue = preArray.reduce((sum, item) => {

        const price = parseFloat(item.price) || 0;
        const quantity = parseInt(item.quantity) || 1;

        return sum + price * quantity;

      }, 0);

      setTotalRevenue(revenue);

    } catch (err) {

      console.error("Dashboard load error:", err);

    }

  };

  // ---------------- DELETE PREBOOKING ----------------
  const handleDelete = async (id) => {

    if (!window.confirm("Are you sure?")) return;

    try {

      await fetch(`${API}/delete-prebooking/${id}`, {
        method: "DELETE"
      });

      loadDashboardData();

    } catch (err) {

      console.error("Delete error:", err);

    }

  };

  const showProducts = () => setActiveSection("products");
  const showPreBookings = () => setActiveSection("prebookings");

  // ---------------- LOGIN PAGE ----------------
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

  // ---------------- DASHBOARD ----------------
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
          <h2>₹ {totalRevenue}</h2>
        </div>

      </div>

      {/* ---------------- PRODUCTS ---------------- */}

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
              </tr>
            </thead>

            <tbody>

              {products.map((item) => (

                <tr key={item.id}>

                  <td>{item.id}</td>

                  <td>
                    <img
                      src={item.image}
                      alt={item.title}
                      width="80"
                    />
                  </td>

                  <td>{item.title}</td>

                  <td>₹ {item.price}</td>

                  <td>{item.description}</td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

      {/* ---------------- PREBOOKINGS ---------------- */}

      {activeSection === "prebookings" && (

        <div className="details-section">

          <h2>Pre-Booking Details</h2>

          <table>

            <thead>
              <tr>
                <th>ID</th>
                <th>Product</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Quantity</th>
                <th>Address</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {preBookings.map((item) => (

                <tr key={item.id}>

                  <td>{item.id}</td>

                  <td>
                    {item.title ||
                     item.product_name ||
                     item.product_title ||
                     "Vehicle Accident Tracker"}
                  </td>

                  <td>{item.name}</td>

                  <td>{item.email}</td>

                  <td>{item.phone}</td>

                  <td>{item.quantity}</td>

                  <td>{item.address}</td>

                  <td>
                    {item.created_at
                      ? new Date(item.created_at).toLocaleString()
                      : "-"}
                  </td>

                  <td>
                    <button onClick={() => handleDelete(item.id)}>
                      Delete
                    </button>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>

  );

};

export default AdminDashboard;
