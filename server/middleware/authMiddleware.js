const jwt = require('jsonwebtoken');
const {findUser} = require('../models/User')

module.exports = async (req, res, next) => {
    const { authorization } = req.headers;
    if(authorization){
        const token = authorization.replace("Bearer ", "");
        try {
            let jwtCheck = await jwt.verify(token, process.env.AUTH_TOKEN);
            if(jwtCheck){
                try {
                    let result = await findUser({username: jwtCheck.username});
                    if(result){
                        req.user = result;
                        next();
                    }
                    else{
                        return res.status(401).json({'status': false, 'message': 'user not found'});
                    }
                } 
                catch (error) {
                    return res.status(401).json({'status': false, 'message': 'must be logged in'})
                }
            }
        } 
        catch (error) {
            console.log(error.message);
            return res.status(401).json({'status': false, 'message': 'Unauthorized'})
        }
    }
    else{
        return res.status(401).json({'status': false, 'message': 'must be logged in'})
    }
}
