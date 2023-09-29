import mongoose from "mongoose";

const Orderschema =new mongoose.Schema({
    customer_name: String,
    email_id : String,
    order_id: String,
    amount: String,
    payment_id: String
});

export default Orderschema;