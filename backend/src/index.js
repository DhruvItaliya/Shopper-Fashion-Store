// import dotenv from 'dotenv';
// import conn from './db/conn';
// import express from 'express';
// import cookieParser from 'cookie-parser';

require('dotenv').config();
require('./db/conn');
const cors = require('cors');
const express  = require('express');
const cookieParser  = require('cookie-parser');

const app = express();
const port = process.env.PORT || 4000;

// app.use(cors());
app.use(cors({
    origin: [process.env.FRONTEND_URL1,process.env.FRONTEND_URL2],
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true
}));

app.use(cookieParser())
app.use(express.json());
app.use('/public', express.static('public'));
app.use('/otp',require('./routes/otpRoute'));
app.use('/admin',require('./routes/admin'));
app.use('/user',require('./routes/user'));
app.use('/auth/user',require('./routes/userAuth'));
app.use('/auth/admin',require('./routes/adminAuth'));
app.listen(port,()=>{
    console.log(`listening to port ${port}`);
})