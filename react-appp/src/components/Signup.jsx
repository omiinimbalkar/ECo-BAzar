import Header from './Header';
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
function Signup() {


  const [username, setUsername] = useState(""); // we are creating a state
  const [password, setPassword] = useState(""); // we are creating a state   

  const handleApi = () => {
    console.log({username , password});// we are printing the username & password
    const URL = "http://localhost:4000/signup";
    const data = {username,password};
    axios.post(URL,data)
    .then((res) => {
      console.log(res.data);
      if(res.data.message === 'User created'){
        alert('User created');
      }
    })
    .catch((err) => {
      console.log(err);
      alert('SERVer ERR')
    });
  }
  return (
    <div>
      <Header />
      <h1>SignUp</h1>
      <br />
      USERNAME
      <input type="text" value={username} 
      onChange={(e) => 
      setUsername(e.target.value)
      }/>
      <br />
      PASSWORD
      <input type="password" value={password} 
      onChange={(e) =>
      setPassword(e.target.value)
      }
      />
      <br />
      <button onClick={handleApi}>SignUP</button>
      <Link to ='/login'><button>Login</button></Link>
    </div>
  );
}   
export default Signup;    
