// import mongoose from 'mongoose';
const mongoose = require('mongoose');
const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserRegister',
        required: true
    },
    orderItems:{
        type:[],
        required:true
    },
    status:{
        enum:['Placed','Processing','Shipped','Delivered','Cancelled'],
        type:String,
        required:true,
        default:"Placed"
    }
}, { timestamps: true })

const Order = new mongoose.model('Order', orderSchema);
module.exports = Order;