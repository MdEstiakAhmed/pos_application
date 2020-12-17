const router = require('express').Router();
const {
    getAllProduct,
    getOneProduct,
    insertProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController')
const loginCheck = require('../middleware/authMiddleware')

router.get('/:id', loginCheck, getOneProduct)
router.get('/', loginCheck, getAllProduct)
router.post('/', loginCheck, insertProduct)
router.put('/:id', loginCheck, updateProduct)
router.delete('/:id', loginCheck, deleteProduct)

module.exports = router;