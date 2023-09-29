import mongoose from "mongoose";
import Orderschema from "../schema/orderSchema.js";

const Order_receipt = mongoose.model("Order_receipt", Orderschema);

export default Order_receipt;