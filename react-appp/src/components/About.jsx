import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Eco from "../img/EcoBanner.jpg";
import Money from "../img/money.png";
import Person from "../img/personal.png";
import "./About.css"
import Team from "../img/team.png";
import Dev1 from "../img/dev1.jpg";
import Dev2 from "../img/dev2.jpg";
import Dev3 from "../img/dev3.jpg";
import Dev4 from "../img/dev4.jpg";
import insta from "../img/instagram.png"
import twit from "../img/twitter.png"
// import face from './img/facebook (1).png'
import Header from "./Header";


const About = () => {
    return (
        <>
            <Header />
            <div className="text-center mt-2 mb-5">
                {/* Eco-Bazar Banner */}
                <div className="position-relative">
                    <img
                        src={Eco}
                        alt="Eco-Bazar Banner"
                        className="img-fluid rounded shadow w-100 fade-in"
                        style={{ height: "600px", objectFit: "cover" }}
                    />
                </div>

                {/* About Section */}
                <div className="container mt-5 fade-in">
                    <h1 className="mb-4 text-success fw-bold">About Eco-Bazar</h1>
                    <p className="lead text-muted">
                        Eco-Bazar is an online marketplace promoting sustainability by enabling
                        users to sell second-hand and recyclable products easily.
                    </p>
                </div>

                {/* How It Works Section */}
                <div className="container mt-5 fade-in">
                    <h2 className="text-primary text-center fw-bold">How It Works?</h2>
                    <div className="row mt-4">
                        {[
                            { img: Person, title: "Sell Products", text: "List your used or recyclable items for sale." },
                            { img: Money, title: "Secure Transactions", text: "Complete payments securely at pickup time." },
                            { img: Team, title: "Chat with Sellers", text: "Communicate directly with sellers before buying." }
                        ].map((item, index) => (
                            <div key={index} className="col-md-4">
                                <div className="card border-0 shadow-lg text-center p-4 rounded-4 hover-scale">
                                    <img src={item.img} className="mb-3 rounded-circle mx-auto"
                                        style={{ width: "70px", height: "70px", objectFit: "cover" }} alt={item.title} />
                                    <h5 className="fw-bold">{item.title}</h5>
                                    <p className="text-muted">{item.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Why Choose Us Section */}
                <div className="container mt-5 fade-in">
                    <h2 className="text-success text-center fw-bold">Why Choose Eco-Bazar?</h2>
                    <div className="row mt-4">
                        {[
                            { title: "Eco-Friendly", text: "Encourages recycling and reduces waste." },
                            { title: "Affordable", text: "Buy quality used items at lower costs." },
                            { title: "User-Friendly", text: "Simple and intuitive platform." },
                            { title: "Secure", text: "Safe payments and direct communication with sellers." }
                        ].map((item, index) => (
                            <div key={index} className="col-md-6 mt-3">
                                <div className="card border-0 shadow-lg p-4 rounded-4 hover-scale">
                                    <h5 className="fw-bold">{item.title}</h5>
                                    <p className="text-muted">{item.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Meet Our Team Section */}
                <div className="container mt-5 fade-in">
                    <h2 className="text-center fw-bold">Meet Our Team</h2>
                    <p className="text-muted text-center">The dedicated minds behind Eco-Bazar.</p>

                    <div className="row mt-4 d-flex justify-content-center">
                        {[Dev1, Dev2, Dev3, Dev4].map((img, index) => {
                            const teamMembers = ["Om Nimbalkar", "Rutik Patil", "Sakshi Shelar", "Bhakti Sankhe"];
                            const roles = ["Developer", "Developer", "Developer", "Developer"];
                            return (
                                <div key={index} className="col-md-3">
                                    <div className="card border-0 shadow-lg text-center p-3 rounded-4 team-card hover-scale">
                                        <img src={img} className="rounded-circle mx-auto mb-3"
                                            style={{ width: "120px", height: "120px", objectFit: "cover" }} alt={teamMembers[index]} />
                                        <h5 className="fw-bold">{teamMembers[index]}</h5>
                                        <p className="text-muted">{roles[index]}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="container mt-5 text-center">
                    <div className="col-md-6 mx-auto">
                        <div className="card shadow p-4">
                            <h4 className="text-success">Eco-Bazar Support</h4>

                            <h5>Email:</h5>
                            <p>
                                <a href="mailto:support@eco-bazar.com" className="text-decoration-none text-dark">
                                    support@eco-bazar.com
                                </a>
                            </p>

                            <h5>Phone:</h5>
                            <p>+91 98765 43210</p>

                            <h5>Address:</h5>
                            <p>Eco-Bazar, Green Street, Virar | Palghar, India</p>

                            {/* <h5>Follow Us:</h5> */}
                            {/* <div className="d-flex justify-content-center">
                                <a href="#" className="me-3 text-primary fs-4"><i className="bi bi-facebook"></i><img src={face} alt="face" /> </a>
                                <a href="#" className="me-3 text-info fs-4"><i className="bi bi-twitter"><img src={twit} alt="twitee" /> </i></a>
                                <a href="#" className="me-3 text-danger fs-4"><i className="bi bi-instagram"><img src={insta} alt="insta" /> </i></a>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default About;
