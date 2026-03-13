import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Services from "./components/Services";
import ProductDetails from "./components/ProductDetails";
import Testimonialpage from "./pages/Testimonialpage";
import Contact from "./pages/Contactpage";
import Aboutus from "./pages/Aboutus";
import PreBooking from "./components/PreBooking";
import AdminDashboard from "./components/AdminDashboard";
import Products from "./components/Products";
import PaymentSuccess from "./components/PaymentSuccess";

function App() {
  return (
   
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/services" element={<Services />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/testimonial" element={<Testimonialpage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/aboutus" element={<Aboutus />} />
       <Route path="/prebooking/:id" element={<PreBooking />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/admin123AvhfGrsFouTRseoPWytrsgfrhiokb" element={<AdminDashboard />} />

      </Routes>
   
  );
}

export default App;
