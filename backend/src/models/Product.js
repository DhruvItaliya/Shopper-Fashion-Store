// import mongoose from 'mongoose';
const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    id: {
        type: Number,
        unique: true, // Ensures each ID is unique
        required:true
    },
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    new_price:{
        type:Number,
        required:true
    },
    old_price:{
        type:Number,
        required:true
    },
    available:{
        type:Boolean,
        default:true
    }
},{timestamps:true}) 


productSchema.pre('save',async function(next){
    try {
        // If the document is new (not being updated), assign a new unique ID
        console.log("pre save");
        if (this.isNew) {
            // Find the maximum ID value in existing documents and increment by 1
            const maxIdDoc = await this.constructor.find().sort({ id: -1 }).limit(1);
            this.id = maxIdDoc.length > 0 ? maxIdDoc[0].id + 1 : 1; // Increment ID by 1
        }
        next();
    } catch (error) {
        next(error);
    }
    next();
});

const Product = new mongoose.model('Product',productSchema);
module.exports = {Product,productSchema};