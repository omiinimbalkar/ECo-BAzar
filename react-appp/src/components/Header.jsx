import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './Header.css';
import { Link, useNavigate } from "react-router-dom";
import { FaBell, FaSun, FaMoon, FaHeart, FaPhone, FaSearch } from "react-icons/fa";
import logo from '../img/logo.jpg';
import info  from '../img/info.png';
import robot from '../img/robot.png';

function Header(props) {

  const [loc, setLoc] = useState(null)
  const [showOver, setshowOver] = useState(false)
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);


  // Define locations outside of handleLogout so it's accessible in JSX
  let locations = [
    {
      'latitude': 19.0760,
      'longitude': 72.8777,
      'placeName': "Virar, Maharashtra"
    },
    {
      'latitude': 28.6139,
      'longitude': 77.2099,
      'placeName': "Palghar, Maharashtra"
    },
  ];

  // Get user's location from localStorage  
  if (!loc) {
    setLoc(localStorage.getItem('userLoc') ?? `${locations[0].latitude},${locations[0].longitude}`);
  }


  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  return (
    <>

      <div className="header-container d-flex flex-wrap justify-content-between align-items-center px-3 py-2">
        {/* Logo */}
        <div className="d-flex align-items-center gap-2">
          <Link to="/home" className="text-dark text-decoration-none fw-bold">
            <img src={logo} alt="Eco-Bazar Logo" style={{ width: "80px", height: "70px" }} />
          </Link>

          {/* Dropdown for selecting a location */}
          <div className="d-flex align-items-center ms-auto gap-3 flex-grow-1 mx-3 ">
            <select className="form-select" value={loc ?? ""} onChange={(e) => {
              localStorage.setItem('userLoc', e.target.value);
              setLoc(e.target.value);
            }} style={{ width: "150px" }}>
              {locations.map((item, index) => (
                <option key={index} value={`${item.latitude},${item.longitude}`}>
                  {item.placeName}
                </option>
              ))}
            </select>

            {/* Search bar */}
            <div className="d-flex">
              <input className="form-control me-2"
                type="text"
                value={props && props.search}
                onChange={(e) => props.handlesearch && props.handlesearch(e.target.value)}
                placeholder=" Search..."
                style={{ minWidth: "400px", maxWidth: "500px" }}  // <-- Set min & max width
              />
              <button className="btn btn-info" onClick={() => props.handleClick && props.handleClick()}>
                <FaSearch />
              </button>
            </div>
          </div>
        </div>

        {/* Development Team and Location */}
        <div className="fw-bold text-primary">
          Development Team | Virar, Palghar
        </div>

        {/* Icons: Wishlist, Notifications, Dark Mode */}

        {/* like */}
        <div className="d-flex align-items-center">
          <div className="position-relative me-3">
            <Link to="/liked-products" className="d-block text-white text-decoration-none mb-2">
              <FaHeart size={22} className="text-danger cursor-pointer" />
            </Link>
          </div>

          {/* bell */}
          <Link to="/notifaction">
          <div className="position-relative me-3 gap-3">
            <FaBell size={22} className="text-secondary cursor-pointer" />
            <span className="badge bg-danger position-absolute top-0 start-100 translate-middle rounded-pill">3</span>
          </div>
          </Link>
          {/* bell */}
          <Link to="/contact">
          <div className="position-relative me-3 gap-3">
            <FaPhone size={22} className="text-secondary cursor-pointer" />
            <span className="badge bg-danger position-absolute top-0 start-100 translate-middle rounded-pill"></span>
          </div>
          </Link>

          {/* dark/light button */}
          <button className="btn btn-light me-2" onClick={() => {
            setDarkMode(!darkMode);
            document.body.classList.toggle("bg-dark");
            document.body.classList.toggle("text-light");
          }}>
            {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>

            <Link to="/scrapper">
             <button className="btn btn-outline-danger me-3"><
              img src={info} alt="" width={20} height={20}/>
              </button>
            </Link>

        </div>






        {/* Profile and Menu */}
        <div className="position-relative">
          <div className="d-flex justify-content-center align-items-center bg-dark text-white rounded-circle"
            style={{ width: '40px', height: '40px', cursor: 'pointer' }}
            onClick={() => setshowOver(!showOver)}>
            <span className="fw-bold">☰</span> 
          </div>

          {showOver && (
            <div className="position-absolute bg-dark text-white p-3 rounded shadow"
              style={{ width: '200px', top: '50px', right: '0px', zIndex: 10 }}>
              {!!localStorage.getItem('token') && (
                <>
                  <Link to="/add-product" className="d-block text-white text-decoration-none mb-2">
                    <button className='btn btn-outline-light w-100'>ADD PRODUCT </button>
                  </Link>
                  <Link to="/my-profile" className="d-block text-white text-decoration-none mb-2">
                    <button className='btn btn-outline-light w-100'>PROFILE</button>
                  </Link>

                  <Link to="/my-products" className="d-block text-white text-decoration-none mb-2">
                    <button className='btn btn-outline-light w-100'>MY AD</button>
                  </Link>
                </>
              )}

              {!localStorage.getItem('token') ? (
                <Link to='/login' className="d-block text-center text-white">LOGIN</Link>
              ) : (
                <button className="btn btn-danger w-100 mt-2" onClick={handleLogout}>LOGOUT</button>
              )}
            </div>
          )}
        </div>
        {/* Trending Offers
      <marquee className="bg-warning text-dark py-1">
        🔥 Flash Sale: Get 30% Off on Electronics! 🎉
      </marquee> */}


      </div >
    </>
  );
}

export default Header;
