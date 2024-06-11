// import jwt from 'jsonwebtoken';
// import AdminRegister from '../models/AdminRegister';
const jwt = require('jsonwebtoken');
const AdminRegister = require('../models/AdminRegister');

const adminAuth = async(req,res,next)=>{
    try{
        const { token } = req.cookies;
        if(token){
            const adminVerify = await jwt.verify(token,process.env.SECRETE_KEY);
            const admin = await AdminRegister.findById({_id:adminVerify._id}).select('-password');
            req.admin = admin;
        }
        else{
            throw new Error("Token not found!");
        }
        next();
    }
    catch(err){
        console.log("Error in authorization! : " + err.message);
        res.status(401).json({error:"Unauthorized access!"});
    }
}

module.exports = adminAuth;