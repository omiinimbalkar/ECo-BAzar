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
    <div className="header-container d-flex justify-content-between">
      <div className="header">
        <Link className="links" to="/home">HOME</Link>

        {/* Dropdown for selecting a location */}
        <select value={loc ?? ""} onChange={(e) => {
          localStorage.setItem('userLoc', e.target.value)
          setLoc(e.target.value)
        }}>
          {locations.map((item, index) => (
            <option key={index} value={`${item.latitude},${item.longitude}`}>
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

        {/* this below code for a circle logo to click on that we get al liked,logout and etc.. */}
        <div
          onClick={() => {
            setshowOver(!showOver)
          }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#002f34',
            color: "#fff",
            fontSize: '14px',
            width: '40px',
            height: '40px',
            borderRadius: '49%'
          }}> OM </div>

        {showOver && <div style={{
          minHeight: '100px',
          width: '200px',
          background: 'blue',
          position: 'absolute',
          top: '0',
          right: '0',
          zIndex: 1,
          marginTop: '50px',
          marginRight: '50px',
          color :'red', 
          fontSize: '14px',
          background : '#002f34',
          borderRadius : '10px'
        }}>

          <div>
            {!!localStorage.getItem('token') &&
              <Link to="/add-product">
                <button className='logout-btn'>ADD PRODUCT</button>
              </Link>
            }
          </div>

          <div>{!!localStorage.getItem('token') &&
            <Link to="/liked-products">
              <button className='logout-btn'> FAVOURITES </button>
            </Link>}</div>

          <div>{!!localStorage.getItem('token') &&
            <Link to="/my-products">
              <button className='logout-btn'>MY AD</button>
            </Link>}</div>

          <div>{!localStorage.getItem('token') ?
            <Link to='/login'> LOGIN </Link> :
            <button className="logout-btn" onClick={handleLogout}> LOGOUT </button>}</div>

        </div>}
      </div>
    </div>
  );
}

export default Header;
