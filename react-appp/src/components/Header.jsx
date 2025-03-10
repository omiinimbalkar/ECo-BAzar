import React from "react";
import './Header.css';
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

function Header(props) {
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
    navigate('/login');
  };

  return (
    <div className="header-container d-flex justify-content-between">
      <div className="header">
        <Link className="links" to="/home">HOME</Link>

        {/* Dropdown for selecting a location */}
        <select value='' onChange={(e) => {
          localStorage.setItem('userLoc', e.target.value)
        }}>
          {locations.map((item, index) => (
            <option value={`${item.latitude},${item.longitude}`}>
              {item.placeName}
            </option>
          ))}
        </select>

        {/* Search bar */}
        <input className="search"
          type="text"
          value={props && props.search}
          onChange={(e) => props.handlesearch && props.handlesearch(e.target.value)}
        />
        <button className="search-btn" onClick={() => props.handleClick && props.handleClick()}><FaSearch /></button>
      </div>

      <div>
        {!!localStorage.getItem('token') &&
          <Link to="/add-product">
            <button className='logout-btn'>ADD PRODUCT</button>
          </Link>
        }

        {!!localStorage.getItem('token') &&
          <Link to="/liked-products">
            <button className='logout-btn'>LIKED PRODUCTS</button>
          </Link>
        }

        {!localStorage.getItem('token') ?
          <Link to='/login'> LOGIN </Link> :
          <button className="logout-btn" onClick={handleLogout}> LOGOUT </button>
        }
      </div>
    </div>
  );
}

export default Header;
