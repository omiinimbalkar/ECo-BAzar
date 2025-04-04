import React from "react";
import { useNavigate, Link } from "react-router-dom";
import categories from "./CategoriesList.js";
import "./Header.css"; // Ensure CSS is correctly imported


function Categories() {
  const navigate = useNavigate();

  return (
    <>
      <Link to="/home" className="btn btn-dark d-flex align-items-center gap-2 px-3 py-2 rounded-pill shadow-sm">
        <i className="bi bi-list"></i> {/* Bootstrap icon for categories */}
        <span className="fw-bold">All Categories</span>
      </Link>
      <div className="cat-container">
        {categories?.map((item, index) => (
          <span
            key={index}
            onClick={() => navigate('/category/' + item)}
            className="text-dark fw-semibold"
          >
            {item}
          </span>
        ))}
      </div>
    </>
  );
}

export default Categories;
