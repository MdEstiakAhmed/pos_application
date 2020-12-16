const { Schema, model} = require('mongoose')
const {findAllData, findData, insertData, updateData, deleteData} = require('./Database');

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
        type: String,
        required: true
    },
    salesPrice: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    }
})

const Product = model('Product', productSchema)

module.exports = {
    getAll: async() => {
        try {
            let result = await findAllData(Product);
            return result;
        } 
        catch (error) {
            return {'status': false, 'message': error.message}
        }
    },
    getOne: async(data) => {
        try {
            let result = await findData(Product, data);
            return result;
        } 
        catch (error) {
            return {'status': false, 'message': error.message}
        }
    },
    insertOne: async(data) => {
        let dataModel = new Product(data);
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
            let result = await updateData(Product, data);
            return result;
        } 
        catch (error) {
            return {'status': false, 'message': error.message}
        }
    },
    deleteOne: async(data) => {
        try {
            let result = await deleteData(Product, data);
            return result;
        } 
        catch (error) {
            return {'status': false, 'message': error.message}
        }
    },
}