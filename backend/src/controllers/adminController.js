// import express from 'express';
// import Product from '../models/Product';
const express = require('express');
const Product = require('../models/Product');
const app = express();

// controller for upload product
// app.use('/public', express.static('public'));
const product_upload = (req, res) => {
    console.log(req.file.path);
    res.status(201).json({ success: true, image_url: `http://localhost:${process.env.PORT}/public/uploads/productImages/${req.file.filename}` });
}

// controller for add products
const add_products = async (req, res) => {
    try {
        const product = new Product({
            id:1,
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            new_price: req.body.new_price,
            old_price: req.body.old_price,
        });
        await product.save();
        res.status(201).json({ success: true, product });
    }
    catch (err) {
        console.log("Error in add_product : " + err.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

//controller for removing products
const remove_product = async (req, res) => {
    try{
        const product_id = req.params.id;
        let product = await Product.findById(product_id);
        if(!product) return res.status(404).json({error:"Product Not Found!"});
        await Product.findByIdAndDelete(product_id).then((product)=>{
            return res.status(200).json({success:"Product has been removed!"});
        }).catch((err)=>{
            console.log("Error in find and delete");
            throw new Error(err);
        })
    }
    catch(err){
        console.log("Error in delete product : "+err.message);
        res.status(500).json({error:err.message});
    }
}

const fetch_all_products = async(req,res) =>{
    try{
        const products = await Product.find({});
        if(!products) return res.status(404).json({error:"Products Not Found!"});
        res.status(200).json({success:true,products});
    }
    catch(err){
        console.log("Error in fetch product : "+err.message);
        res.status(500).json({error:err.message});
    }
}
module.exports = { product_upload, add_products, remove_product,fetch_all_products };