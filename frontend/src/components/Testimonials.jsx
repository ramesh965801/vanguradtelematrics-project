import React, { useState } from "react";
import "./Testimonials.css";

import User1 from "../assets/images/people1.jpg";
import User2 from "../assets/images/people2.jpg";
import User3 from "../assets/images/people3.webp";
 

const testimonials = [
  {
    image: User1,
    text: "Eduilluminate completely transformed my learning journey. The courses are practical and career-focused.",
    name: "Rahul Sharma",
    location: "Bangalore, India"
  },
  {
    image: User2,
    text: "The live classes are interactive and engaging. I gained real-world skills within weeks.",
    name: "Priya Verma",
    location: "Hyderabad, India"
  },
  {
    image: User3,
    text: "Highly professional platform with excellent support and certifications.",
    name: "Amit Patel",
    location: "Mumbai, India"
  }
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  return (
    <section className="testimonials">
<div className="testimonial-header">
          <h2>Testimonial</h2>
        </div>
      <div className="testimonial-wrapper">
        

        <button className="arrow left" onClick={prevSlide}>
          ❮
        </button>

        <div className="testimonial-slider">
          <div
            className="testimonial-track"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {testimonials.map((item, i) => (
              <div className="testimonial-card" key={i}>
                <div className="image-wrapper">
                  <img src={item.image} alt={item.name} />
                  <div className="quote-icon">“</div>
                </div>

                <p className="testimonial-text">{item.text}</p>

                <div className="stars">★★★★★</div>

                <h3>{item.name}</h3>
                <span className="location">{item.location}</span>
              </div>
            ))}
          </div>
        </div>

        <button className="arrow right" onClick={nextSlide}>
          ❯
        </button>

      </div>

      {/* DOTS */}
      <div className="dots">
        {testimonials.map((_, i) => (
          <span
            key={i}
            className={`dot ${index === i ? "active" : ""}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>

    </section>
  );
};

export default Testimonials;