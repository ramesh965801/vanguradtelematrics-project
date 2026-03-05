import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Contact from "../components/Contact";

const Contactpage = () => {
  return (
    <div className="contact-page">
      <Navbar />

      <section className="contact-section">
        <h1
          style={{
            fontSize: "42px",
            fontWeight: "700",
            color: "#ffffff",
            textAlign: "center",
            letterSpacing: "1px",
            position: "relative"
          }}
        >
          Contact Us
        </h1>

        <Contact />
      </section>

      <Footer />
    </div>
  );
};

export default Contactpage;