import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";

const Contact = () => {
    return (
        <>
            <Header />

            <div className="container mt-5">
                <h1 className="text-center text-success mb-4"> 📞 Contact Page </h1>
                <p className="text-center text-muted">
                    Connect with near Bhagarwalas
                </p>

                <div align="center" className="mb-4">
                    {/* Scrap Collector Details */}
                    <div className="col-md-6 ">
                        <div className="card shadow-sm p-4 bg-light ">
                            <h4 className="text-success">Scrap Collector Information</h4>
                            <h5>Name:</h5>
                            <p>Rahul Sharma,
                                <br />
                                Manoj tiwari,
                                <br />
                                Pakaj Mishra</p>

                            <h5>Phone:</h5>
                            <p><a href="tel:+919876543210">+91 98765 43210</a></p>
                            <p><a href="tel:+919876543210">+91 98765 43210</a></p>
                            <p><a href="tel:+919876543210">+91 98765 43210</a></p>
                            <p><a href="tel:+919876543210">+91 98765 43210</a></p>

                            <h5>Available Timings:</h5>
                            <p>Monday - Saturday (8 AM - 6 PM)</p>

                            <h5>Service Areas:</h5>
                            <p>Virar,Palghar</p>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Contact;
