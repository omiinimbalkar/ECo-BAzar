import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from './Header';
function ProductDetail() {

    const [product, setproduct] = useState();
    const [user, setuser] = useState();
    console.log(user,"userrrrrrrr")
    const p = useParams()

    useEffect(() => {
        const url = "http://localhost:4000/get-product/" + p.productId;
        axios.get(url)
            .then((res) => {
                if (res.data.product) {
                    setproduct(res.data.product)
                }
            })
            .catch((err) => {
                alert("server error")
            });
    }, []);
    const handleContact = (addedBy) => {
        console.log('id', addedBy)
        const url = "http://localhost:4000/get-user/" + addedBy;
        axios.get(url)
            .then((res) => {
                if (res.data.user) {
                    setuser(res.data.user)
                }
            })
            .catch((err) => {
                alert("server error")
            });
    }
    return (
        <>
            <Header />
            <div>
                PRODUCT DETAILS :
                {product && <div className="d-flex justify-content-between flex-wrap">
                    <div>
                        <img width="400px" height="200px" src={'http://localhost:4000/' + product.pimg} alt="" />
                       { product.pimg2 && <img width="400px" height="200px" src={'http://localhost:4000/' + product.pimg2} alt="" />}
                        <h6>PRODUCT DETAIL:</h6>{product.pdesc}
                    </div>
                    <div>
                        <p className="m-2 price-text"> Rs.{product.price} /-</p>
                        <p className='m-2 '>{product.pname} | {product.category} </p>
                        <p className="m-2 text-success">{product.pdesc}</p>

                        {product.addedBy &&
                            <button onClick={() => handleContact(product.addedBy)}>
                                SHOW CONTACT DETAILS
                            </button>}
                            {user && user.username && <h4>{user.username}</h4>}
                            {user && user.email && <h3>{user.email}</h3>}
                            {user && user.mobile && <h6>{user.mobile}</h6>}
                    </div>
                </div>}
            </div >
        </>
    )
}

export default ProductDetail;