import instance from "../../payment_gateway/razorpayInit.js";
import express from 'express';
import sql from "../../database/mysql/sqldb.js";
import verify from "../../token_handler/jwtHandler.js";
import crypto from 'crypto';
import Order_receipt from "../../database/mongodb/models/orderModel.js";
import User from "../../database/mongodb/models/userModel.js";

const Payapi = express.Router();



Payapi.get('/payment', verify,async (req,res) => {
    const email = req.user.user;
    const username =await User.findOne({Email : email})
    
        const options = {
            "key": "rzp_test_WqpdjU6uMUVCvC", // Enter the Key ID generated from the Dashboard
            "currency": "INR",
            "name": "Acme Corp",
            "description": `transaction by ${username.Username}-${email}`,
            "callback_url" : 'http://localhost:5173/orders',
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        const q1 = 
        "select sum(products.price*cart.quantity) as total from products join cart on products.product_id = cart.product_id and cart.email = ?";
        
        sql.query(q1, [email], (err,result) => {
            err ? console.log(err) : options.amount = result[0]['total'] + '00';
            instance.orders.create({
                amount: options.amount,
                currency: options.currency
            } , (err, result) => {
                err ? console.log(err) : options.order_id = result.id
                 res.json(options);
            })
        })
    




})


Payapi.post('/verifypay', (req,res) => {
    let data = {
        customer_name: '',
        email_id : '',
        order_id: '',
        amount: '',
        payment_id: ''
    }
    const secret = 'qwerty';
    const shasum = crypto.createHmac('sha256', secret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest('hex');

    if(digest === req.headers['x-razorpay-signature']){
        data.payment_id = req.body['payload']['payment']['entity']['id']
        data.amount = req.body['payload']['payment']['entity']['amount']
        data.order_id = req.body['payload']['payment']['entity']['order_id']
        data.email_id = req.body['payload']['payment']['entity']['description'].split('-')[1]
        data.customer_name = req.body['payload']['payment']['entity']['description'].split('-')[0].slice(15)
        console.log(data)
        const receipt = new Order_receipt(data)
        receipt.save()
    } else {
        return
    }
    res.json({status: 'ok'})
})

export default Payapi;