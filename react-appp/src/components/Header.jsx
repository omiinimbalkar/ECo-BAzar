import React from "react";
import './Header.css'
import { Link, useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
function Header(props) {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }
  return (
    <div className="header-container d-flex justify-content-between">
      <div className="header">
        <Link className="links" to="/home">HOME</Link>

        {/* code line for search barrrr */}
        <input className="search"
          type="text"
          value={props && props.search}
          onChange={(e) => props.handlesearch && props.handlesearch(e.target.value)}
        />
        <button className="search-btn" onClick={() => props.handleClick && props.handleClick()}>SEARCH</button>


      </div>


      <div>
        {!!localStorage.getItem('token') &&
          <Link to="/add-product">
          <button className='logout-btn'>ADD PRODUCT</button>
          </Link>}

        {!!localStorage.getItem('token') &&
          <Link to="/liked-products">
          <button className='logout-btn'>LIKED PRODUCTS</button>
          </Link>}

        {!localStorage.getItem('token') ?
          <Link to='/login'> LOGIN </Link> :
          <button className="logout-btn" onClick={handleLogout}> LOGOUT </button>}
      </div>
    </div>
  );
};

export default Header;
