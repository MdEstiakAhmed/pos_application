const router = require('express').Router();
const {insertInvoice, getAllInvoice, getOneInvoice, updateInvoice} = require('../controllers/invoiceController')
const loginCheck = require('../middleware/authMiddleware')

router.get('/:id', loginCheck, getOneInvoice)
router.get('/', loginCheck, getAllInvoice)
router.post('/', loginCheck, insertInvoice)
router.put('/:id', loginCheck, updateInvoice)

module.exports = router;