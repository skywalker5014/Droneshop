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
      <div className="maincontainer">
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
        <div>
          test email: test@mail.com <br /> <br />
          test password: 123123
        </div>
      </div>
    </>
  );
}

export default Login;
