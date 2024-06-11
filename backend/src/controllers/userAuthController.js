// import UserRegister from '../models/UserRegister';
// import { validationResult } from 'express-validator';
// import bcrypt from 'bcryptjs';
const UserRegister = require('../models/UserRegister');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const OTP = require("../models/otpSchema");


const userRegister = async (req, res) => {

    // getting error from validationResult() through req object
    const error = validationResult(req);
    const errorMsg = error.array().map(error => error.msg).join('\n');
    if (!error.isEmpty()) {
        return res.status(400).json({ success: false, error: errorMsg });
    }

    try {

        // destructuring body
        const { name, email, password ,otp} = req.body;

        // cheaking user is already exist or not
        const user = await UserRegister.findOne({ email });

        if (user) {
            return res.status(400).json({ success: false, error: "User with this email already exist!" });
        }

        // fetch latest otp
        const otpDoc = await OTP.findOne({ email }).sort({createdAt:-1});
        if (!otpDoc) {
            return res.status(400).json({ success: false, error: "Invalid OTP1" });
        }
        // Verify OTP value
        if (otp !== otpDoc.otpValue) {
            return res.status(400).json({ success: false, error: "Invalid OTP2" });
        }
        // Verify OTP expiry time (optional, depending on your requirements)
        if (otpDoc.expiryTime < Date.now()) {
            return res.status(400).json({ success: false, error: "OTP Expired, Get New OTP" });
        }

        let cartItems = {};

        for(let i=0;i<300;i++){
            cartItems[i] = 0;
        }
        const registerUser = await UserRegister({
            name,
            email,
            password,
            cartItems
        });

        await registerUser.save();
        res.status(201).json({ success: true });
    }
    catch (err) {
        console.log("Error while registering : " + err.message);
        res.status(500).json({ error: "Internal server error!" });
    }
}


const userLogin = async (req, res) => {
    const error = validationResult(req);
    const errorMsg = error.array().map(error => error.msg).join('\n');
    if (!error.isEmpty()) {
        return res.status(400).json({ success: false, error: errorMsg });
    }

    try {
        // destructuring req.body
        const { email, password } = req.body;

        const user = await UserRegister.findOne({ email }).select('+password');

        if (user) {
            if (await bcrypt.compare(password, user.password)) {
                const token = await user.generateToken();
                const options = {
                    httpOnly: true,
                    expiresIn: process.env.EXPIRES_IN
                }
                res.status(201).cookie('token', token, options).json({ success: true,token:token,userData: user });
            }
            else {
                console.log("Password not matching!");
                res.status(400).json({ success: false,error: "Invalid user credentials!" });
            }
        }
        else {
            console.log("User not found!");
            res.status(400).json({  success: false,error: "Invalid user credentials!" });
        }
    }
    catch (err) {
        console.log("Error while logging : " + err.message);
        res.status(500).json({ success: false, error: "Internal server error!" });
    }
}

const userLogout = async (req, res,) => {
    console.log("From backend");
    res.status(201).cookie("token", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
    }).json({
        success: true,
        message: "User Logged Out Successfully"
    })
};

module.exports = { userRegister, userLogin,userLogout };