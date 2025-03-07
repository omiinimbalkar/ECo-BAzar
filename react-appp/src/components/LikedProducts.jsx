import { useEffect, useState } from 'react';
import Header from './Header';
import Categories from './Categories';
import { useNavigate, Link, data } from 'react-router-dom';
import axios from 'axios';
import { FaHeart } from 'react-icons/fa';
import './Home.css'
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
        const url = "http://localhost:4000/liked-products";
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
        const url = "http://localhost:4000/liked-product";
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
            <Header search={search} handlesearch={handlesearch} handleClick={handleClick} />
            <Categories handleCategory={handleCategory} />

            <h5>SEARCH PRODUCTS : </h5>

            <div className='d-flex justify-content-center flex-wrap'>
                {cproducts && products.length > 0 &&
                    cproducts.map((item, index) => {
                        return (
                            <div key={item._id} className="card m-3" >
                                <div onClick={() => handleLike(item._id)} className="icons-conatiner">
                                    <FaHeart className='icons' />
                                </div>
                                <img width="500px" height="200px" src={'http://localhost:4000/' + item.pimg} />
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
                                <img width="500px" height="200px" src={'http://localhost:4000/' + item.pimg} />
                                <p className='m-2 '>{item.pname} | {item.category} </p>
                                <p className="m-2 text-danger">{item.price}</p>
                                <p className="m-2 text-success">{item.pdesc}</p>
                            </div>
                        )
                    })}
            </div>
        </div>
    );
}
export default LikedProducts;    
