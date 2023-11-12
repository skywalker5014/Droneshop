import Footer from "./Footer";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { url } from "../constants";

function Home() {
  const [products, setProducts] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [message, setmessage] = useState("");

  const navigate = useNavigate();

  function modalview() {
    const modal = document.getElementById("dialog");
    modal.showModal();
  }

  useEffect(() => {
    async function fetchdata() {
      await axios
        .get(url + "home", {
          headers: {
            Authorization: localStorage.getItem("accessKey"),
          },
        })
        .then((res) => {
          if (res.status === 403) {
            setmessage(res);
            modalview();
          } else {
            setProducts(res.data);
          }
        })
        .catch((err) => {
          setmessage(err.message);
          modalview();
        });
    }

    fetchdata();
  }, []);

  useEffect(() => {
    const fetchImageUrls = async () => {
      const urls = [];
      for (let i = 0; i < products.length; i++) {
        try {
          const response = await fetch(
            url + "productView/" + products[i].product_id
          );
          const blob = await response.blob();
          const imgUrl = URL.createObjectURL(blob);
          urls.push(imgUrl);
        } catch (error) {
          alert("Error fetching Blob data check console");
          console.error(error);
        }
      }
      setImageUrls(urls);
    };

    fetchImageUrls();
  }, [products]);

  return (
    <div>
      <dialog id="dialog">
        <a
          style={{ color: "red", border: "0.5px solid red" }}
          onClick={() => navigate("/home", { replace: true })}
        >
          X
        </a>{" "}
        {message}
      </dialog>
      <Navbar />
      <div className="maincontainer">
        <div className="homeContainer">
          {products.map((element, index) => (
            <div key={element.product_id} className="homeCards">
            <Link to={`/product/${element.product_id}`}>
              <img src={imageUrls[index]} alt="image"/> <br />
                <b>{element.product_name}</b>
                <br />
              {element.price}
            </Link>
            </div>
          ))}
          </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
