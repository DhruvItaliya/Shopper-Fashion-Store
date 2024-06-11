const UserRegister = require("../models/UserRegister");
const OTP = require("../models/otpSchema");
const nodemailer = require('nodemailer');
const speakeasy = require('speakeasy');
const { validationResult } = require('express-validator');
const getOtp = async (req, res) => {
    console.log("Hello from backend");
    const error = validationResult(req);
    const errorMsg = error.array().map(error => error.msg).join('\n');
    try {
        if (!error.isEmpty()) {
            return res.status(400).json({ error: errorMsg });
        }

        const { email } = req.body;
        const isEmail = await UserRegister.findOne({ email });
        if (isEmail) {
            return res.status(400).json({ error: "User already Exist" });
        }
        // Generate OTP
        const otpSecret = speakeasy.generateSecret().base32;
        const otp = speakeasy.totp({
            secret: otpSecret,
            step: 3600 // OTP is valid for 1 hour (3600 seconds)
        });

        // Calculate OTP expiry time
        const expiryTime = new Date();
        expiryTime.setTime(expiryTime.getTime() + 3600000); // 1 hour from now

        // Save OTP in the database
        const otpDoc = await OTP.create({ email, otpValue: otp, expiryTime, otpSecret });
        // Send OTP to user's email
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'codewithdhruv333@gmail.com',
                pass: process.env.PASS_KEY
            }
        });
        const mailOptions = {
            from: 'codewithdhruv333@gmail.com',
            to: email,
            subject: 'OTP Verification From Shoppers!',
            html: `<!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {
                    font-family: Arial, sans-serif;
                }
      
                .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                }
      
                h2 {
                  text-align: center;
                }
      
                .otp-box {
                  background-color: #f0f0f0;
                  padding: 20px;
                  text-align: center;
                  font-size: 24px;
                  font-weight: bold;
                }
      
                p {
                  text-align: center;
                }

                .signature {
                  text-align: left;
                }
      
            </style>
        </head>

        
        <body>
            <div class="container">
                <h2>Your One-Time Password (OTP)</h2>
                <p>Use the following OTP to proceed:</p>
                <div class="otp-box">
                  ${otp}
                </div>
                <p>This OTP is valid for a single use and will expire shortly. Do not share it with anyone.</p>
                <p>If you didn't request this OTP, please ignore this email.</p>
                <p class="signature">Regards,<br>Shoppers</p>
            </div>
        </body>

        
        </html>
        `
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("Failed to send OTP");
                return res.status(400).json({ error: "Failed to send OTP" });
            } else {
                console.log('Email sent: ' + info.response);
                return res.status(200).json({
                    success: true,
                    message: "Otp Sent Successfully",
                    otpDoc
                });
            }
        });
    }
    catch (error) {
        console.log("Internal Server Error");
        return res.status(500).json({ error: error.message })
    }
};

module.exports = { getOtp };