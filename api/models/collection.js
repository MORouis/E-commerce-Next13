    const mongoose = require('mongoose');

    const productSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        image: {
            type: Object,
            required: true,
          }
    });

    const Product = mongoose.model('Product', productSchema)
    module.exports = Product