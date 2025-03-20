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


            <div className='d-flex justify-content-center flex-wrap'>
                {cproducts && products.length > 0 &&
                    cproducts.map((item, index) => {
                        return (
                            <div key={item._id} className="card m-3" >
                                <div onClick={() => handleLike(item._id)} className="icons-conatiner">
                                    <FaHeart className='icons' />
                                </div>
                                <img width="500px" height="200px" src={API_URL + item.pimg} />
                                <p className='m-2 '>{item.pname} | {item.category} </p>
                                <p className="m-2 text-danger">{item.price}</p>
                                <p className="m-2 text-success">{item.pdesc}</p>
                            </div>
                        )
                    })}
            </div>
            <h5>ALL RESULTS : </h5>

            <div className='d-flex justify-content-center flex-wrap'>
                {products && products.length > 0 &&
                    products.map((item, index) => {
                        return (
                            <div key={item._id} className="card m-3" >
                                <div onClick={() => handleLike(item._id)} className="icons-conatiner">
                                    <FaHeart className='icons' />
                                </div>
                                <img width="500px" height="200px" src={API_URL + '/' + item.pimg} />
                                <p className='m-2 '>{item.pname} | {item.category} </p>
                                <p className="m-2 text-danger">{item.price}</p>
                                <p className="m-2 text-success">{item.pdesc}</p>
                                <p className="m-2 text-success">
                                <Link to = {`/edit-product/${item._id}`}> EDIT PRODUCT </Link>
                                </p>
                                <button onClick={() => handleDel(item._id)}> DELETE PRODUCT  </button>
                            </div>
                        )
                    })}
            </div>
        </div>
    );
}
export default MyProducts;    
