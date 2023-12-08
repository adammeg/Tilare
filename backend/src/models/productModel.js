const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0 // Ensures the price is not negative
    },
    images: [{
        type: String,
        trim: true // Optional, trims whitespace from the image URLs
    }],
    category:{
        type: String,
        require: true,
    }
});

module.exports = mongoose.model('product', productSchema);
