import axios from "axios";

function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = src
      script.onload = () => {
        resolve(true)
      }
      script.onerror = () => {
        resolve(false)
      }
      document.body.appendChild(script)
    })
  }

function Order(){
    async function displayRazorpay () {

    


          const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
    
          if (!res){
            alert('Razropay failed to load!!')
            return 
          }


          const response = await axios.get('http://localhost:3000/api/payment',{
            headers:{
                Authorization: localStorage.getItem('accessKey')
            }
          })
    
          if(response.status === 200){
            const options = response.data;
            const paymentObject = new window.Razorpay(options); 
            paymentObject.open();
          } else {
            alert('something went wrong try again')
          }



      }

    return (
    <div>
        <button className="cartbtn"
        onClick={displayRazorpay}
        >
          Pay now 
        </button>
    </div>
    )
}

export default Order;