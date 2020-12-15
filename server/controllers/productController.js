const {
    getAll,
    getOne,
    insertOne,
    updateOne,
    deleteOne
} = require('../models/Product');

module.exports = {
    getAllProduct: async(req, res, next) => {
        try {
            const result = await getAll();    
            if(result.status){
                return res.status(200).json(result);
            }
            else{
                return res.status(412).json(result);
            }
        } 
        catch (error) {
            return res.status(412).json({'status': false, 'message': error.message});
        }
    },
    getOneProduct: async(req, res, next) => {
        let data = {
            find: {'_id': req.params.id},
        }
        try {
            const result = await getOne(data);    
            if(result.status){
                return res.status(200).json(result);
            }
            else{
                return res.status(412).json(result);
            }
        } 
        catch (error) {
            console.log("database")
            return res.status(412).json({'status': false, 'message': error.message});
        }
    },
    insertProduct: async(req, res, next) => {
        const { name, barcode, image, purchasePrice, salesPrice, quantity } = req.body;
        const data = { name, barcode, image, purchasePrice, salesPrice, quantity };
        let obj = {
            find: {barcode},
        }
        try {
            const result = await getOne(obj);
            if(!result.status){
                if(result.data === null){
                    console.log(result)
                    try {
                        const result = await insertOne(data);    
                        return res.status(200).json(result);
                    } 
                    catch (error) {
                        return res.status(412).json({'status': false, 'message': error.message});
                    }
                }
                else{
                    return res.status(412).json(result);
                }
            }
            else{
                return res.status(412).json({'status': false, 'message': "already exist"});
            }
        } 
        catch (error) {
            return res.status(412).json({'status': false, 'message': error.message});
        }
    },
    updateProduct: async(req, res, next) => {
        const { name, image, purchasePrice, salesPrice, quantity } = req.body;
        const data = { name, image, purchasePrice, salesPrice, quantity };
        let obj = {
            find: {'_id': req.params.id},
            updateValue: data
        }
        try {
            const result = await updateOne(obj);    
            return res.status(200).json(result);
        } 
        catch (error) {
            return res.status(412).json({'status': false, 'message': error.message});
        }
    },
    deleteProduct: async(req, res, next) => {
        let obj = {
            find: {'_id': req.params.id}
        }
        try {
            const result = await deleteOne(obj);    
            return res.status(200).json(result);
        } 
        catch (error) {
            return res.status(412).json({'status': false, 'message': error.message});
        }
    },
}