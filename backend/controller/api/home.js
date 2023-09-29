import express from 'express';
import sql from '../../database/mysql/sqldb.js';
import verify from '../../token_handler/jwtHandler.js';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import redis from '../../database/redis/redisConfig.js';

const Homeapi = express.Router();
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));


app.use(express.static("images"))


Homeapi.get('/home',verify,  (req,res) => {
    const q = 'select * from products'
    redis.get('home')
    .then(data => {
      if (data !== null) {
        res.json(JSON.parse(data));
      } else {
        sql.query(q, (err, result) => {
          err ? res.json(err) : res.json(result);
          redis.set('home', JSON.stringify(result));
      })
      }
    })
    
})

Homeapi.get('/product/:id', verify, (req,res) => {
    const id = req.params.id;


        const q = 'select product_name, product_id, price, description, availability from products where product_id = ?'
        sql.query(q, [id], (err,result) => {
            err ? res.json(err) : res.json(result);
    
        })

})

Homeapi.get('/productView/:id',async (req,res) => {
     const id = req.params.id;
   const q = "select image_address from products where product_id = ?";
   sql.query(q, [id],(err, result) => {
     if (err) {
       res.json(err);
     } else {
       const imgPath = path.join(__dirname,'..', '..', result[0].image_address);
       res.sendFile(imgPath);
     }
  });
 })

export default Homeapi;