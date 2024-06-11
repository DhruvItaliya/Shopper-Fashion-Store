// import express from 'express';
// const router = express.Router();
// import multer from 'multer';
// import {product_upload,add_products,remove_product,fetch_all_products} from '../controllers/adminController';
// import adminAuth from '../middlewares/adminAuth';

const express = require('express');
const router = express.Router();
const multer = require('multer');
const {product_upload,add_products,remove_product,fetch_all_products} = require('../controllers/adminController');
const adminAuth = require('../middlewares/adminAuth');

// creating options for multer
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        return cb(null,'./public/uploads/productImages');
    },
    filename:function(req,file,cb){
        return cb(null, `${Date.now()}-${file.fieldname}-${file.originalname}`);
    }
});

const upload = multer({storage});

//  route for uploading new product image in website
router.post('/product-upload',upload.single('product'),product_upload);

//  route for add products
router.post('/add-product',add_products); 

//  route for remove products
router.delete('/remove-product/:id',remove_product); 

// route for fetch all products
router.get('/fetchallproducts',fetch_all_products);

module.exports = router;

