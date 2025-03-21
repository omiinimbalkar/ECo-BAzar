import React, { useState } from "react";
import './Header.css';
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

function Header(props) {

  const [loc, setLoc] = useState(null)
  const [showOver, setshowOver] = useState(false)
  const navigate = useNavigate();

  // Define locations outside of handleLogout so it's accessible in JSX
  let locations = [
    {
      'latitude': 19.0760,
      'longitude': 72.8777,
      'placeName': "Mumbai, Maharashtra"
    },
    {
      'latitude': 28.6139,
      'longitude': 77.2099,
      'placeName': "New Delhi, Delhi"
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  return (
    <div className="header-container d-flex justify-content-between align-items-center px-3 py-2 bg-light shadow">
      <div className="d-flex align-items-center gap-3">
        <Link className="links text-dark text-decoration-none fw-bold" to="/home">HOME</Link>

        {/* Dropdown for selecting a location */}
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
            placeholder="Search..."
          />
          <button className="btn btn-primary" onClick={() => props.handleClick && props.handleClick()}>
            <FaSearch />
          </button>
        </div>
      </div>

      {/* Development Team and Location */}
      <div className="fw-bold text-primary">
        Development Team | Virar, Palghar
      </div>

      {/* Profile and Menu */}
      <div className="position-relative">
        <div className="d-flex justify-content-center align-items-center bg-dark text-white rounded-circle"
          style={{ width: '40px', height: '40px', cursor: 'pointer' }}
          onClick={() => setshowOver(!showOver)}>
          OM
        </div>

        {showOver && (
          <div className="position-absolute bg-dark text-white p-3 rounded shadow"
            style={{ width: '200px', top: '50px', right: '0px', zIndex: 10 }}>
            {!!localStorage.getItem('token') && (
              <>
                <Link to="/add-product" className="d-block text-white text-decoration-none mb-2">
                  <button className='btn btn-outline-light w-100'>ADD PRODUCT</button>
                </Link>
                <Link to="/liked-products" className="d-block text-white text-decoration-none mb-2">
                  <button className='btn btn-outline-light w-100'>FAVOURITES</button>
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
    </div>

  );
}

export default Header;
