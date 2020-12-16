const { Schema, model} = require('mongoose')
const {ObjectId} = Schema.Types;
const {insertData, findAllData, findData, updateData} = require('./Database')

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

module.exports = {
    getAll: async() => {
        try {
            let result = await findAllData(Invoice);
            return result;
        } 
        catch (error) {
            return {'status': false, 'message': error.message}
        }
    },
    getOne: async(data) => {
        try {
            let result = await findData(Invoice, data);
            return result;
        } 
        catch (error) {
            return {'status': false, 'message': error.message}
        }
    },
    insertOne: async(data) => {
        let dataModel = new Invoice(data);
        try {
            let result = await insertData(dataModel);
            return result;
        } 
        catch (error) {
            return {'status': false, 'message': error.message}
        }
    },
    updateOne: async(data) => {
        try {
            let result = await updateData(Invoice, data);
            return result;
        } 
        catch (error) {
            return {'status': false, 'message': error.message}
        }
    },
}