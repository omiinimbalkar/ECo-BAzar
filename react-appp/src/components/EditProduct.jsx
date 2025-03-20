import { useEffect, useState } from 'react';
import Header from './Header';
import { useNavigate, Link, useParams } from 'react-router-dom';
import axios from 'axios';
import categories from './CategoriesList';
import API_URL from '../constants';
function EditProduct() {

    const p = useParams();
    const navigate = useNavigate();
    const [pname, setpname] = useState('');
    const [pdesc, setpdesc] = useState('');
    const [price, setprize] = useState('');
    const [category, setcategory] = useState('');
    const [pimg, setpimg] = useState('');
    const [pimg2, setpimg2] = useState('');
    const [poldpimg, setpoldpimg] = useState('');
    const [poldpimg2, setpoldpimg2] = useState('');

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login')
        }
    }, []);

    useEffect(() => {
        const url = API_URL + "/get-product/" + p.productId;
        axios.get(url)
            .then((res) => {
                if (res.data.product) {
                    console.log(res.data.product)
                    let product = res.data.product;
                    setpname(product.pname)
                    setpdesc(product.pdesc)
                    setprize(product.price)
                    setcategory(product.category)
                    setpoldpimg(product.pimg)
                    setpoldpimg2(product.pimg2)

                }
            })
            .catch((err) => {
                alert("server error")
            });
    }, []);

    const handleApi = () => {

        navigator.geolocation.getCurrentPosition((position) => {
            const fromData = new FormData();

            fromData.append('pid', p.productId)
            fromData.append('pname', pname)
            fromData.append('pdesc', pdesc)
            fromData.append('price', price)
            fromData.append('category', category)
            fromData.append('pimg', pimg)
            fromData.append('pimg2', pimg2)
            fromData.append('userId', localStorage.getItem('userId'))

            const url = API_URL + '/edit-product';
            axios.post(url, fromData)
                .then((res) => {
                    console.log(res)
                    if (res.data.message) {
                        alert(res.data.message)
                        navigate('/my-products')
                    }
                })
                .catch((err) => {
                    alert('Server Error')
                })
        })
    }
    return (
        <div>
            <Header />
            <div className='p-3'>

                <h2>EDIT PRODUCT HERE :</h2>
                <label> Product Name</label>
                <input className="form-control" type="text" value={pname} onChange={(e) => { setpname(e.target.value) }} />
                <label> Product Description </label>
                <input className="form-control" type="text" value={pdesc} onChange={(e) => { setpdesc(e.target.value) }} />
                <label> Product Prize </label>
                <input className="form-control" type="text" value={price} onChange={(e) => { setprize(e.target.value) }} />
                <label> Product Category </label>
                <input className="form-control" type="text" value={category} onChange={(e) => { setcategory(e.target.value) }} />
                <select className="form-control" value={category} onChange={(e) => { setcategory(e.target.value) }}>
                    <option> Book</option>
                    <option> Newspaper </option>
                    <option> Bottle </option>
                    <option> Bucket</option>
                    <option> Clothes </option>
                    {
                        categories && categories.length > 0 &&
                        categories.map((item, index) => {
                            return (
                                <option key={'option' + index} > {item} </option>
                            )
                        })
                    }
                </select>

                <label> Product Image </label>
                <input style={{ width: '50%' }} className="form-control" type="file"
                    onChange={(e) => {
                        setpimg(e.target.files[0])
                    }} />
                <img src={API_URL + '/' + poldpimg} width={100} height={100} />
                <br /> <br />

                <label> Product Second Image </label>
                <input style={{ width: '50%' }} className="form-control" type="file"
                    onChange={(e) => {
                        setpimg2(e.target.files[0])
                    }} />
                    <img src={API_URL + '/' + poldpimg2} width={100} height={100} />
                <br /> <br />

                <button onClick={handleApi} className="btn btn-primary mt-3"> Sumbit </button>
            </div>
        </div>
    );
}
export default EditProduct;    