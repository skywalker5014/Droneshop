// import { controller} from "./controller/routeController.js";
import express from 'express';
import cors from 'cors';
import mongoose from "mongoose";
import routes from "./controller/routeController.js";

const app = express();
app.use(cors({
    origin: [
        'http://localhost:5252',
        'http://localhost:5173'
    ]
}));
app.use(express.json());
// app.use(controller());

app.use('/api', routes.home)
app.use('/api', routes.cart)
app.use('/api', routes.orders)
app.use('/api', routes.login)
app.use('/api', routes.register)
app.use('/api', routes.seller)
app.use('/api', routes.payment)




app.listen(3000, 
    console.log('runnin on 3k'),
    mongoose.connect('mongodb://127.0.0.1:27017/droneshop1')
    .then(console.log('connected to mongodb'))
    );