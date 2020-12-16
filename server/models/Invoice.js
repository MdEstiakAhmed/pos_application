const { Schema, model} = require('mongoose')
const {ObjectId} = mongoose.Schema.Types;

const invoiceSchema = new Schema({
    customerName: {
        type: String,
        default: 'anonymous',
        required: true
    },
    product: [{
        id: {
            type: ObjectId,
            ref: "Product"
        },
        name: {
            type: String,
            required: true
        },
        quantity: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true
        },
        totalPrice: {
            type: String,
            required: true
        }
    }],
    totalPrice: {
        type: String,
        required: true
    },
    paidAmount: {
        type: String,
        required: true
    },
    dueAmount: {
        type: String,
    }
})

const Invoice = model('Invoice', invoiceSchema)