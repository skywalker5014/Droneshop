import express from 'express';
import User from '../../database/mongodb/models/userModel.js';
import sql from '../../database/mysql/sqldb.js';
import bcrypt from "bcrypt";



const userregistrationapi = express.Router();


userregistrationapi.post('/register',async (req,res) => {
    const {username , email, address, contact_number, password} = req.body;
    let data = {Username: username, Email: email };
try {
    if (await User.findOne({Email: data.Email})) {
        res.status(409).json('user already exists');
    } else {
        let q = 'insert into users (username, email,address,contact_number, password) values (?, ?, ?, ?, ?)'
        data.Password =  bcrypt.genSalt(10, (err,salt) => {
            bcrypt.hash(password, salt,async (err,hashedPass) => {
                if (err) {
                    console.log(err);
                } else {
                    data.Password = hashedPass;
                    sql.query(q, [username, email,address, contact_number, data.Password], (err, result) => err ? console.log(err) : console.log('new registration'))
                    const newuser = new User(data);
        await newuser.save();
        res.json('registration successful')
                }
            }
            )
        })
    }    
} catch (error) {
    console.log(error);
}
})

export default userregistrationapi;