import React from "react";
import './Header.css'
import { Link , useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
function Header () {
  
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }
  return (
    <div>
        <div className="header">
            <Link to="/home">HOME</Link>

            <span className="mt-3">Sell & Purchase ONLINE.... in your city</span>

            {!localStorage.getItem('token') ?
            <Link to ='/login'> LOGIN </Link>:
            <button onClick={handleLogout}> LOGOUT </button> }
        </div>
    </div>
  );
};

export default Header;
