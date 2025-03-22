import { useEffect, useState } from 'react';
import Header from './Header';
import Categories from './Categories';
import { useNavigate, Link, data } from 'react-router-dom';
import axios from 'axios';
import { FaHeart } from 'react-icons/fa';
import './Home.css'
import API_URL from "../constants";

function MyProducts() {

    const navigate = useNavigate()

    //creating stae for products
    const [products, setproducts] = useState([]);
    const [cproducts, setcproducts] = useState([]);
    const [search, setsearch] = useState("");
    const [refresh, setrefresh] = useState(false);

    // for not acces home page without login thi useeffrct is used..
    // useEffect(() => {
    //   if (!localStorage.getItem('token')) {
    //     navigate('/login')
    //   }
    // }, [])
    useEffect(() => {
        const url = API_URL + "/my-products";
        let data = { userId: localStorage.getItem('userId') };
        axios.post(url, data)
            .then((res) => {
                if (res.data.products) {
                    setproducts(res.data.products);
                }
            })
            .catch((err) => {
                alert("server error")
            });
    }, [refresh]);

    const handlesearch = (value) => {
        setsearch(value);
    }
    const handleClick = () => {
        let filteredProducts = products.filter((item) => {
            if (item.pname.toLowerCase().includes(search.toLowerCase()) ||
                item.pdesc.toLowerCase().includes(search.toLowerCase()) ||
                item.category.toLowerCase().includes(search.toLowerCase())) {
                return item;
            }
        })
        setcproducts(filteredProducts)
    }

    const handleCategory = (value) => {
        let filteredProducts = products.filter((item, index) => {
            if (item.category == value) {
                return item;
            }
        })
        setcproducts(filteredProducts)
    }

    const handleLike = (productId) => {
        let userId = localStorage.getItem('userId');
        const url = API_URL + "/liked-product";
        const data = { userId, productId }
        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    alert('Liked')
                }
            })
            .catch((err) => {
                alert("server error")
            });

    }

    const handleDel = (pid) => {
        console.log(pid)
        if (!localStorage.getItem('userId')) {  // if user is not logged in
            alert('Please login to delete product')
            return;
        }
        const url = API_URL + "/delete-product";
        const data = {
            pid,
            userId: localStorage.getItem('userId')
        }
        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    alert('Product Deleted')
                    setrefresh(!refresh)    // to refresh the page
                }
            })
            .catch((err) => {
                alert("server error")
            });

    }
    return (
        <div>
        <Header search={search} handlesearch={handlesearch} handleClick={handleClick} />
        <Categories handleCategory={handleCategory} />

        {/* Filtered Products */}
        <div className="container mt-4">
            <h4 className="mb-3 text-primary">  Filtered Products 🛍️  </h4>
            <div className="row justify-content-center">
                {cproducts && products.length > 0 &&
                    cproducts.map((item) => (
                        <div key={item._id} className="col-md-4 mb-4">
                            <div className="card shadow-sm border-0 position-relative h-100 d-flex flex-column">
                                <div className="position-absolute top-0 end-0 m-2 p-2 bg-light rounded-circle" onClick={() => handleLike(item._id)}>
                                    <FaHeart className="text-danger" />
                                </div>
                                <img className="card-img-top" src={API_URL + item.pimg } alt={item.pname} style={{ height: "200px" }} />
                                <div className="card-body text-center d-flex flex-column flex-grow-1">
                                    <h5 className="card-title">{item.pname} | {item.category}</h5>
                                    <p className="text-danger fw-bold">${item.price}</p>
                                    <p className="text-muted">{item.pdesc}</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>

        {/* All Products */}
        <div className="container mt-4">
            <h4 className=" text-success">All Products 📦  </h4>
            <div className="row justify-content-center">
                {products && products.length > 0 &&
                    products.map((item) => (
                        <div key={item._id} className="col-md-4 mb-4">
                            <div className="card shadow-sm border-0 position-relative h-100 d-flex flex-column">
                                <div className="position-absolute top-0 end-0 m-2 p-2 bg-light rounded-circle" onClick={() => handleLike(item._id)}>
                                    <FaHeart className="text-danger" />
                                </div>
                                <img className=" card-img-top" src={API_URL + "/" + item.pimg} alt={item.pname} style={{ height: "200px"}} />
                                <div className="card-body text-center d-flex flex-column flex-grow-1">
                                    <h5 className="card-title">{item.pname} | {item.category}</h5>
                                    <p className="text-danger fw-bold">${item.price}</p>
                                    <p className="text-muted">{item.pdesc}</p>
                                    <div className="mt-auto d-flex justify-content-between">
                                        <Link to={`/edit-product/${item._id}`} className="btn btn-warning" >Edit 📝 </Link>
                                        <button onClick={() => handleDel(item._id)} className="btn btn-danger">Delete 🗑️ </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
    );
}
export default MyProducts;    
