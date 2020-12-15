const {connect} = require('mongoose')

module.exports = {
    connectDatabase: async () => {
        try {
            let connection = await connect(process.env.DB_PATH, {
                useNewUrlParser: true, 
                useUnifiedTopology: true, 
                useFindAndModify: false,
                useCreateIndex: true
            })
            return {'status': true, 'message': 'connected'}
        } 
        catch (error) {
            return {'status': false, 'message': error.message}
        }
    },
    findAllData: async(model) => {
        try {
            let result = await model.find();
            if(result.length > 0){
                return {'status': true, 'data': result, 'message': 'data found successfully'};
            }
            else{
                return {'status': false, 'message': 'data not found'};
            }
        } 
        catch (error) {
            return {'status': false, 'message': error.message};
        }
    },
    findData: async(model, data) => {
        try {
            let result = await model.findOne(data.find, data.makeFalse).populate(data.populateColumn, data.displayColumn)
            if(result){
                return {'status': true, 'data': result, 'message': 'data exist'};
            }
            else{
                return {'status': false, 'data': result, 'message': 'data not found'};
            }
        } 
        catch (error) {
            console.log("database")
            return {'status': false, 'message': error.message};
        }
    },
    insertData: async (data) => {
        try {
            let result = await data.save();
            return {'status': true, 'data': result, 'message': 'successfully inserted'};
        } 
        catch (error) {
            return {'status': false, 'message': error.message};
        }
    },
    updateData: async (model, data) => {
        try {
            let result = await model.findOneAndUpdate(data.find, {$set: data.updateValue }, {new: true});
            if(!result){
                return {'status': false, 'message': "data not found"};
            }
            else{
                return {'status': true, 'data': result, 'message': 'successfully update'};
            }
        } 
        catch (error) {
            return {'status': false, 'message': error.message};
        }
    },
    deleteData: async (model, data) => {
        try {
            let result = await model.findOneAndRemove(data.find);
            if(!result){
                return {'status': false, 'message': "data not found"};
            }
            else{
                return {'status': true, 'data': result, 'message': 'successfully deleted'};
            }
        } 
        catch (error) {
            return {'status': false, 'message': error.message};
        }
    }
}