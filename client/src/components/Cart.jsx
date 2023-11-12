import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import Order from "./Order";
import Footer from "./Footer";
import { url } from "../constants";
import { Link } from "react-router-dom";


function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState("");

  const navigate = useNavigate();

  async function cartquantity(id, handler) {
    await axios
      .post(
        url + "carthandler/" + handler,
        {
          productId: id,
          reset: "false",
        },
        {
          headers: {
            Authorization: localStorage.getItem("accessKey"),
          },
        }
      )
      .then(() => fetchdata());
  }

  async function resetcart() {
    await axios.post(
      url + "carthandler/delete",
      {
        reset: "true",
      },
      {
        headers: {
          Authorization: localStorage.getItem("accessKey"),
        },
      }
    );

    fetchdata();
  }

  async function fetchdata() {
    try {
      const response = await axios.get(url + "carthandler", {
        headers: {
          Authorization: localStorage.getItem("accessKey"),
        },
      });
      if (response.data.cart.length > 0) {
        setCart(response.data.cart);
        setTotal(response.data.total);
      } else {
        setCart([]);
        setTotal("");
        modalview();
      }
    } catch (error) {
      navigate("/", { replace: true });
    }
  }
  useEffect(() => {
    fetchdata();
  }, []);

  function modalview() {
    const modal = document.getElementById("dialog");
    modal.showModal();
  }

  return (
    <div>
      <Navbar />
      <div className="maincontainer">
        <dialog id="dialog">
          cart is empty... <br />
          <a
            style={{ color: "white" }}
            onClick={() => navigate("/home", { replace: true })}
          >
            go back to shopping!
          </a>
        </dialog>
        <div className="cartContainer">
          {cart.map((value, index) => (
            <div key={index} className="cartItem">
              <Link to={`/product/${value.product_id}`}>
              <b>{value.product_name}</b>
              </Link>
              cost: {value.price} <br />
              quantity: &nbsp;
              <div>
              <button
                onClick={() => cartquantity(value.product_id, "delete")}
              >
                {" "}
                <b> -</b>
              </button>
              &nbsp;{value.quantity}&nbsp;
              <button
                onClick={() => cartquantity(value.product_id, "add")}
              >
                {" "}
                <b> +</b>
              </button>
              </div>
            </div>
          ))}
        </div>
        <div className="cartHandle">
          <hr />
          <b>Total cost: {total} </b>rupees <br />
          <br />
          <div>
            <button className="cartbtn" onClick={() => resetcart()}>
              reset cart
            </button>
            <Order />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Cart;
