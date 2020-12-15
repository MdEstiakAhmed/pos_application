const { Schema, model} = require('mongoose')
const {ObjectId} = mongoose.Schema.Types;

const invoiceSchema = new Schema({
    customerName: {
        type: String,
        default: 'anonymous',
        required: true
    },
    product: {
        type: ObjectId,
        ref: "Product"
    },
    quantity: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    dueAmount: {
        type: Number,
        required: true
    }
})

const Invoice = model('Invoice', invoiceSchema)