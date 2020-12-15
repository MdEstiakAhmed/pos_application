const { Schema, model} = require('mongoose')
const {insert, find} = require('./Database')

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
            let result = await insert(dataModel)
			return result
		} 
		catch (error) {
			return {'status': false, 'message': error.message}
		}
    },
    findUser: async(data) => {
        try {
            let result = await find(User, data);
			return result;
        } 
        catch (error) {
            return {'status': false, 'message': error.message};
        }
    }
}