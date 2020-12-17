const invoice = require('../models/Invoice');

const product = require('../models/Product');

module.exports = {
    getCount: async(req, res, next) => {
        try {
            const invoiceCount = await invoice.getAll();    
            if(invoiceCount.status){
                try {
                    const productCount = await product.getAll();    
                    if(productCount.status){
                        return res.status(200).json({'invoiceCount': invoiceCount.data.length, 'productCount': productCount.data.length});
                    }
                    else{
                        return res.status(412).json(result);
                    }
                } 
                catch (error) {
                    return res.status(412).json({'status': false, 'message': error.message});
                }
            }
            else{
                return res.status(412).json(result);
            }
        } 
        catch (error) {
            return res.status(412).json({'status': false, 'message': error.message});
        }
    }
}