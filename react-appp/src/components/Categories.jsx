import React from "react";
import { Link, useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
import categories from "./CategoriesList.js";
import Header from "./Header.css";
function Categories(props) {

 const navigate = useNavigate();
  return (
    <div className="cat-container">
      <div>
        <span className="p-3"> All Categories </span>
        {categories && categories.length > 0 &&
          categories.map((item, index) => {
            return (
              <span onClick={() => navigate('/category/' + item)} key={index} className="category"> {item} </span>
            );
          })}
      </div>
    </div>
  );
}
export default Categories;
