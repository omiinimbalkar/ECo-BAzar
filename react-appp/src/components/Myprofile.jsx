import { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
import API_URL from "../constants";
const avatarOptions = [
    "https://cdn-icons-png.flaticon.com/128/2201/2201688.png",
    "https://cdn-icons-png.flaticon.com/128/2201/2201689.png",
    "https://cdn-icons-png.flaticon.com/128/2201/2201691.png",
    "https://cdn-icons-png.flaticon.com/128/2201/2201693.png",
    "https://cdn-icons-png.flaticon.com/128/2201/2201695.png",
    "https://cdn-icons-png.flaticon.com/128/2201/2201696.png",
    "https://cdn-icons-png.flaticon.com/128/2201/2201697.png",
    "https://cdn-icons-png.flaticon.com/128/2201/2201698.png",
    "https://cdn-icons-png.flaticon.com/128/2201/2201699.png",
    "https://cdn-icons-png.flaticon.com/128/2201/2201700.png",
    "https://cdn-icons-png.flaticon.com/128/2201/2201701.png",
    "https://cdn-icons-png.flaticon.com/128/2201/2201702.png",

]

function Myprofile() {

    const [user, setuser] = useState({})
    const [avatar, setAvatar] = useState(localStorage.getItem("userAvatar") || avatarOptions[0]);

    useEffect(() => {
        let url = API_URL + '/my-profile/' + localStorage.getItem('userId');
        axios.get(url)
            .then((res) => {
                console.log(res.data)
                if (res.data.user) {
                    setuser(res.data.user);
                }
            })
            .catch((err) => {
                alert("server error")
            })
    }, []);

    // Save avatar to localStorage whenever it's changed
    const handleAvatarChange = (avt) => {
        setAvatar(avt);
        localStorage.setItem("userAvatar", avt);
    };

    return (
        <div>
            <Header />
            <div className="container mt-4">
                <div className="card shadow-lg p-4 border-0 rounded text-center">
                    <div className="d-flex flex-column align-items-center">
                        {/* Current Avatar */}
                        <img
                            src={avatar}
                            alt="User Avatar"
                            className="rounded-circle border"
                            width="120"
                            height="120"
                        />

                        {/* Avatar Selection */}
                        <h6 className="mt-3">Choose Your Avatar</h6>
                        <div className="d-flex flex-wrap justify-content-center mt-2">
                            {avatarOptions.map((avt, index) => (
                                <img
                                    key={index}
                                    src={avt}
                                    alt={`Avatar ${index}`}
                                    className="rounded-circle border m-2"
                                    width="60"
                                    height="60"
                                    style={{ cursor: "pointer", transition: "0.3s", border: avatar === avt ? "3px solid blue" : "1px solid gray" }}
                                    onClick={() => handleAvatarChange(avt)}
                                />
                            ))}
                        </div>

                        {/* User Details */}
                        <h6 className="fw-bold text-dark mt-3">👤 {user.username}</h6>
                        <p className="mb-1"><strong>📧 Email:</strong> {user.email}</p>
                        <p className="mb-0"><strong>📞 Mobile:</strong> {user.mobile || "Not Available"}</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default Myprofile;