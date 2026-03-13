import React from "react";
import "./About.css"; // Import CSS
import aboutImage from "../assets/images/aboutus-1.jpeg"; // Your image file
import aboutImage2 from "../assets/images/aboutus-2.jpeg"; // Your image file
const About = () => {
  return (
    <section className="about-section">
      
      {/* LEFT CONTENT OVERLAY */}
      <div className="about-card">
        <img className="about-image" src={aboutImage} alt="About Us Left" />
        <div className="about-content left">
          <h2>About Us</h2>
          <div className="underline"></div>
          <p>
            Welcome to VanGuard Telematics Pvt. Ltd., where innovation drives connectivity. Our mission is to provide cutting-edge telematics solutions that empower businesses with real-time insights and smarter decision-making. From fleet management to IoT integration, we deliver technology that transforms operations and enhances efficiency.
          </p>
        </div>
      </div>

      {/* RIGHT CONTENT OVERLAY */}
      <div className="about-card">
        <img className="about-image" src={aboutImage2} alt="About Us Right" />
        <div className="about-content right">
          <h2>Our Vision</h2>
          <div className="underline"></div>
          <p>
            At VanGuard Telematics, we aim to empower businesses globally. By providing
            cutting-edge telematics solutions, we inspire innovation and
            facilitate growth across a wide range of industries, making connectivity
            accessible, meaningful, and efficient for everyone.
          </p>
        </div>
      </div>

    </section>
  );
};

export default About;
