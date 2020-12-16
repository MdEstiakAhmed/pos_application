const {
    insertOne,
    getAll,
    getOne,
    updateOne
} = require('../models/Invoice');

module.exports = {
    getAllInvoice: async(req, res, next) => {
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
    getOneInvoice: async(req, res, next) => {
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
    insertInvoice: async(req, res, next) => {
        try {
            const result = await insertOne(req.body);    
            return res.status(200).json(result);
        } 
        catch (error) {
            return res.status(412).json({'status': false, 'message': error.message});
        }
    },
    updateInvoice: async(req, res, next) => {
        let obj = {
            find: {'_id': req.params.id},
            updateValue: req.body
        }
        try {
            const result = await updateOne(obj);    
            return res.status(200).json(result);
        } 
        catch (error) {
            return res.status(412).json({'status': false, 'message': error.message});
        }
    },
}