// import { useEffect, useState } from "react";
// import axios from "axios";
// import Header from "./Header";
// import Footer from "./Footer";
// import API_URL from "../constants";

// function Notifications() {
//     const [notifications, setNotifications] = useState([]);

//     useEffect(() => {
//         const userId = localStorage.getItem('userId');
//         axios.get(`${API_URL}/get-notifications/${userId}`)
//             .then((res) => {
//                 setNotifications(res.data.notifications);
//             })
//             .catch(() => alert('Error fetching notifications'));
//     }, []);


//     return (
//         <div>
//             <Header />
//             <div className="container mt-4">
//                 <h2>Notifications</h2>
//                 <ul className="list-group">
//                     {notifications.length > 0 ? (
//                         notifications.map((notif, index) => (
//                             <li key={index} className="list-group-item ">
//                                 {notif.message}
//                             </li>
//                         ))
//                     ) : (
//                         <p>No notifications</p>
//                     )}
//                 </ul>
//             </div>
//             <Footer />
//         </div>
//     );
// }

// export default Notifications;
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import API_URL from "../constants";

function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        axios.get(`${API_URL}/get-notifications/${userId}`)
            .then((res) => {
                setNotifications(res.data.notifications);
                setLoading(false);
            })
            .catch(() => {
                setError("Error fetching notifications.");
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <Header />
            <div className="container mt-4">
                <div className="card shadow p-4">
                    <h2 className="text-center mb-3 text-success">Notifications</h2>
                    
                    {loading ? (
                        <div className="text-center">
                            <div className="spinner-border text-success" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : error ? (
                        <p className="text-danger text-center">{error}</p>
                    ) : notifications.length > 0 ? (
                        <ul className="list-group">
                            {notifications.map((notif, index) => (
                                <li key={index} className="list-group-item border-0">
                                    {notif.message}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-muted text-center">No notifications available.</p>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Notifications;
