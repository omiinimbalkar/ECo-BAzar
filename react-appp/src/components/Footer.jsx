import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-dark text-light py-3 mt-auto">
        <div className="container text-center">
          <div className="row">
      
            {/* About Section */}
            <div className="col-md-4 mb-3">
              <h6 className="text-success fw-bold">Eco-Bazar</h6>
              <p className="small">
                An eco-friendly marketplace to buy, sell, and recycle second-hand products.
                Join us in reducing waste and promoting sustainability!
              </p>
            </div>
      
            {/* Quick Links */}
            <div className="col-md-4 mb-3">
              <h6 className="text-info fw-bold">Quick Links</h6>
              <ul className="list-unstyled small">
                <li><a href="/about" className="text-light text-decoration-none">📌 About Us</a></li>
                <li><a href="/terms" className="text-light text-decoration-none">📜 Terms & Conditions</a></li>
                <li><a href="/privacy" className="text-light text-decoration-none">🔒 Privacy Policy</a></li>
              </ul>
            </div>
      
            {/* Mission Section */}
            <div className="col-md-4">
              <h6 className="text-warning fw-bold">Why Choose EcoBazar?</h6>
              <p className="small text-light">
                ♻️ Buy & Sell Preloved Items
                <br />
              🌍 Reduce Waste, Save Resources
              <br />
              🚀 Join the Eco-Friendly Marketplace</p>
            </div>
      
          </div>
      
          {/* Copyright Section */}
          <div className="mt-2">
            <p className="small mb-0">&copy; {new Date().getFullYear()} Eco-Bazar. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
      
    );
};

export default Footer;
