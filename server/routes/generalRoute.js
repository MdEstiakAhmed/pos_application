const router = require('express').Router();
const {getCount} = require('../controllers/generalController')
const loginCheck = require('../middleware/authMiddleware')

router.get('/getCount', loginCheck, getCount)

module.exports = router;