const bcrypt = require('bcryptjs');
const {registerUser, findUser} = require('../models/User')
const jwt = require('jsonwebtoken');

module.exports = {
    signupController: async(req, res, next) => {
        let { username, password, confirmPassword } = req.body

        try {
            let hashedPassword = await bcrypt.hash(password, 10);
            let data = { 
                username, 
                password: hashedPassword
             }
            let result = await registerUser(data)
            if(result.status){
                return res.status(200).json(result);
            }
            else{
                return res.status(412).json({'status': false, 'message': "registration failed"});
            }
		} 
		catch (error) {
			return res.status(412).json({'status': false, 'message': error.message});
        }
    },

    loginController: async(req, res, next) => {
        let { username, password } = req.body
        let data = {
            find: {username},
            makeFalse: {},
            populateColumn: '',
            displayColumn: ''
        }
        try {
            let result = await findUser(data)
			if(result.status){
                let match = await bcrypt.compare(password, result.data.password)
				if(match){
                    const token = jwt.sign({username}, process.env.AUTH_TOKEN, {expiresIn: '2h'});
                    return res.status(200).json({...result, 'token': token});
				}
				else{
                    return res.status(412).json({'status': false, 'message': "invalid credential"});
				}
			}
			else{
				return res.status(412).json({'status': false, 'message': "invalid credential"});
			}
        } 
        catch (error) {
            return res.status(412).json({'status': false, 'message': error.message});
        }
    }
}