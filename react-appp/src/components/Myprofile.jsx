import { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import API_URL from "../constants";

function Myprofile() {

    const [user, setuser] = useState({})
    useEffect(() => {
        let url =  API_URL + '/my-profile/' + localStorage.getItem('userId');
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

    return (
        <div >
            <Header />
            <div className="m-3 p-3">
                <h4 className="text-center mt-2">User Profilee</h4>
                <table className="table table-dark table-bordered">
                    <thead>
                        <tr>
                            <td> USERNAME </td>
                            <td> EMAIL ID </td>
                            <td> MOBILE </td>
                        </tr>
                    </thead>
                    <tbody>

                        <tr>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td> {user.mobile} </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default Myprofile;