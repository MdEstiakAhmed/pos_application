const router = require('express').Router();

const {insertInvoice, getAllInvoice, getOneInvoice, updateInvoice} = require('../controllers/invoiceController')

router.get('/:id', getOneInvoice)
router.get('/', getAllInvoice)
router.post('/', insertInvoice)
router.put('/:id', updateInvoice)

module.exports = router;