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
    find: async(model, data) => {
        try {
            let result = await model.findOne(data.find, data.makeFalse).populate(data.populateColumn, data.displayColumn)
            if(result){
                return {'status': true, 'data': result, 'message': 'user found successfully'};
            }
            else{
                return {'status': false, 'message': 'user not found'};
            }
        } 
        catch (error) {
            return {'status': false, 'message': error.message};
        }
    },
    insert: async (data) => {
        try {
            let result = await data.save();
            return {'status': true, 'data': result, 'message': 'successfully inserted'};
        } 
        catch (error) {
            return {'status': false, 'message': error.message};
        }
    },
}