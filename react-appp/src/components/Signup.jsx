import Header from './Header';
import { Link , useNavigate  } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import API_URL from "../constants";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import Eye Icons


function Signup() {

  const navigate = useNavigate();
  const [username, setUsername] = useState(""); // we are creating a state
  const [email, setEmail] = useState(""); // we are creating a state   
  const [mobile, setMobile] = useState(""); // we are creating a state   
  const [password, setPassword] = useState(""); // we are creating a state 
  const [showPassword, setShowPassword] = useState(false); // ✅ For password visibility toggle
  

  const handleApi = (e) => {
    e.preventDefault();

    if (!username || !email || !mobile || !password) {
      alert("All fields are required!");
      return;
    }
    const URL = API_URL + "/signup";
    const data = { username, password , email , mobile};
    axios.post(URL, data)
      .then((res) => {
        if (res.data.message === 'User created') {
          alert('User created');
          navigate('/login'); // Redirect to Login after signup
        }
      })
      .catch((err) => {
        alert('SERVer ERR')
      });
  }
  return (
    <div>
      <Header />
      <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ width: "350px" }}>
        <h4 className="text-center mb-3 text-success">Signup for Eco Bazaar</h4>
        <form onSubmit={handleApi}>
          <div className="mb-3">
            <label className="form-label fw-bold">Username</label>
            <input
              className="form-control"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Email</label>
            <input
              className="form-control"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Mobile</label>
            <input
              className="form-control"
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Enter mobile number"
              required
            />
          </div>
          <div className="mb-2 position-relative">
            <label className="form-label fw-bold">Password</label>
            <div className="input-group">
              <input
                className="form-control"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <button className="btn btn-success w-100 fw-bold" type="submit">
            SIGNUP
          </button>
        </form>

        <div className="text-center mt-3">
          <span>Already have an account?</span>
          <Link to="/login">
            <button className="btn btn-outline-success w-100 mt-2">LOGIN</button>
          </Link>
        </div>
      </div>
    </div>
  </div>
  );
}
export default Signup;    
