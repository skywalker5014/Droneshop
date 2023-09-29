import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register(){
const [name, setname] = useState('');
const [email, setemail] = useState('');
const [address, setaddress] = useState('');
const [number, setnumber] = useState('');
const [pass, setpass] = useState('');

const navigate = useNavigate();

 function register(){
  const registerDetails = {
    username: name,
    email: email,
    address: address,
    contact_number: number,
    password: pass
  }
  
  axios.post('http://localhost:3000/api/register', registerDetails)
  .then(response => {
    alert(response.data)
  })
  .catch(error => console.log(error))
 }

  return (  
    <>
    <div className="maincontainer">
    <div className="registercontainer">
    <form className="registerbox" onSubmit={() => navigate('/', {replace: true}) }>
      <input type="text" placeholder="username" onChange={(e) => setname(e.target.value)} required/>
      <input type="email" placeholder="email id" onChange={(e) => setemail(e.target.value)} required/>
      <input type="text" placeholder="password" onChange={(e) => setpass(e.target.value)} required/>
      <input type="text" placeholder="number" onChange={(e) => setnumber(e.target.value)} required/>
      <textarea rows="7" cols="25" onChange={(e) => setaddress(e.target.value)} placeholder="address" required>
      </textarea>
      <button onClick={() => register()}>register</button>
      </form>
      <div>
        already a user? <a onClick={() => navigate('/',{replace: true})}>Login</a>
      </div>
    </div>
    </div>
    </>
    )
}

export default Register;