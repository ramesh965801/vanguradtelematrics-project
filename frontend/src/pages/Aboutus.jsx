import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import About from "../components/About";
import "./Aboutus.css";

const Aboutus = () => {
  return (
    <div className="aboutus-page">
      <Navbar />

      <section className="aboutus-section">
        <About />
      </section>

      <Footer />
    </div>
  );
};

export default Aboutus;