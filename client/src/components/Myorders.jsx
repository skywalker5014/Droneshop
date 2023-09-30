import axios from "axios";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { url } from "../constants";

function Myorders() {
  const [receipts, setReceipts] = useState([]);

  useEffect(() => {
    async function fetchdata() {
      await axios
        .get(url + "orders", {
          headers: {
            Authorization: localStorage.getItem("accessKey"),
          },
        })
        .then((response) => setReceipts(response.data))
        .catch((error) => console.log(error));
    }

    fetchdata();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="myordercontainer">
        <div className="receiptcontainer">
          {receipts.map((receipt, index) => (
            <div key={index} className="receiptcard">
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
