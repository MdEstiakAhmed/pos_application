const router = require('express').Router();
const {
    getAllProduct,
    getOneProduct,
    insertProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController')

router.get('/:id', getOneProduct)
router.get('/', getAllProduct)
router.post('/', insertProduct)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)

module.exports = router;