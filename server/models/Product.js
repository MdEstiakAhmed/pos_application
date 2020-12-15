const { Schema, model} = require('mongoose')

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    barcode: {
        type: String,
        required: true
    },
    image: [{
        type: String,
        required: true
    }],
    purchasePrice: {
        type: Number,
        required: true
    },
    salesPrice: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
})

const Product = model('Product', productSchema)