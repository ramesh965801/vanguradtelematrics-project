import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/images/loogo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
   
    <nav className="navbar">

  <div className="logo">
    <img src={logo} alt="Eduilluminate Logo" />
  </div>

  <div
    className={`menu-icon ${menuOpen ? "active" : ""}`}
    onClick={() => setMenuOpen(!menuOpen)}
  >
    ☰
  </div>

      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        <li><NavLink to="/" end>Home</NavLink></li>
        <li><NavLink to="/services">Services</NavLink></li>
        <li><NavLink to="/testimonial">Testimonials</NavLink></li>
        <li><NavLink to="/contact">Contact</NavLink></li>
        <li><NavLink to="/aboutus">About</NavLink></li>
      </ul>
    </nav>
  );
};

export default Navbar;
