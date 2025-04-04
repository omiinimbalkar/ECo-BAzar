import Header from './Header';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import API_URL from "../constants";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import './Signup.css'; // Import the new CSS

function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleApi = (e) => {
    e.preventDefault();
    if (!username || !email || !mobile || !password) {
      alert("All fields are required!");
      return;
    }
    const URL = API_URL + "/signup";
    const data = { username, password, email, mobile };
    axios.post(URL, data)
      .then((res) => {
        if (res.data.message === 'User created') {
          alert('User created');
          navigate('/login');
        }
      })
      .catch(() => {
        alert('SERVER ERROR');
      });
  };

  return (
    <>
    <Header/>
    <div className="signup-container">
      <div className="signup-box">
        <h2>Signup for Eco Bazaar</h2>
        <form onSubmit={handleApi}>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              required
            />
          </div>
          <div className="input-group">
            <label>Mobile</label>
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Enter mobile number"
              required
            />
          </div>
          <div className="input-group password-field">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button className="signup-btn" type="submit">
            SIGNUP
          </button>
        </form>
        <div className="login-link">
          <span>Already have an account?</span>
          <Link to="/login">
            <button className="login-btn">LOGIN</button>
          </Link>
        </div>
      </div>
    </div>
  </>
  );
}

export default Signup;
