import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import API_URL from "../constants";

function Notifications() {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        axios.get(`${API_URL}/get-notifications/${userId}`)
            .then((res) => {
                setNotifications(res.data.notifications);
            })
            .catch(() => alert('Error fetching notifications'));
    }, []);


    return (
        <div>
            <Header />
            <div className="container mt-4">
                <h2>Notifications</h2>
                <ul className="list-group">
                    {notifications.length > 0 ? (
                        notifications.map((notif, index) => (
                            <li key={index} className="list-group-item">
                                {notif.message}
                            </li>
                        ))
                    ) : (
                        <p>No notifications</p>
                    )}
                </ul>
            </div>
            <Footer />
        </div>
    );
}

export default Notifications;
