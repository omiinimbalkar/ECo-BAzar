import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const PrivacyPolicy = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center text-warning mb-4">Privacy Policy</h1>
      <p className="text-muted">
        At Eco-Bazar, we are committed to protecting your privacy. This policy explains:
      </p>
      <ul>
        <li>What personal data we collect and why.</li>
        <li>How we store and secure your data.</li>
        <li>Your rights regarding your personal information.</li>
        <li>How we use cookies and tracking technologies.</li>
      </ul>
      <p>For more information, please read our complete <a href="#">Privacy Policy</a>.</p>
    </div>
  );
};

export default PrivacyPolicy;
