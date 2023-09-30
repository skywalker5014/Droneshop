import express from 'express';
import Order_receipt from '../../database/mongodb/models/orderModel.js';
import verify from '../../token_handler/jwtHandler.js';
import User from '../../database/mongodb/models/userModel.js';
import sql from '../../database/mysql/sqldb.js';

const ordersapi = express.Router();



ordersapi.get('/orders', verify, async (req,res) => {
    const email = req.user.user;
    const user = await User.find({Email: email})
    const orders = await Order_receipt.find({email_id: email });
    const q = " select username, email, address, contact_number from users where email = ?"
    sql.query(q, [email], (err,result) => {
        if(err){ console.log(err) }
        else{
            const userdata = result;
            res.json({
                user: userdata,
                receipts: orders
            })
        }
    })
    
        
})

export default ordersapi;