// import express from 'express';
// import Product from '../models/Product';
const {Product} = require('../models/Product');
const UserRegister = require('../models/UserRegister');
const Order = require('../models/orderSchema');
const stripe = require("stripe")(process.env.STRIPE_KEY);

const fetch_all_products = async (req, res) => {
    try {
        const products = await Product.find({});
        if (!products) return res.status(404).json({ error: "Products Not Found!" });
        res.status(200).json({ success: true, products });
    }
    catch (err) {
        console.log("Error in fetch product : " + err.message);
        res.status(500).json({ error: err.message });
    }
}

const new_collections = async (req, res) => {
    try {
        const products = await Product.find({});
        if (!products) return res.status(404).json({ error: "Products Not Found!" });
        const new_collections = products.slice(1).slice(-8);
        res.status(200).json({ success: true, new_collections });
    }
    catch (err) {
        console.log("Error in fetch product : " + err.message);
        res.status(500).json({ error: err.message });
    }
}
const popular_in_women = async (req, res) => {
    try {
        const products = await Product.find({ category: "women" });
        if (!products) return res.status(404).json({ error: "Products Not Found!" });
        const popular_in_women = products.slice(0, 4);
        res.status(200).json({ success: true, popular_in_women });
    }
    catch (err) {
        console.log("Error in fetch product : " + err.message);
        res.status(500).json({ error: err.message });
    }
}

const add_to_cart = async (req, res) => {
    let userData = await UserRegister.findById(req.user._id);
    if (userData) {
        userData.cartItems[req.body.itemId] += 1
        await UserRegister.findOneAndUpdate({ _id: req.user._id }, { cartItems: userData.cartItems });
        return res.status(200).json({ success: true });
    }
    else {
        return res.status(400).json({ success: false });
    }
}

const remove_from_cart = async (req, res) => {
    let userData = await UserRegister.findById(req.user._id);
    if (userData) {
        userData.cartItems[req.body.itemId] -= 1
        await UserRegister.findOneAndUpdate({ _id: req.user._id }, { cartItems: userData.cartItems });
        return res.status(200).json({ success: true });
    }
    else {
        return res.status(400).json({ success: false });
    }
}

const delete_from_cart = async (req, res) => {
    let userData = await UserRegister.findById(req.user._id);
    if (userData) {
        userData.cartItems[req.body.itemId] = 0;
        await UserRegister.findOneAndUpdate({ _id: req.user._id }, { cartItems: userData.cartItems });
        return res.status(200).json({ success: true });
    }
    else {
        return res.status(400).json({ success: false });
    }
}
const clear_cart = async (req, res) => {
    let userData = await UserRegister.findById(req.user._id);
    if (userData) {
        for (let i = 0; i < 300; i++) {
            userData.cartItems[i] = 0;
        }
        await UserRegister.findOneAndUpdate({ _id: req.user._id }, { cartItems: userData.cartItems });
        return res.status(200).json({ success: true });
    }
    else {
        return res.status(400).json({ success: false });
    }
}

const get_cart = async (req, res) => {
    let userData = await UserRegister.findById(req.user._id);
    if (userData) {
        return res.status(200).json({ success: true, cartItems: userData.cartItems });
    }
    else {
        return res.status(400).json({ success: false });
    }
}

const place_order = async (req, res) => {
    // console.log(req.header('auth-token'), "  ", "In getcart");
    try {

        // destructuring body
        const { orderItems } = req.body;
        const line_items = orderItems.map((item)=>({
            price_data:{
                currency:"inr",
                product_data:{
                    name:item.name,
                },
                unit_amount:item.new_price*100,
            },
            quantity:item.qty
        }))
        const session = await stripe.checkout.sessions.create({
            payment_method_types:['card'],
            line_items:line_items,
            mode:"payment",
            success_url:`${process.env.FRONTEND_URL2}/checkout-success`,
            cancel_url:`${process.env.FRONTEND_URL2}/cart`,
        });

        const order = await Order({
            user: req.user._id,
            orderItems
        });

        await order.save();
        res.status(201).json({ orderId:order._id,success: true,id:session.id});
    }
    catch (err) {
        console.log("Error while place order : " + err.message);
        res.status(500).json({ error: "Internal server error!" });
    }
}
module.exports = { fetch_all_products, new_collections, popular_in_women, add_to_cart, remove_from_cart, delete_from_cart, clear_cart, get_cart, place_order };