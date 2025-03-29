import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from './Header';
import Footer from './Footer';
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

        // 📌 Send a notification when a user sends a message
        axios.post(API_URL + '/add-notification', {
            userId: product.addedBy,  // The owner of the product
            message: `${localStorage.getItem('userName')} sent you a message on your product: ${product.pname}`,
            productId: productId
        });
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
                            <p className="text-success">{product.address}</p>


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
                                            <p><strong>Email :</strong> {user.email || "Not Available"}</p>
                                            <p><strong>Mobile :</strong> {user.mobile || "Not Available"}</p>
                                            <p><strong>Address : </strong> {product.address || "Not Available"}</p>
                                        </div>
                                    )}
                                </>
                            )}

                        </Col>
                        <Col md={6}>
                            <h5>Chat</h5>
                            <div className="border p-3 mb-3" style={{ height: "300px", overflowY: "scroll", borderRadius: "5px" }}>
                                {msgs.map((item, index) => (
                                    <p
                                        key={index}
                                        className={`p-2 rounded ${item.username === localStorage.getItem('userName') ? 'bg-info text-white' : 'bg-dark text-white'}`}
                                    >
                                        {item.username}: {item.msg}
                                    </p>
                                ))}
                            </div>
                            <Form
                                className="d-flex"
                                onSubmit={(e) => {
                                    e.preventDefault(); // Prevent form default submission
                                    if (msg.trim()) handleSend();
                                }}
                            >
                                <Form.Control
                                    value={msg}
                                    onChange={(e) => setMsg(e.target.value)}
                                    type="text"
                                    placeholder="Type a message..."
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" && msg.trim()) {
                                            e.preventDefault(); // Prevent new line
                                            handleSend();
                                        }
                                    }}
                                />
                                <Button
                                    onClick={() => msg.trim() && handleSend()}
                                    variant="success"
                                    className="ms-2"
                                >
                                    Send
                                </Button>
                            </Form>
                        </Col>

                    </Row>
                ) : <p>Loading product details...</p>}
            </Container>
            <Footer />
        </>
    );
}

export default ProductDetail;