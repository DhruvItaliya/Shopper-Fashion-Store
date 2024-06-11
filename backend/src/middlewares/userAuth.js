// import jwt from 'jsonwebtoken';
// import UserRegister from '../models/UserRegister';
const jwt = require('jsonwebtoken');
const UserRegister = require('../models/UserRegister');

const userAuth = async(req,res,next)=>{
    try{
        const token = req.header('auth-token');
        if(token){
            const userVerify = jwt.verify(token,process.env.SECRETE_KEY);
            const user = await UserRegister.findById({_id:userVerify._id});
            req.user = user;
        }
        else{
            throw new Error();
        }
        next();
    }
    catch(err){
        console.log("Error in authorization!");
        return res.status(401).json({success:false,error:"Unauthorized access!"});
    }
}

module.exports = userAuth;