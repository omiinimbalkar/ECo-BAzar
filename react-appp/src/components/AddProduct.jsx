import { useEffect, useState } from 'react';
import Header from './Header';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import categories from './CategoriesList';
import API_URL from '../constants';
import Footer from './Footer';
function AddProduct() {

    const navigate = useNavigate();
    const [pname, setpname] = useState('');
    const [pdesc, setpdesc] = useState('');
    const [price, setprize] = useState('');
    const [category, setcategory] = useState('');
    const [pimg, setpimg] = useState('');
    const [pimg2, setpimg2] = useState('');

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login')
        }
    }, []);

    const handleApi = () => {

        navigator.geolocation.getCurrentPosition((position) => {
            const fromData = new FormData();
            fromData.append('plat', position.coords.latitude)
            fromData.append('plog', position.coords.longitude)
            fromData.append('pname', pname)
            fromData.append('pdesc', pdesc)
            fromData.append('price', price)
            fromData.append('category', category)
            fromData.append('pimg', pimg)
            fromData.append('pimg2', pimg2)
            fromData.append('userId', localStorage.getItem('userId'))

            const url = API_URL + '/add-product';
            axios.post(url, fromData)
                .then((res) => {
                    console.log(res)
                    if (res.data.message) {
                        alert(res.data.message)
                        navigate('/')
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
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-lg p-4">
                        <h2 className="text-center mb-4">Add Product</h2>
                        <div className="mb-3">
                            <label className="form-label">Product Name</label>
                            <input
                                className="form-control"
                                type="text"
                                value={pname}
                                onChange={(e) => setpname(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Product Description</label>
                            <input
                                className="form-control"
                                type="text"
                                value={pdesc}
                                onChange={(e) => setpdesc(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Product Price</label>
                            <input
                                className="form-control"
                                type="text"
                                value={price}
                                onChange={(e) => setprize(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Product Category</label>
                            <select
                                className="form-select"
                                value={category}
                                onChange={(e) => setcategory(e.target.value)}
                            >
                                <option value="">Select Category</option>
                                <option>Book</option>
                                <option>Newspaper</option>
                                <option>Bottle</option>
                                <option>Bucket</option>
                                <option>Clothes</option>
                                {categories.map((item, index) => (
                                    <option key={index} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Product Image</label>
                            <input
                                className="form-control"
                                type="file"
                                onChange={(e) => setpimg(e.target.files[0])}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Product Second Image</label>
                            <input
                                className="form-control"
                                type="file"
                                onChange={(e) => setpimg2(e.target.files[0])}
                            />
                        </div>
                        <button onClick={handleApi} className="btn btn-primary w-100">
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
    );
}
export default AddProduct;    


