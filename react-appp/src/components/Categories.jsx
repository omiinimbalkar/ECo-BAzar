import React from "react";
import { Link, useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
import categories from "./CategoriesList.js";
import Header from "./Header.css";
function Categories(props) {

 const navigate = useNavigate();
  return (
    <div className="cat-container d-flex align-items-center gap-3 flex-wrap">
  <span className="fw-bold px-3">All Categories:</span>

  {categories?.map((item, index) => (
    <span key={index} onClick={() => navigate('/category/' + item)} className="text-dark fw-semibold cursor-pointer">
      {item}
    </span>
  ))}
</div>

  );
}
export default Categories;
