import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import "./Contact.css";

const Contact = () => {

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs.send(
      "service_9f4nynd", 
      "template_9phfuvc", 
      formData,
      "ixznySGMOAcVcbXCE" 
    )
    .then(() => {
      alert("Message Sent Successfully!");
      setFormData({
        name: "",
        phone: "",
        email: "",
        message: ""
      });
      setLoading(false);
    })
    .catch((error) => {
      console.error(error);
      alert("Failed to send message.");
      setLoading(false);
    });
  };

  return (
    <section className="contact-section">

      {/* MAP BACKGROUND */}
      <div className="map-wrapper">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14968.375318007103!2d85.824272!3d20.296383!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1909d2d5170aa5%3A0xfc580e2b68b33fa8!2sBhubaneswar%2C%20Odisha%2C%20India!5e0!3m2!1sen!2sus!4v1772379283073!5m2!1sen!2sus"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Bhubaneswar Map"
        ></iframe>
      </div>

      {/* CONTACT CARD */}
      <div className="contact-card">

        <div className="contact-top">
          <div className="contact-left">
            <h4>Email</h4>
            <p>
              <a href="mailto:vanguardtelematics@gmail.com">
                vanguardtelematics@gmail.com
              </a>
            </p>

            <h4>Contact Info</h4>
            <p>
              <a href="tel:+919691898096">
                +91-9691898096
              </a> - VanGuard Telematics Pvt. Ltd.
            </p>
          </div>

          <div className="contact-right">
            <h4>Address</h4>
            <p>Bhubaneswar, Odisha, India</p>

            <h4>Working Hours</h4>
            <p>Mon - Fri : 08:00 AM - 07:00 PM</p>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>

          <div className="form-row">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit">
            {loading ? "Sending..." : "Send Message"}
          </button>

        </form>

      </div>

    </section>
  );
};

export default Contact;