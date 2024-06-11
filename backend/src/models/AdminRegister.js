// import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const adminSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true});


// for password hashing 
adminSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,10);
    }
    next();
});

// for generating token
adminSchema.methods.generateToken = async function(){
    try{
        const token  = await jwt.sign({_id:this._id},process.env.SECRETE_KEY);
        return token;
    }
    catch(err){
        console.log("Error in generate token");
    }
}

const AdminRegister = new mongoose.model("AdminRegister",adminSchema);

module.exports = AdminRegister;