import { useEffect, useState } from 'react';
import Header from './Header';
import Categories from './Categories';
import { useNavigate, Link, data } from 'react-router-dom';
import axios from 'axios';
import { FaHeart } from 'react-icons/fa';
import './Home.css'
import API_URL from "../constants";

function LikedProducts() {

    const navigate = useNavigate()

    //creating stae for products
    const [products, setproducts] = useState([]);
    const [cproducts, setcproducts] = useState([]);
    const [search, setsearch] = useState("");

    // for not acces home page without login thi useeffrct is used..
    // useEffect(() => {
    //   if (!localStorage.getItem('token')) {
    //     navigate('/login')
    //   }
    // }, [])
    useEffect(() => {
        const url =  API_URL + "/liked-products";
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
    }, []);

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
        const url =  API_URL + "/liked-product";
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

    return (
        <div>
            {/* Header & Categories */}
            <Header search={search} handlesearch={handlesearch} handleClick={handleClick} />
            <Categories handleCategory={handleCategory} />

            {/* Search Results */}
            <h5 className="text-center mt-4 mb-4">🔍 Search Results</h5>
            <div className="row justify-content-center">
                {cproducts && products.length > 0 ? (
                    cproducts.map((item) => (
                        <div key={item._id} className="col-md-4 col-sm-6 mb-4">
                            <div className="card shadow-sm border-0 rounded">
                                <div className="position-relative">
                                    {/* Heart Icon */}
                                    <FaHeart 
                                        className="position-absolute top-0 end-0 m-2 text-danger cursor-pointer" 
                                        onClick={() => handleLike(item._id)} 
                                        style={{ fontSize: "1.5rem" }} 
                                    />
                                    {/* Product Image */}
                                    <img 
                                        src={`${API_URL}/${item.pimg}`} 
                                        className="card-img-top rounded-top"
                                        style={{ height: "200px", objectFit: "cover" }} 
                                        alt="Product" 
                                    />
                                </div>
                                <div className="card-body text-center">
                                    <h6 className="fw-bold">{item.pname} | {item.category}</h6>
                                    <p className="text-danger fw-bold">₹{item.price}</p>
                                    <p className="text-success small">{item.pdesc}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-muted">No products found.</p>
                )}
            </div>

            {/* All Products */}
            <h5 className="text-center mt-4 mb-3">📦 All Products</h5>
            <div className="row justify-content-center">
                {products && products.length > 0 ? (
                    products.map((item) => (
                        <div key={item._id} className="col-md-4 col-sm-6 mb-4">
                            <div className="card shadow-sm border-0 rounded">
                                <div className="position-relative">
                                    {/* Heart Icon */}
                                    <FaHeart 
                                        className="position-absolute top-0 end-0 m-2 text-danger cursor-pointer" 
                                        onClick={() => handleLike(item._id)} 
                                        style={{ fontSize: "1.5rem" }} 
                                    />
                                    {/* Product Image */}
                                    <img 
                                        src={`${API_URL}/${item.pimg}`} 
                                        className="card-img-top rounded-top"
                                        style={{ height: "200px", objectFit: "cover" }} 
                                        alt="Product" 
                                    />
                                </div>
                                <div className="card-body text-center">
                                    <h6 className="fw-bold">{item.pname} | {item.category}</h6>
                                    <p className="text-danger fw-bold">₹{item.price}</p>
                                    <p className="text-success small">{item.pdesc}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-muted">No products found.</p>
                )}
            </div>
        </div>
    );
}
export default LikedProducts;    
