import { useState } from "react";
import { url } from "../constants";
// import axios from "axios";

function Seller() {
  const [name, setname] = useState("");
  const [id, setid] = useState("");
  const [prc, setprice] = useState("");
  const [desc, setdesc] = useState("");
  const [avail, setavail] = useState("");
  const [selectedImage, setimg] = useState(null);

  async function upload() {
    try {
      const formdata = new FormData();
      formdata.append("productname", name);
      formdata.append("productid", id);
      formdata.append("price", prc);
      formdata.append("description", desc);
      formdata.append("availability", avail);
      formdata.append("image", selectedImage);
      console.log(selectedImage);

      const response = await fetch(url + "uploadProduct", {
        method: "POST",
        body: formdata,
      });
      if (response.ok) {
        console.log("sent");
      }

      //    await axios.post('http://localhost:3000/seller/uploadProduct',{
      //         formdata
      //     },{headers: { "Content-Type": "multipart/form-data" }})
      //     .then(response => {
      //         if(response.status === 200){
      //             alert('image uploaded')
      //         } else {
      //             alert('something went wrong try again')
      //         }
      //     })
    } catch (error) {
      alert("an error occured check the console for details");
      console.log(error);
    }
  }

  return (
    <div>
      <div className="maincontainer">
        <div className="registercontainer">
          <input
            type="text"
            placeholder="product name"
            onChange={(e) => setname(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="product id"
            onChange={(e) => setid(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="price"
            onChange={(e) => setprice(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="availability"
            onChange={(e) => setavail(e.target.value)}
            required
          />
          <textarea
            cols="25"
            rows="7"
            placeholder="description"
            onChange={(e) => setdesc(e.target.value)}
          ></textarea>
          <input
            type="file"
            accept="image.*"
            onChange={(e) => setimg(e.target.files[0])}
          />
          <button onClick={() => upload()}>register</button>
        </div>
      </div>
    </div>
  );
}

export default Seller;
