import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Brand Section */}
        <div className="footer-brand">
          <h2>VanGuard Telematics</h2>
          <p>
            Explore, Learn, and Grow with our insightful solutions across
            telematics, tracking, and smart vehicle technology.
          </p>
        </div>

        {/* Links Section */}
        <div className="footer-links">

          {/* Company Links */}
          <div className="link-section">
            <h4>Company</h4>
            <ul>
              <li><Link to="/aboutus">About Us</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/testimonial">Testimonials</Link></li>
            </ul>
          </div>

          {/* Resources Links */}
          <div className="link-section">
            <h4>Resources</h4>
            <ul>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/guides">Guides</Link></li>
              <li><Link to="/support">Support</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
             <li><Link to="/admin123">Admin</Link></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="link-section">
            <h4>Contact</h4>
            <ul>
              <li>
                <a href="mailto:vanguardtelematics@gmail.com">
                  vanguardtelematics@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+919691898096">
                  +91-9691898096
                </a>
              </li>
              <li>Bhubaneswar, Odisha</li>
            </ul>
          </div>

        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} VanGuard Telematics Pvt. Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;