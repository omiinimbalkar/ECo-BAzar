import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from './Header';
function ProductDetail() {

    const [product, setproduct] = useState()

    const p = useParams()
    console.log(p.productId)

    useEffect(() => {
        const url = "http://localhost:4000/get-product/" + p.productId;
        axios
            .get(url)
            .then((res) => {
                if (res.data.product) {
                    setproduct(res.data.product)
                }
            })
            .catch((err) => {
                alert("server error")
            });
    }, []);

    return (
        <div>
            <Header />
            PRODUCT DETAILS : 
            {product && product.pname}

            {product && <div>
                <div>
                    <img src={ 'http://localhost/4000/'+ product.pimage } alt="" />
                </div>
                <div>

                </div>
            </div>}                   












        </div>

    )
}

export default ProductDetail;