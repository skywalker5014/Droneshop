import express from "express";
import sql from "../../database/mysql/sqldb.js";
import verify from "../../token_handler/jwtHandler.js";

const cartapi = express.Router();

cartapi.get("/carthandler",verify, async (req, res) => {
  const email = req.user.user;
  const q =
    "select sum(products.price*cart.quantity) as total from products join cart on products.product_id = cart.product_id and cart.email = ?";
  const q2 =
    "select products.product_name, products.price, products.product_id, cart.quantity from products join cart on products.product_id = cart.product_id and cart.email = ?";
  const data = {};
  sql.query(q, [email], (err, result) => {
    err ? console.log(err) : (data.total = result[0].total || '0');
    sql.query(q2, [email], async (err, result) => {
      err ? console.log(err) : (data.cart = result );
      console.log(data);
      res.json(data);
    });
  });
});

cartapi.post("/carthandler/add",verify, (req, res) => {
  let email = req.user.user;
  console.log(email);
  let { productId } = req.body;
  const q = `select quantity from cart where cart.product_id = ${productId} and cart.email = '${email}'`;
  const q3 = `insert into cart (email, product_id, quantity) values ('${email}', ${productId}, 1)`;
  const q2 = `update cart set quantity = ? where product_id = ${productId} and email = '${email}'`;
  sql.query(q, (err, result) => {
    if (result.length !== 0) {
      sql.query(q2, [result[0].quantity + 1]);
    } else {
      sql.query(q3);
    }
    res.json("added");
  });
});

cartapi.post("/cartHandler/delete",verify, (req, res) => {
  let email = req.user.user;
  let {  productId, reset } = req.body;
  const q = `select quantity from cart where cart.product_id = ${productId} and cart.email = '${email}'`;
  const q3 = `update cart set quantity = ? where email = '${email}' and product_id = ${productId}`;
  const q2 = `delete from cart where cart.product_id = ${productId}  and cart.email = '${email}'`;
  const q4 = `delete from cart where cart.email = '${email}'`;
  if (reset === "true") {
    sql.query(q4);
    res.json("cart reset");
  } else {
    sql.query(q, (e, r) => {
      if (r.length !== 0) {
        if (r[0].quantity === 1) {
          sql.query(q2);
        } else {
          sql.query(q3, [r[0].quantity - 1]);
        }
        res.json("deleted");
      } else {
        res.json("nothing to delete");
      }
    });
  }
});

export default cartapi;
