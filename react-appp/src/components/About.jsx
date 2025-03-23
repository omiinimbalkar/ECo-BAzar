import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Eco from "../img/EcoBanner.jpg";  // Import the EcoBanner image
import Money from "../img/money.png";  // Import the money image
import Person from "../img/personal.png";  // Import the person image
import Team from "../img/team.png";  // Import the person image

const About = () => {
    return (
        <div className="text-center mb-5">
            <img
                src={Eco}
                alt="Eco-Bazar Banner"
                className="img-fluid rounded shadow-sm w-100"
                style={{ height: "400px", }}
            />
            <div className="container mt-5">
            </div>

            <div className="text-center">
                <h1 className="mb-4 text-success">About Eco-Bazar</h1>
                <p className="lead text-muted">
                    Eco-Bazar is an online marketplace that promotes sustainability by enabling
                    users to sell second-hand and recyclable products easily.
                </p>
            </div>

            <div className="mt-5">
                <h2 className="text-primary text-center">How It Works?</h2>
                <div className="row mt-4">

                    <div className="col-md-4 text-center">
                        <img src={Person} className="mb-2 rounded shadow-sm"
                            style={{ width: "60px", height: "60px", objectFit: "cover" }} alt="Sell" />
                        <h5>Sell Products</h5>
                        <p>List your used or recyclable items for sale.</p>
                    </div>
                    <div className="col-md-4 text-center">
                        <img src={Money} className="mb-2 rounded shadow-sm"
                            style={{ width: "60px", height: "60px", objectFit: "cover" }} alt="Secure" />
                        <h5>Secure Transactions</h5>
                        <p>add items to your cart, and complete payments on pickup timme securely.</p>
                    </div>
                    <div className="col-md-4 text-center">
                        <img src={Team} className="mb-2 rounded shadow-sm"
                            style={{ width: "60px", height: "60px", objectFit: "cover" }} alt="Secure" />
                        <h5>Secure Transactions</h5>
                        <p>Chat with sellers.</p>
                    </div>
                </div>
            </div>
            {/* <div className="col-md-4 text-center">
            <img src="https://source.unsplash.com/200x200/?shopping,buy" className="rounded-circle mb-3" alt="Buy" />
            <h5>Buy Products</h5>
            <p>Browse various categories and purchase second-hand goods at affordable prices.</p>
          </div> */}

            <div className="mt-5">
                <h2 className="text-success text-center">Why Choose Eco-Bazar?</h2>
                <div className="row mt-4">
                    <div className="col-md-6">
                        <div className="card shadow-sm p-3">
                            <h5>Eco-Friendly</h5>
                            <p>Encourages recycling and reduces waste.</p>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card shadow-sm p-3">
                            <h5>Affordable</h5>
                            <p>Buy quality used items at lower costs.</p>
                        </div>
                    </div>
                    <div className="col-md-6 mt-3">
                        <div className="card shadow-sm p-3">
                            <h5>User-Friendly</h5>
                            <p>Simple and intuitive platform.</p>
                        </div>
                    </div>
                    <div className="col-md-6 mt-3">
                        <div className="card shadow-sm p-3">
                            <h5>Secure</h5>
                            <p>Safe payments and direct communication with sellers.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-5 text-center">
                <h2 className="text-info">Contact Us</h2>
                <p>Email: <a href="mailto:support@eco-bazar.com">support@eco-bazar.com</a></p>
                <p>Follow us on social media for updates!</p>
            </div>
        </div>
    );
};

export default About;