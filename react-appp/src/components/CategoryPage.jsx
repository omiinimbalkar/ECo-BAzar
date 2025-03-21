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
    <div>
      <Header search={search} handlesearch={handlesearch} handleClick={handleClick} />
      <Categories handleCategory={handleCategory} />

      {issearch && cproducts && <
        h5>SEARCH RESULT :
        <button className="clear-btn" onClick={() => setissearch(false)}> CLEAR </button>
      </h5>}
      {issearch && cproducts && cproducts.length == 0 && <h5> No Result found......... </h5>}

      {issearch && (
        <>
          <div className='d-flex justify-content-center flex-wrap'>
            {cproducts && products.length > 0 &&
              cproducts.map((item, index) => {
                return (
                  <div key={item._id} className="card m-3" >
                    <div onClick={() => handleLike(item._id)} className="icons-conatiner">
                      <FaHeart className='icons' />
                    </div>
                    <img width="500px" height="200px" src={API_URL + '/' + item.pimg} />
                    <p className='m-2 '>{item.pname} | {item.category} </p>
                    <p className="m-2 text-danger">{item.price}</p>
                    <p className="m-2 text-success">{item.pdesc}</p>
                  </div>
                )
              })}
          </div>
        </>
      )}

      {!issearch && <div className='d-flex justify-content-center flex-wrap'>
        {products && products.length > 0 &&
          products.map((item, index) => {
            return (
              <div onClick={() => { handelProduct(item._id) }} key={item._id} className="card m-3" >
                <div onClick={() => handleLike(item._id)} className="icons-conatiner">
                  {
                    likedproducts.find((likedItem) => likedItem._id == item._id) ?
                      <FaHeart onClick={(e) => handleDisLike(item._id, e)} className='red-icons' /> :
                      <FaHeart onClick={(e) => handleLike(item._id, e)} className='icons' />

                  }
                </div>
                <img width="300px" height="200px" src={API_URL + '/' + item.pimg} />
                <p className="m-2 price-text"> Rs.{item.price} /-</p>
                <p className='m-2 '>{item.pname} | {item.category} </p>
                <p className="m-2 text-success">{item.pdesc}</p>
              </div>
            )
          })}
      </div>}
    </div>
  );
}
export default CategoryPage;    
