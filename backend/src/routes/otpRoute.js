const express  =  require("express");
const { getOtp } =  require("../controllers/otpController");
const router = express.Router();
const {body} = require('express-validator');

router.post('/getotp',[
    body('email','Enter valid email!').isEmail(),
], getOtp);

module.exports = router;