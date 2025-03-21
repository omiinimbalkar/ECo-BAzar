import Header from './Header';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import API_URL from "../constants";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import Eye Icons


function Login() {


  const navigate = useNavigate();
  const [username, setUsername] = useState(""); // we are creating a state
  const [password, setPassword] = useState(""); // we are creating a state
  const [showPassword, setShowPassword] = useState(false); // State for toggling password


  const handleApi = (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("All fields are required!");
      return;
    }
  
    console.log({ username, password });// we are printing the username & password
    const URL = API_URL + "/login";
    const data = { username, password };
    axios.post(URL, data)
      .then((res) => {
        if (res.data.message) {
          alert(res.data.message);
          if (res.data.token) {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userId', res.data.userId);
            localStorage.setItem('userName', res.data.username);
            navigate('/');
          }
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
          <h4 className="text-center mb-3 text-success">Welcome to Eco Bazaar</h4>
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
            <div className="text-end mb-3">
              <Link to="/forgot-password" className="text-decoration-none text-danger">
                Forgot Password?
              </Link>
            </div>
            <button className="btn btn-success w-100 fw-bold" type="submit">
              LOGIN
            </button>
          </form>

          <div className="text-center mt-3">
            <span>Don't have an account?</span>
            <Link to="/signup">
              <button className="btn btn-outline-success w-100 mt-2">SIGNUP</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;    