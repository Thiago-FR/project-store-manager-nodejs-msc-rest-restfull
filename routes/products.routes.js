const express = require('express');
const ProductsController = require('../controllers/ProductsController');
const validateJoi = require('../middlewares/joiProducts');

const router = express.Router();

router.get('/', ProductsController.getAll);
router.get('/:id', ProductsController.getFindById);

router.post('/', validateJoi, ProductsController.createProduct);

router.put('/:id', validateJoi, ProductsController.updateProduct);

router.delete('/:id', ProductsController.deleteProduct);

module.exports = router;
