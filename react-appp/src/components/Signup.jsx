import Header from './Header';
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import API_URL from "../constants";

function Signup() {


  const [username, setUsername] = useState(""); // we are creating a state
  const [email, setEmail] = useState(""); // we are creating a state   
  const [mobile, setMobile] = useState(""); // we are creating a state   
  const [password, setPassword] = useState(""); // we are creating a state   

  const handleApi = () => {
    const URL = API_URL + "/signup";
    const data = { username, password , email , mobile};
    axios.post(URL, data)
      .then((res) => {
        if (res.data.message === 'User created') {
          alert('User created');
        }
      })
      .catch((err) => {
        alert('SERVer ERR')
      });
  }
  return (
    <div>
      <Header />
      <div className='p-3 m-3'>
        <h4>Welcome in Signup Page : </h4>
        <br /><br />
        USERNAME
        <input className='form-control' type="text" value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          } />
        <br />
        EMAIL
        <input className='form-control' type="text" value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          } />
        <br />
        MOBILE
        <input className='form-control' type="text" value={mobile}
          onChange={(e) =>
            setMobile(e.target.value)
          } />
        <br />
        PASSWORD
        <input className='form-control' type="password" value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />
        <br />
        <button className='btn btn-primary' onClick={handleApi}>SignUP</button>
        <Link className='m-3' to='/login'><button>Login</button></Link>
        navigate('/login')
      </div>
    </div>
  );
}
export default Signup;    
