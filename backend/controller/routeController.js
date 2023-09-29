import express from "express";
import Homeapi from "./api/home.js";
import cartapi from "./api/cart.js";
import ordersapi from "./api/orders.js";
import userloginapi from "./api/userlogin.js";
import userregistrationapi from "./api/userRegistration.js";
import sellerapi from "./api/seller.js";
import Payapi from "./api/payment.js";

// const app = express();

const routes = {
    register: userregistrationapi,
    login: userloginapi,
    home: Homeapi,
    cart: cartapi,
    orders: ordersapi,
    payment: Payapi,
    seller: sellerapi
}

// function controller(){
// return  app.use('/', Homeapi),
//         app.use('/cart', cartapi),
//         app.use('/orders', ordersapi),
//         app.use('/login', userloginapi),
//         app.use('/register', userregistrationapi),
//         app.use('/seller', sellerapi),
//         app.use('/paymenthandler', Payapi)
// }

export default routes;