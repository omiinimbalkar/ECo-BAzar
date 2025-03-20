import { data, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from './Header';
import API_URL from "../constants";
import io from 'socket.io-client';

let socket;
function ProductDetail() {

    const [product, setproduct] = useState();
    const [msg, setmsg] = useState('');
    const [msgs, setmsgs] = useState([]);
    const [user, setuser] = useState();
    console.log(user, "userrrrrrrr")
    const p = useParams()

    // for server ig
    useEffect(() => {
        socket = io(API_URL)

        socket.on('connect', () => {
            console.log('connected')
        })

        socket.on('getMsg', (data) => {
            console.log(data, "data")
            if(product && product._id){
                const _data = data.filter((item,index) => {
                    console.log(item,product)
                    return item.productId === product._id
                })
                setmsgs(_data)
            }
            
        })

    }, [])

    const handleSend = () => {

        const data = { username: localStorage.getItem('userName'), msg , productId: product._id}
        socket.emit('sendMsg', data)
        setmsgs('')
    }

    useEffect(() => {
        const url = API_URL + "/get-product/" + p.productId;
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
        const url = API_URL + "/get-user/" + addedBy;
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
                        <img width="400px" height="200px" src={API_URL + '/' + product.pimg} alt="" />
                        {product.pimg2 && <img width="400px" height="200px" src={API_URL + product.pimg2} alt="" />}
                        <h6>PRODUCT DETAIL:</h6>{product.pdesc}

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
                    <div>
                        CHATs
                        {
                            msgs && msgs.length > 0 && msgs.map((item, index) => {
                                if (item.username === localStorage.getItem('userName')) {
                                    return (
                                        <p style={{ color:"white", marginRight: '100px', background: '#61dafb' , borderRadius: '5px' }}>
                                            {item.username} : {item.msg}</p>
                                    );
                                }
                                if (item.username !== localStorage.getItem('userName')) {
                                    return (
                                        <p style={{ color:"white", marginLeft: '100px', background: '#282c34' , borderRadius: '5px' }}>
                                            {item.username} : {item.msg}</p>
                                    );
                                }
                                
                            })
                        }
                        <input value={msg} onChange={(e) => setmsg(e.target.value)} className="form-control" type="text" />
                        <button onClick={handleSend} className="btn btn-primary">SEND</button>
                    </div>
                </div>}
            </div >
        </>
    )
}

export default ProductDetail;