import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap
import logo from "../img/logo.jpg"; // Import your logo

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home"); // Redirect to homepage
    }, 4000); // Show for 4 seconds

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-white text-center" style={{
      background: "linear-gradient(135deg,rgb(240, 250, 255) 0%,rgb(119, 228, 55) 50%,rgb(144, 174, 187) 100%)",
      animation: "fadeIn 1.5s ease-in-out"
    }}>
      <img
        src={logo} // Update with your logo path
        alt="Eco-Bazar Logo"
        className="img-fluid mb-3"
        style={{ maxWidth: "180px", animation: "zoomIn 1.5s ease-in-out" }}
      />
      <h2 className="fw-bold" style={{ animation: "fadeInUp 1.5s ease-in-out" }}>Welcome to Eco-Bazar</h2>
      <p className="lead" style={{ animation: "fadeInUp 2s ease-in-out" }}>Your one-stop marketplace for eco-friendly products</p>
      <button 
        className="btn btn-light mt-3 fw-bold px-4 py-2"
        style={{ boxShadow: "0px 0px 10px rgba(255, 255, 255, 0.6)", transition: "0.3s" }}
        onClick={() => navigate("/home")}
        onMouseOver={(e) => e.target.style.boxShadow = "0px 0px 20px rgba(255, 255, 255, 0.9)"}
        onMouseOut={(e) => e.target.style.boxShadow = "0px 0px 10px rgba(255, 255, 255, 0.6)"}
      >
        Skip
      </button>
    </div>
  );
};

export default function App() {
  return <SplashScreen />;
}