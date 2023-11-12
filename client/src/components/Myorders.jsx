import axios from "axios";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { url } from "../constants";

function Myorders() {
  const [receipts, setReceipts] = useState([]);
  const [userdata, setUser] = useState([]);

  useEffect(() => {
    async function fetchdata() {
      await axios
        .get(url + "orders", {
          headers: {
            Authorization: localStorage.getItem("accessKey"),
          },
        })
        .then((response) => {
          setReceipts(response.data.receipts)
          setUser(response.data.user)
        })
        .catch((error) => console.log(error));
    }

    fetchdata();
  }, []);


  return (
    <div>
      <Navbar />
      <div className="maincontainer">
      <div id="userDetails">
       <b> username: { userdata.length > 0 ? userdata[0].username : 'Loading...'} <br />
       email: { userdata.length > 0 ? userdata[0].email : 'Loading...'} <br />
       address:  { userdata.length > 0 ? userdata[0].address : 'Loading...'}<br />
       contact:  { userdata.length > 0 ? userdata[0].contact_number : 'Loading...'}
       </b>  
      </div><br /><br />
      <div className="myordersContainer">
          {receipts.map((receipt, index) => (
            <div key={index} className="orderReceipt">
              <p>
                order no: <b> {index + 1}</b> <br />
                amount: <b> {receipt.amount} </b> <br />
                order id:<b> {receipt.order_id} </b> <br />
                payment id: <b>{receipt.payment_id}</b>
              </p>
            </div>
          ))}
      </div>
      </div>
      <Footer />
    </div>
  );
}

export default Myorders;
