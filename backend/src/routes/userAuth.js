// import express from 'express';
// import {userRegister,userLogin} from '../controllers/userAuthController';
const express = require('express');
const {userRegister,userLogin,userLogout} = require('../controllers/userAuthController');
const router = express.Router();

// destructuring express-validator
// import {body} from 'express-validator';
const {body} = require('express-validator');
const userAuth = require('../middlewares/userAuth');

router.post('/register',[
    body('name','Enter valid name!').isLength({min:3}),
    body('email','Enter valid email address').isEmail(),
    body('password','Enter valid password!').isStrongPassword(),
    body('otp', 'Enter a valid OTP').isNumeric()
],userRegister);

router.post('/login',[
    //Validation using express-validator
    body('email',"Enter valid email address").isEmail(),
    body('password',"Incorrect password!").isStrongPassword()
],userLogin);

router.get('/logout', userAuth, userLogout);


module.exports = router;