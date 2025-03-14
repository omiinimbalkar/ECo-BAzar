import Header from './Header';
import { Link ,useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(""); // we are creating a state
  const [password, setPassword] = useState(""); // we are creating a state

  const handleApi = () => {
    console.log({username , password});// we are printing the username & password
    const URL =  API_URL + "/login";
    const data = {username,password};
    axios.post(URL,data)
    .then((res) => {
      if(res.data.message){
        alert(res.data.message);
        if(res.data.token){
          localStorage.setItem('token',res.data.token);
          localStorage.setItem('userId',res.data.userId);
          navigate('/');
        }
      }
    })
    .catch((err) => {
      alert('SERVer ERR')
    });
  }


  return (
    <div>
      <Header />
      <div className='p-3 m-3 '>
      <h4> Welcome to Login Page </h4>
      <br />
      USERNAME
      <input className='form-control' type="text" value={username}
      onChange={(e) =>{
        setUsername(e.target.value)
      }}
      />
      <br />
      PASSWORD
      <input className='form-control' type="password" value={password}
      onChange={(e) => {
        setPassword(e.target.value)
      }}
      />
      <br />
      <button className='btn btn-primary mr-3' onClick={handleApi}>LOGIN</button>
      <Link className='m-3' to ='/signup'><button>SIGNUP</button></Link>
      </div>
    </div>
  );
}   
export default Login;    