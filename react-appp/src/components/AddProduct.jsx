import { useEffect, useState } from 'react';
import Header from './Header';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
function AddProduct() {

    const navigate = useNavigate();
    const [pname, setpname] = useState('');
    const [pdesc, setpdesc] = useState('');
    const [price, setprize] = useState('');
    const [category, setcategory] = useState('');
    const [pimg, setpimg] = useState('');

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login')
        }
    }, []);

    const handleApi = () => {

        const fromData = new FormData();
        fromData.append('pname', pname)
        fromData.append('pdesc', pdesc)
        fromData.append('price', price)
        fromData.append('category', category)
        fromData.append('pimg', pimg)

        const url = 'http://localhost:4000/add-product';
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

    }
    return (
        <div>
            <Header />
            <div className='p-3'>

                <h2>ADD PRODUCT HERE :</h2>
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
                </select>
                <label> Product Image </label>
                <input className="form-control" type="file" onChange={(e) => { setpimg(e.target.files[0]) }} />
                <button onClick={handleApi} className="btn btn-primary mt-3"> Sumbit </button>
            </div>
        </div>
    );
}
export default AddProduct;    