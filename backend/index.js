import express from 'express';
import cors from 'cors';
import mongoose from "mongoose";
import routes from "./controller/routeController.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors({
    origin: [
        'http://localhost:5252',
        'http://localhost:4173',
        'http://localhost:5173'
    ]
}));
app.use(express.json());

app.use('/api', routes.home)
app.use('/api', routes.cart)
app.use('/api', routes.orders)
app.use('/api', routes.login)
app.use('/api', routes.register)
app.use('/api', routes.seller)
app.use('/api', routes.payment)




app.listen(3000, 
    console.log('runnin on 3k'),
    mongoose.connect(process.env.MONGO)
    .then(console.log('connected to mongodb'))
    );