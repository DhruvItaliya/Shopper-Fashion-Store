// import mongoose from 'mongoose';
const mongoose = require('mongoose');

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.gbugfol.mongodb.net/e-commerce?retryWrites=true&w=majority`;

mongoose.connect(uri).then(()=>{
    console.log("connection successfull!");
}).catch((err)=>{
    console.log("connection failed!");
});