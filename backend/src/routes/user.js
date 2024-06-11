// import express from 'express';
// const router = express.Router();
// import multer from 'multer';
// import {product_upload,add_products,remove_product,fetch_all_products} from '../controllers/adminController';
// import adminAuth from '../middlewares/adminAuth';

const express = require('express');
const router = express.Router();
const {fetch_all_products,new_collections,popular_in_women,add_to_cart,remove_from_cart,delete_from_cart,clear_cart,get_cart,place_order} = require('../controllers/userController');
const userAuth = require('../middlewares/userAuth');



// route for fetch all products
router.get('/fetchallproducts',fetch_all_products);

// route for fetch new collection products
router.get('/newcollections',new_collections);

// route for fetch popular in women products
router.get('/popularinwomen',popular_in_women);
router.post('/addtocart',userAuth,add_to_cart);
router.post('/removefromcart',userAuth,remove_from_cart);
router.post('/deletefromcart',userAuth,delete_from_cart);
router.post('/clearcart',userAuth,clear_cart);
router.get('/getcart',userAuth,get_cart);
router.post('/placeorder',userAuth,place_order);

module.exports = router;

