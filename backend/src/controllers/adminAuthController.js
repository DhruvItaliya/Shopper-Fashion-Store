// import  AdminRegister from '../models/AdminRegister';
// import  { validationResult } from 'express-validator';
// import  bcrypt from 'bcryptjs';
const AdminRegister = require('../models/AdminRegister');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

// const adminRegister = async (req, res) => {

//     // getting error from validationResult() through req object
//     const error = validationResult(req);
//     if (!error.isEmpty()) {
//         return res.status(400).json({ error: error.array() });
//     }

//     try {

//         // destructuring body
//         const { name, email, password, cpassword } = req.body;

//         // cheaking password and confirm password 
//         if (password !== cpassword) return res.status(400).json({ error: "password and confirm password are not matched!" });

//         // cheaking user is already exist or not
//         const admin = await AdminRegister.findOne({ email });

//         if (admin) {
//             return res.status(400).json({ error: "admin with this email already exist!" });
//         }

//         const registerAdmin = await AdminRegister({
//             name,
//             email,
//             password
//         });

//         await registerAdmin.save();
//         res.status(201).json({ success: "Admin registered successfully!" });
//     }
//     catch (err) {
//         console.log("Error while registering : " + err.message);
//         res.status(500).json({ error: "Internal server error!" });
//     }
// }

const adminLogin = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) return res.status(400).json({ error: error });

    try {
        // destructuring req.body
        const { email, password } = req.body;

        const admin = await AdminRegister.findOne({ email });

        if (admin) {
            if (await bcrypt.compare(password, admin.password)) {
                const token = await admin.generateToken();
                const options = {
                    httpOnly: true,
                    expiresIn: process.env.EXPIRES_IN
                }
                res.status(201).cookie('token', token, options).json({ success: "Admin logged in successfully", adminData: admin });
            }
            else {
                console.log("Password not matching!");
                return res.status(400).json({ error: "Invalid email or password" });
            }
        }
        else {
            console.log("Admin not found!");
            return res.status(400).json({ error: "Invalid email or password" });
        }
    }
    catch (err) {
        console.log("Error while logging : " + err);
        res.status(500).json({ error: "Internal server error!" });
    }
}

const adminLogout = async (req, res,) => {
    res.status(201).cookie("token", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
    }).json({
        success: true,
        message: "User Logged Out Successfully"
    })
};

module.exports = { adminLogin,adminLogout };