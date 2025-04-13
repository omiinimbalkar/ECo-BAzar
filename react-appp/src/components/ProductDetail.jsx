import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import API_URL from "../constants";
import io from "socket.io-client";
import { Carousel, Button, Container, Row, Col, Form, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

let socket;

function ProductDetail() {
    const { productId } = useParams();  // Get product ID from URL
    const [product, setProduct] = useState(null);
    const [msg, setMsg] = useState("");
    const [msgs, setMsgs] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showContact, setShowContact] = useState(false);
    const chatBoxRef = useRef(null);

    // 🔵 Initialize Socket.io (Runs Once)
    useEffect(() => {
        if (!socket) {
            socket = io(API_URL);
            socket.on("connect", () => console.log("✅ Connected to Socket"));
        }
        return () => socket.disconnect();  // Cleanup on component unmount
    }, []);

    // 🟡 Fetch Product Details
    useEffect(() => {
        axios.get(`${API_URL}/get-product/${productId}`)
            .then(res => {
                if (res.data.product) {
                    setProduct(res.data.product);
                    localStorage.setItem("productId", res.data.product._id);
                }
            })
            .catch(() => alert("⚠️ Server Error"))
            .finally(() => setLoading(false));
    }, [productId]);

    // 🟡 Fetch Chat Messages
    useEffect(() => {
        socket.emit("getMsgs", {});  // Request chat messages from server
        socket.on("getMsg", (data) => {
            const filteredMsgs = data.filter(msg => msg.productId === productId);
            setMsgs(filteredMsgs);
            scrollToBottom();  // Scroll chat to latest message
        });
    }, [productId]);

    // 🔽 Scroll to Bottom (Chat auto-scrolls when new messages arrive)
    const scrollToBottom = () => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    };

    // 🔴 Send Message (Emits to Socket + Sends Notification)
    const handleSend = (e) => {
        let userId = localStorage.getItem('userId');
        e.stopPropagation();

        if (!userId) {
            alert("Please Login First!! ")
            return;
        }

        if (msg.trim() === "") return;

        const data = {
            username: localStorage.getItem("userName"),
            msg,
            productId
        };

        socket.emit("sendMsg", data);  // Send message to server
        setMsg("");

        // 📩 Notify Product Owner
        axios.post(API_URL + "/add-notification", {
            userId: product?.addedBy,  // Ensure it’s not undefined
            message: `${localStorage.getItem("userName")} sent you a message on your product: ${product?.pname}`,
            productId: productId
        }).catch(err => console.error("❌ Error sending notification:", err));
    };

    // 🟠 Fetch Seller Contact Details
    const handleContact = (addedBy) => {
        if (!showContact) {
            axios.get(`${API_URL}/get-user/${addedBy}`)
                .then(res => {
                    if (res.data.user) setUser(res.data.user);
                })
                .catch(() => alert("⚠️ Server Error"));
        }
        setShowContact(!showContact);  // Toggle visibility
    };

    return (
        <>
            <Header />
            <Container className="mt-4">
                {/* 🔵 Show Loading Spinner While Fetching Data */}
                {loading ? (
                    <div className="text-center">
                        <Spinner animation="border" variant="primary" />
                        <p>Loading product details...</p>
                    </div>
                ) : product ? (
                    <Row>
                        {/* 🔹 Product Images & Information */}
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
                            <h5 className="text-danger">Rs. {product.price} /-</h5>
                            <h5 className="text-warning">Date {product.date}</h5>
                            <p className="text-muted">{product.address}</p>

                            {/* 🔹 Seller Contact Details */}
                            {product.addedBy && (
                                <>
                                    <Button
                                        className="mt-2 btn btn-primary"
                                        onClick={() => handleContact(product.addedBy)}
                                    >
                                        {showContact ? "Hide Contact Details" : "📞 Show Contact Details"}
                                    </Button>

                                    {showContact && user && (
                                        <div className="mt-3 p-3 border rounded bg-light shadow-sm">
                                            <h5 className="text-primary">Seller: {user.username || "Not Available"}</h5>
                                            <p><strong>Email:</strong> {user.email || "Not Available"}</p>
                                            <p><strong>Mobile:</strong> {user.mobile || "Not Available"}</p>
                                            <p><strong>Address:</strong> {product.address || "Not Available"}</p>
                                        </div>
                                    )}
                                </>
                            )}
                        </Col>

                        {/* 🔹 Chat Section */}
                        <Col md={6}>
                            <h5>Chat</h5>
                            <div
                                ref={chatBoxRef}
                                className="border p-3 mb-3"
                                style={{ height: "300px", overflowY: "auto", borderRadius: "5px", background: "#f8f9fa" }}
                            >
                                {/* 🔹 Chat Messages */}
                                {msgs.length > 0 ? (
                                    msgs.map((item, index) => (
                                        <p
                                            key={index}
                                            className={`p-2 rounded mt-1 ${item.username === localStorage.getItem("userName")
                                                ? "bg-primary text-white text-end"
                                                : "bg-secondary text-white"
                                                }`}
                                            style={{ maxWidth: "70%", marginLeft: item.username === localStorage.getItem("userName") ? "auto" : "0" }}
                                        >
                                            <strong>{item.username}:</strong> {item.msg}
                                        </p>
                                    ))
                                ) : (
                                    <p className="text-muted text-center">No messages yet. Start chatting!</p>
                                )}
                            </div>

                            {/* 🔹 Chat Input */}
                            <Form
                                className="d-flex"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    if (msg.trim()) handleSend();
                                }}
                            >
                                <Form.Control
                                    value={msg}
                                    onChange={(e) => setMsg(e.target.value)}
                                    type="text"
                                    placeholder="Type a message..."
                                    
                                />
                                <Button
                                    onClick={(e) => msg.trim() && handleSend(e)}
                                    variant="success"
                                    className="ms-2"
                                >
                                    Send
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                ) : (
                    <p className="text-center text-danger">Product not found.</p>
                )}
            </Container>
            <Footer />
        </>
    );
}

export default ProductDetail;
