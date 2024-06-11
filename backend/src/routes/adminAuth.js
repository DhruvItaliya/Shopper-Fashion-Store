// import express from 'express';
const express = require('express');
const router = express.Router();
// import {adminLogin} from '../controllers/adminAuthController';
const {adminLogin,adminLogout}  = require('../controllers/adminAuthController');

// destructuring express-validator
// import {body} from 'express-validator';
const {body} = require('express-validator');
const adminAuth = require('../middlewares/adminAuth');

// router.post('/register',[
//     body('name','Enter valid name!').isLength({min:3}),
//     body('email','Enter valid email!').isEmail(),
//     body('password','Enter valid password!').isStrongPassword(),
//     body('cpassword','Enter valid confirm password!').isStrongPassword()
// ],adminRegister);

router.post('/login',[
    //Validation using express-validator
    body('email',"Enter valid email address").isEmail(),
    body('password',"Incorrect password!").isStrongPassword()
],adminLogin);

router.get('/logout', adminAuth, adminLogout)

module.exports = router;