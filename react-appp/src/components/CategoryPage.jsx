import { useEffect, useState } from 'react';
import Header from './Header';
import Categories from './Categories';
import { useNavigate, Link, data, useParams } from 'react-router-dom';
import axios from 'axios';
import { FaHeart } from 'react-icons/fa';
import './Home.css';
import API_URL from '../constants';

function CategoryPage() {

  const navigate = useNavigate()

  const param = useParams()
  console.log(param);

  //creating stae for products
  const [products, setproducts] = useState([]);
  const [likedproducts, setlikedproducts] = useState([]);
  const [refresh, setrefresh] = useState(false);
  console.log(likedproducts)
  const [cproducts, setcproducts] = useState([]);
  const [search, setsearch] = useState("");
  const [issearch, setissearch] = useState(false);

  // for not acces home page without login thi useeffrct is used..
  // useEffect(() => {
  //   if (!localStorage.getItem('token')) {
  //     navigate('/login')
  //   }
  // }, [])
  useEffect(() => {
    const url = API_URL + "/get-products?catName=" + param.catName;
    axios
      .get(url)
      .then((res) => {
        if (res.data.products) {
          setproducts(res.data.products);
        }
      })
      .catch((err) => {
        alert("server error")
      });

    const url2 = API_URL + "/liked-products";
    let data = { userId: localStorage.getItem('userId') };

    axios.post(url2, data)
      .then((res) => {
        if (res.data.products) {
          setlikedproducts(res.data.products);
        }
      })
      .catch((err) => {
        alert("server error")
      });

  }, [param, refresh]);

  const handlesearch = (value) => {
    setsearch(value);
  }
  const handleClick = () => {

    // const url = 'http://localhost:4000/search?search=' + search;
    const url = API_URL + '/search?search=' + search + '&loc=' + localStorage.getItem('userLoc');

    axios.get(url)
      .then((res) => {
        setcproducts(res.data.product);
        setissearch(true);
      })
      .catch((err) => {
        alert("server error")
      });

    // let filteredProducts = products.filter((item) => {
    //   if (item.pname.toLowerCase().includes(search.toLowerCase()) ||
    //     item.pdesc.toLowerCase().includes(search.toLowerCase()) ||
    //     item.category.toLowerCase().includes(search.toLowerCase())) {
    //     return item;
    //   }
    // })
    // setcproducts(filteredProducts)


  }

  const handleCategory = (value) => {
    let filteredProducts = products.filter((item, index) => {
      if (item.category == value) {
        return item;
      }
    })
    setcproducts(filteredProducts)
  }

  const handleLike = (productId, e) => {
    e.stopPropagation();
    let userId = localStorage.getItem('userId');
    const url = API_URL + "/liked-product";
    const data = { userId, productId }
    axios.post(url, data)
      .then((res) => {
        if (res.data.message) {
          // alert('Liked')
          setrefresh(!refresh)
        }
      })
      .catch((err) => {
        alert("server error")
      });
  }

  const handleDisLike = (productId, e) => {
    let userId = localStorage.getItem('userId');
    e.stopPropagation();

    if (!userId) {
      alert("Please Login First!! ")
      return;
    }
    const url = API_URL + "/disliked-product";
    const data = { userId, productId }
    axios.post(url, data)
      .then((res) => {
        if (res.data.message) {
          // alert('DisLiked')
          setrefresh(!refresh)


        }
      })
      .catch((err) => {
        alert("server error")
      });

  }

  const handelProduct = (id) => {
    navigate('/product/' + id)
  }
  return (
    <>
      {/* Header & Categories */}
      <Header search={search} handlesearch={handlesearch} handleClick={handleClick} />
      <Categories handleCategory={handleCategory} />

      <div className='container mt-4'>
        {/* Search Results Section */}
        {issearch && cproducts && (
          <div className="d-flex align-items-center justify-content-between bg-light p-3 rounded shadow-sm">
            <h5 className="text-primary mb-0">🔍 SEARCH RESULT:</h5>
            <button className="btn btn-outline-danger btn-sm" onClick={() => setissearch(false)}>
              ❌ CLEAR
            </button>
          </div>
        )}

        {/* No Results Message */}
        {issearch && cproducts && cproducts.length === 0 && (
          <h5 className="text-center text-danger mt-3">No results found...</h5>
        )}

        {/* Product Grid */}
        <div className="row mt-3">
          {(issearch ? cproducts : products)?.map((item) => (
            <div key={item._id} className="col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-4">
              <div className="card border-0 shadow-lg rounded-4 overflow-hidden h-100 text-center p-2">

                {/* Image & Heart Icon */}
                <div className="position-relative">
                  <img src={`${API_URL}/${item.pimg}`} className="card-img-top img-fluid rounded-3" style={{ height: "220px", objectFit: "cover" }} />
                  <div className="position-absolute top-0 end-0 p-2">
                    {likedproducts.find((likedItem) => likedItem._id === item._id) ? (
                      <FaHeart onClick={(e) => handleDisLike(item._id, e)} className="text-danger fs-4" />
                    ) : (
                      <FaHeart onClick={(e) => handleLike(item._id, e)} className="text-secondary fs-4" />
                    )}
                  </div>
                </div>

                {/* Product Details */}
                <div className="card-body text-center bg-white d-flex flex-column ">
                  <h6 className="fw-bold text-dark">{item.pname}</h6>
                  <span className="badge bg-secondary mb-2 px-3 py-1">{item.category}</span>
                  <p className="text-danger fw-bold fs-5 mt-1">
                    💰 Rs. {item.price} /-
                  </p>
                  <p className="text-muted small">{item.pdesc}</p>
                  <button className="btn btn-primary w-100 rounded-pill mt-auto" onClick={() => handelProduct(item._id)}>
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>

  );
}
export default CategoryPage;    
