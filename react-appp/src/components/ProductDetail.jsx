// import { data, useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import Header from './Header';
// import API_URL from "../constants";
// import io from 'socket.io-client';

// let socket;
// function ProductDetail() {

//     const [product, setproduct] = useState();
//     const [msg, setmsg] = useState('');
//     const [msgs, setmsgs] = useState([]);
//     const [user, setuser] = useState();

//     console.log(user, "userrrrrrrr")
//     const p = useParams()

//     // for server ig
//     useEffect(() => {
//         socket = io(API_URL)

//         socket.on('connect', () => {
//             console.log('connected')
//         })
//     }, [])

//     useEffect(() => {

//         socket.emit('getMsgs', {})

//         socket.on('getMsg', (data) => {
//             // if (product && product._id) {

//             const _data = data.filter((item, index) => {
//                 return item.productId == p.productId
//             })
//             console.log(_data, "_data")
//             setmsgs(_data)
//             // }

//         })

//     }, [p.productId])

//     const handleSend = () => {

//         const data = { username: localStorage.getItem('userName'), msg, productId: localStorage.getItem('productId') }
//         console.log(data, "data send")
//         socket.emit('sendMsg', data)
//         setmsgs('')
//     }

//     useEffect(() => {
//         const url = API_URL + "/get-product/" + p.productId;
//         axios.get(url)
//             .then((res) => {
//                 if (res.data.product) {
//                     setproduct(res.data.product)
//                     localStorage.setItem('productId', res.data.product._id)
//                 }
//             })
//             .catch((err) => {
//                 alert("server error")
//             });
//     }, []);
//     const handleContact = (addedBy) => {
//         console.log('id', addedBy)
//         const url = API_URL + "/get-user/" + addedBy;
//         axios.get(url)
//             .then((res) => {
//                 if (res.data.user) {
//                     setuser(res.data.user)
//                 }
//             })
//             .catch((err) => {
//                 alert("server error")
//             });
//     }
//     return (
//         <>
//             <Header />
//             <div>
//                 PRODUCT DETAILS :
//                 {product && <div className="d-flex justify-content-between flex-wrap">
//                     <div>
//                         <img width="400px" height="200px" src={API_URL + '/' + product.pimg} alt="" />
//                         {product.pimg2 && <img width="400px" height="200px" src={API_URL + product.pimg2} alt="" />}
//                         <h6>PRODUCT DETAIL:</h6>{product.pdesc}

//                         <p className="m-2 price-text"> Rs.{product.price} /-</p>
//                         <p className='m-2 '>{product.pname} | {product.category} </p>
//                         <p className="m-2 text-success">{product.pdesc}</p>

//                         {product.addedBy &&
//                             <button onClick={() => handleContact(product.addedBy)}>
//                                 SHOW CONTACT DETAILS
//                             </button>}
//                         {user && user.username && <h4>{user.username}</h4>}
//                         {user && user.email && <h3>{user.email}</h3>}
//                         {user && user.mobile && <h6>{user.mobile}</h6>}
//                     </div>
//                     <div>
//                         CHATs
//                         {
//                             msgs && msgs.length > 0 && msgs.map((item, index) => {
//                                 if (item.username === localStorage.getItem('userName')) {
//                                     return (
//                                         <p key={item._id} style={{ color: "white", marginRight: '100px', background: '#61dafb', borderRadius: '5px' }}>
//                                             {item.username} : {item.msg}</p>
//                                     );
//                                 }
//                                 if (item.username !== localStorage.getItem('userName')) {
//                                     return (
//                                         <p key={item._id} style={{ color: "white", marginLeft: '100px', background: '#282c34', borderRadius: '5px' }}>
//                                             {item.username} : {item.msg}</p>
//                                     );
//                                 }

//                             })
//                         }
//                         <input value={msg} onChange={(e) => setmsg(e.target.value)} className="form-control" type="text" />
//                         <button onClick={handleSend} className="btn btn-primary">SEND</button>
//                     </div>
//                 </div>}
//             </div >
//             </>
//     )
// }

// export default ProductDetail;
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from './Header';
import API_URL from "../constants";
import io from 'socket.io-client';
import { Carousel, Button, Container, Row, Col, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

let socket;

function ProductDetail() {
    const [product, setProduct] = useState(null);
    const [msg, setMsg] = useState('');
    const [msgs, setMsgs] = useState([]);
    const [user, setUser] = useState(null);
    const { productId } = useParams();
    const [showContact, setShowContact] = useState(false);

    useEffect(() => {
        socket = io(API_URL);
        socket.on('connect', () => console.log('Connected to socket'));
    }, []);

    useEffect(() => {
        socket.emit('getMsgs', {});
        socket.on('getMsg', (data) => {
            const filteredMsgs = data.filter(msg => msg.productId === productId);
            setMsgs(filteredMsgs);
        });
    }, [productId]);

    useEffect(() => {
        axios.get(`${API_URL}/get-product/${productId}`)
            .then(res => {
                if (res.data.product) {
                    setProduct(res.data.product);
                    localStorage.setItem('productId', res.data.product._id);
                }
            })
            .catch(() => alert("Server error"));
    }, [productId]);

    const handleSend = () => {
        const data = { username: localStorage.getItem('userName'), msg, productId };
        socket.emit('sendMsg', data);
        setMsg('');
    };

    const handleContact = (addedBy) => {
        if (!showContact) {  // Fetch data only if not already visible
            axios.get(`${API_URL}/get-user/${addedBy}`)
                .then(res => {
                    if (res.data.user) setUser(res.data.user);
                })
                .catch(() => alert("Server error"));
        }
        setShowContact(!showContact); // Toggle visibility
    };


    return (
        <>
            <Header />
            <Container className="mt-4">
                {product ? (
                    <Row>
                        <Col md={6}>
                            <Carousel>
                                <Carousel.Item>
                                    <img className="d-block w-100" src={`${API_URL}/${product.pimg}`} alt="Product" />
                                </Carousel.Item>
                                {product.pimg2 && (
                                    <Carousel.Item>
                                        <img className="d-block w-100" src={`${API_URL}/${product.pimg2}`} alt="Product" />
                                    </Carousel.Item>
                                )}
                            </Carousel>
                            <h5 className="mt-3">{product.pname} | {product.category}</h5>
                            <p className="text-success">{product.pdesc}</p>
                            <h4 className="text-danger">Rs. {product.price} /-</h4>


                            {/* conntact */}
                            {product.addedBy && (
                                <>
                                    <Button
                                        className="mt-2 btn btn-primary"
                                        onClick={() => handleContact(product.addedBy)}
                                    >
                                        {showContact ? "Hide Contact Details" : "📞 Show Contact Details"}
                                    </Button>

                                    {showContact && user && ( // Show details only if user data is fetched
                                        <div className="mt-3 p-3 border rounded bg-light shadow-sm">
                                            <h5 className="text-primary">Seller: {user.username || "Not Available"}</h5>
                                            <p><strong>Email:</strong> {user.email || "Not Available"}</p>
                                            <p><strong>Mobile:</strong> {user.mobile || "Not Available"}</p>
                                        </div>
                                    )}
                                </>
                            )}

                        </Col>
                        <Col md={6}>
                            <h5>Chat</h5>
                            <div className="border p-3 mb-3" style={{ height: "300px", overflowY: "scroll", borderRadius: "5px" }}>
                                {msgs.map((item, index) => (
                                    <p key={index} className={`p-2 rounded ${item.username === localStorage.getItem('userName') ? 'bg-info text-white' : 'bg-dark text-white'}`}>{item.username}: {item.msg}</p>
                                ))}
                            </div>
                            <Form className="d-flex">
                                <Form.Control
                                    value={msg}
                                    onChange={(e) => setMsg(e.target.value)}
                                    type="text"
                                    placeholder="Type a message..."
                                />
                                <Button onClick={handleSend} variant="success" className="ms-2">Send</Button>
                            </Form>
                        </Col>
                    </Row>
                ) : <p>Loading product details...</p>}
            </Container>
        </>
    );
}

export default ProductDetail;