import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
    const [message, setmessage] = useState("");
  const navigate = useNavigate();

  function modalview(){
    const modal = document.getElementById("dialog");
    modal.showModal();
  }

  async function handleLogin() {
    if (Email !== "" && Password !== "") {
      await axios
        .post("http://localhost:3000/api/login", {
          email: Email,
          password: Password,
        })
        .then((response) =>{
            if (response.status === 200) {
                localStorage.setItem("accessKey", response.data.accessKey);
                navigate("/home", { replace: true });
            } else {
                console.log(response.data);
                setmessage(response.data);
                modalview();
            }
         
        })
        .catch((error) =>{ console.log(error);
        setmessage(error.response.data);
        modalview();});
    } else {
    setmessage("both password and email need to be filled")
        modalview();
    }
  }
  return (
    <>
      <dialog id="dialog">
        {message} <br />
        <a style={
            { color: "red" }
            } onClick={() => document.getElementById('dialog').close()}>
          close
        </a>
      </dialog>
            <div className="maincontainer">
      <div className="formbox">
        <input
          type="text"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={() => handleLogin()}>login</button>
      </div>
      <br />
      <div>
        not a user? <a onClick={() => navigate('/register',{replace: true})}> register now!</a>
      </div>
      </div>
    </>
  );
}

export default Login;
