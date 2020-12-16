const {
    insertOne,
    getAll,
    getOneInvoice,
    updateOneInvoice
} = require('../models/Invoice');

const {updateOne, getOne} = require('../models/Product')

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
            const result = await getOneInvoice(data);    
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
            if(result.status){
                for(let i=0; i<req.body.product.length; i++){
                    const id = req.body.product[i]._id
                    const quantity = req.body.product[i].quantity
                    try {
                        let findData = {
                            find: {'_id': id},
                        }
                        const getResult = await getOne(findData);
                        if(getResult.status){
                            const totalQuantity = getResult.data.quantity;
                            try {
                                let obj = {
                                    find: {'_id': id},
                                    updateValue: {quantity: parseInt(totalQuantity) - parseInt(quantity)}
                                }
                                const updateResult = await updateOne(obj)
                                return res.status(200).json(result);
                            } 
                            catch (error) {
                                return res.status(412).json({'status': false, 'message': error.message});
                            }
                        }
                    } 
                    catch (error) {
                        return res.status(412).json({'status': false, 'message': error.message});
                    }
                }
            }   
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
            const result = await updateOneInvoice(obj);    
            return res.status(200).json(result);
        } 
        catch (error) {
            return res.status(412).json({'status': false, 'message': error.message});
        }
    },
}