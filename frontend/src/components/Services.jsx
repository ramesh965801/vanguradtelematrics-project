import React, { useEffect, useRef } from "react";
import "./Services.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import serviceData from "./serviceData";

const Services = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.2 }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });
  }, []);

  return (
    <div className="services-page">
      <Navbar />

      <section className="services-section">
        <h1 className="services-title">Our Premium Services</h1>
        <p className="services-subtitle">
          We provide high quality digital and training solutions designed for modern professionals.
        </p>

        <div className="services-grid">
          {serviceData.map((service, index) => (
            <div
              key={service.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="service-card hidden"
            >
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <button className="service-btn">Learn More</button>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;