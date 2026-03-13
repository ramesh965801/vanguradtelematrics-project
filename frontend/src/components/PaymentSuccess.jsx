import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./PaymentSuccess.css";

const PaymentSuccess = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const { transactionId, productName, amount } = location.state || {};

  useEffect(() => {

    const timer = setTimeout(() => {
      navigate("/");
    }, 10000);

    return () => clearTimeout(timer);

  }, [navigate]);

  return (

    <div className="success-page">

      <Navbar />

      <div className="success-card">

  <div className="success-icon">✔</div>

        <h1>🎉 Thank You for Your Order!</h1>

        <p>Your payment was successful.</p>

        <div className="success-details">

          <p><strong>Product:</strong> {productName}</p>

          <p><strong>Transaction ID:</strong> {transactionId}</p>

          <p><strong>Amount Paid:</strong> ₹{amount}</p>

        </div>

        <p className="redirect-msg">
          You will be redirected to the home page in 10 seconds...
        </p>

      </div>

      <Footer />

    </div>

  );
};

export default PaymentSuccess;
