import React from "react";
import "./Banner.css";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <section className="banner">
      {/* Animated Background Particles */}
      <div className="particles"></div>

      {/* Glow Layer */}
      <div className="glow"></div>

      <div className="glass-card">
        <h1>Precision Meets Possibilities</h1>
        <p>Welcome to vanguard Telematics</p>

        <div className="banner-buttons">
          <Link to="/services" className="btn primary">
            Explore Services
          </Link>

          <Link to="/contact" className="btn secondary">
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Banner;
