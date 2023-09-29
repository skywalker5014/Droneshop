import instance from "./razorpayInit.js";
import express from 'express';
let options = {
    amount: `50000`,
    currency: "INR",
};

const app = express();

app.post('/pay', (req,res) => {
    instance.orders.create(options , (err, result) => {
        err ? console.log(err) : res.json(result);
    });
})


export {order_id};
