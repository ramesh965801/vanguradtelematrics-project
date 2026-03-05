import React from "react";
import "./Testimonialpage.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";  
import Testimonials from "../components/Testimonials";

const Testimonialpage = () => {
  return (
    <div className="testimonial-page">
      <Navbar />

      <section className="testimonial-section">
        <h1>What Our Clients Say</h1>

        <Testimonials/>
      </section>

      <Footer />
    </div>
  );
};

export default Testimonialpage;