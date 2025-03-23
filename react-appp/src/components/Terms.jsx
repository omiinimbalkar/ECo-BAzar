import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Terms = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center text-primary mb-4">Terms & Conditions</h1>
      <p className="text-muted">
        By using Eco-Bazar, you agree to the following terms and conditions:
      </p>
      <ul>
        <li>Users must provide accurate product descriptions.</li>
        <li>Eco-Bazar is not responsible for fraudulent transactions.</li>
        <li>Illegal or prohibited items cannot be sold.</li>
        <li>Eco-Bazar reserves the right to remove listings that violate policies.</li>
      </ul>
      <p>For full details, please read our complete <a href="#">Terms & Conditions</a>.</p>
    </div>
  );
};

export default Terms;
