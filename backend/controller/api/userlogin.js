import express from 'express';
import User from '../../database/mongodb/models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userloginapi = express.Router();


userloginapi.post('/login', async (req,res) => {
    const {email, password} = req.body;
    const check = await User.findOne({ Email: email})
    const payload = {user : email} ;
try {
    if(check !== null){
    bcrypt.compare(password, check.Password, (err,result) => {
        if (! result){
        res.status(401).json('wrong password');
        } else {
            const token = jwt.sign(payload, '69', {expiresIn: '1hr'})
            res.status(200).json({status: 'login success', accessKey: token});
        }
    })} else { res.status(404).json('user not found')}
} catch (error) {
    res.json(error)
}
   
})

export default userloginapi;