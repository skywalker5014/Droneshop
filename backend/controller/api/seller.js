import multer from "multer";
import fs from 'fs';
import sql from "../../database/mysql/sqldb.js";
import express from 'express';
import { Redis } from 'ioredis';

const Sellerapi = express.Router();
const app = express();
const redis = new Redis({
  host: 'localhost',
  port: 6379
});

const uploadedData = {};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
    uploadedData.photo = file.originalname;
  }
});

const upload = multer({storage});

Sellerapi.post('/uploadProduct', upload.single('image'), (req, res) => {
  const {productname, productid, price, description, availability} = req.body;
 

  const imageAddress = 'images/'+ uploadedData.photo;
  const q = 'insert into products (product_name, product_id, price, description, availability, image_address) values (?)';
  const q2 = 'select * from products'
  sql.query(q, [[ 
    productname,
    productid,
    price,
    description,
    availability,
    imageAddress]
  ], (err,result) => {
    err ? console.log(err) : console.log(result);
    sql.query(q2, (err, result) =>{
      err ? console.log(err) : redis.set('home',JSON.stringify(result) )
      res.send('alert("sent successfully")');
    })
    
  })
})

/*
q1 = update products set column = new data where product_id = req.body.productId
q2 = delete from products where product_id = product_id
*/

export default Sellerapi;