import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { url } from "../constants";

function Product() {
  const [product, setproduct] = useState({});
  const [imageUrl, setImageUrl] = useState("");

  const navigate = useNavigate();

  const { id } = useParams();
  useEffect(() => {
    const fetchdata = async () => {
      await axios
        .get(url + "product/" + id, {
          headers: {
            Authorization: localStorage.getItem("accessKey"),
          },
        })
        .then((response) => setproduct(response.data[0]));
    };
    fetchdata();
  }, []);

  useEffect(() => {
    const fetchImageUrls = async () => {
      try {
        if (Object.keys(product).length === 0) {
          return;
        }
        const response = await fetch(url + "productView/" + product.product_id);
        const blob = await response.blob();
        const imgUrl = URL.createObjectURL(blob);
        setImageUrl(imgUrl);
      } catch (error) {
        alert("Error fetching Blob data check console");
        console.error(error);
      }
    };

    fetchImageUrls();
  }, [product]);

  function addtocart(id) {
    axios.post(
      url + "carthandler/add",
      {
        productId: id,
      },
      {
        headers: {
          Authorization: localStorage.getItem("accessKey"),
        },
      }
    );
  }

  return (
    <div>
      <Navbar />
      {/* <div style={{display: loading}}>image loading...</div> */}
      <div className="maincontainer">
        <div className="productContainer">
          <img src={imageUrl} alt="image" /> 
          <h3> product name: {product.product_name} {''}
          <button onClick={() => {
            addtocart(product.product_id);
            navigate("/cart", { replace: true });
            }}>
            add to cart
          </button> 
          <br /></h3>
          price: {product.price} 
          <br /> 
          <p>
            description: <br /> <b>{product.description}</b>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Product;
