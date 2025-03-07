import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
function ProductDetail() {
    const p = useParams()
    console.log(p.productId)

    useEffect(() => {
        const url = "http://localhost:4000/get-product" + p.productId;
        axios
            .get(url)
            .then((res) => {
               console.log(res)
            })
            .catch((err) => {
                alert("server error")
            });
    }, []);

    return (
        <div>
            omomokomm
        </div>
    )
}

export default ProductDetail;