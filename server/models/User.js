const { Schema, model} = require('mongoose')
const {insertData, findData} = require('./Database')

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})

const User = model('User', userSchema)

module.exports = {
    registerUser: async(data) => {
        let {username, password} = data
        let dataModel = new User({username, password})
        try {
            let result = await insertData(dataModel)
			return result
		} 
		catch (error) {
			return {'status': false, 'message': error.message}
		}
    },
    findUser: async(data) => {
        try {
            let result = await findData(User, data);
			return result;
        } 
        catch (error) {
            return {'status': false, 'message': error.message};
        }
    }
}