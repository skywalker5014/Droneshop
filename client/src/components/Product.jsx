import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";


function Product(){
const [product, setproduct] = useState({});
const [imageUrl, setImageUrl] = useState('');
const [loading, setloading] = useState('none');


const navigate = useNavigate();

const {id} = useParams();
useEffect(() => {
    const fetchdata = async () => {
    await axios.get('http://localhost:3000/api/product/'+id, 
        {
            headers: {
                Authorization: localStorage.getItem('accessKey')
            }
        })
        .then(response => setproduct(response.data[0]))
    }
    fetchdata();
},[])

useEffect(() => {
    const fetchImageUrls = async () => {
        try {
            if (Object.keys(product).length === 0) {
                return; 
            }
          const response = await fetch("http://localhost:3000/api/productView/" + product.product_id);
          const blob = await response.blob();
          const imgUrl = URL.createObjectURL(blob);
          setloading('none');
          setImageUrl(imgUrl);
        } catch (error) {
          alert("Error fetching Blob data check console");
          console.error(error);
        }
    };

    fetchImageUrls();
  }, [product]);

function addtocart(id){
    axios.post('http://localhost:3000/api/carthandler/add',{
        productId: id
    }, {
        headers:{
            Authorization: localStorage.getItem('accessKey')
        }
    })
}


   return ( 
   <div>
    <Navbar />
    {/* <div style={{display: loading}}>image loading...</div> */}
    <div className="productcontainer">
        <div >
    <img src={imageUrl} id="productimage" alt="image" /> <br />
      <h3> product name: {product.product_name}</h3> 
      <br />
      price: {product.price}
      <br /> <br />
      <p>
      description: <br /> <b>{product.description}</b>
      </p>
      </div>
      <button onClick={() => {addtocart(product.product_id); navigate('/cart', {replace: true})}}>cart</button>
      </div>
      <Footer />
    </div>
    )
}

export default Product;