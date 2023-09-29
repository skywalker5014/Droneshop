import express from 'express';
import Order_receipt from '../../database/mongodb/models/orderModel.js';
import verify from '../../token_handler/jwtHandler.js';


const ordersapi = express.Router();



ordersapi.get('/orders', verify, async (req,res) => {
    const email = req.user.user;
    const orders = await Order_receipt.find({email_id: email })
    console.log(orders);
    res.json(orders)
        
})

export default ordersapi;