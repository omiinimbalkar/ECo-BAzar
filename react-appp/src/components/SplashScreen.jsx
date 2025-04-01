import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SplashScreen.css"; // Import CSS file
import logo from "../img/logo.jpg";

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
    }, 9000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="splash-screen">
      <div className="glass-container">
        <img src={logo} alt="Eco-Bazar Logo" className="logo" />
        <h2 className="title">Welcome to Eco-Bazar</h2>
        <p className="subtitle">Your one-stop marketplace sell & buy products</p>
        <button className="skip-btn" onClick={() => navigate("/home")}>Skip</button>
      </div>
    </div>
  );
};

export default SplashScreen;
