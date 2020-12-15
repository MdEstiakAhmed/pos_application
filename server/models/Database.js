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
            return {status: true, message: 'connected'}
        } 
        catch (error) {
            return {status: false, message: error.message}
        }
    }
}