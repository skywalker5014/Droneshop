import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { url } from "../constants";

function Login() {
  const [Email, setEmail] = useState("test@mail.com");
  const [Password, setPassword] = useState("123123");
  const [message, setmessage] = useState("");
  const navigate = useNavigate();

  function modalview() {
    const modal = document.getElementById("dialog");
    modal.showModal();
  }

  async function handleLogin() {
    if (Email !== "" && Password !== "") {
      await axios
        .post(url + "login", {
          email: Email,
          password: Password,
        })
        .then((response) => {
          if (response.status === 200) {
            localStorage.setItem("accessKey", response.data.accessKey);
            navigate("/home", { replace: true });
          } else {
            console.log(response.data);
            setmessage(response.data);
            modalview();
          }
        })
        .catch((error) => {
          console.log(error);
          setmessage(error.response.data);
          modalview();
        });
    } else {
      setmessage("both password and email need to be filled");
      modalview();
    }
  }
  return (
    <>
      <dialog id="dialog">
        {message} <br />
        <a
          style={{ color: "red" }}
          onClick={() => document.getElementById("dialog").close()}
        >
          close
        </a>
      </dialog>
      <h2>Project Droneshop: running on AWS </h2>
      <div className="maincontainer">
        <section>
        <div className="formbox">
          <input
            type="text"
            placeholder="email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={() => handleLogin()}>login</button>
        </div>
        <br />
        <div>
          not a user?{" "}
          <a onClick={() => navigate("/register", { replace: true })}>
            {" "}
            register now!
          </a>  
        </div> <br /> <br />
        <div style={{border:"1px solid black", padding: '10px'}}>
          A test account is loaded by default. <br />
          Feel free to register
        </div>
        </section>
      </div>
    </>
  );
}

export default Login;
