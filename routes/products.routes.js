const express = require('express');
const rescue = require('express-rescue');
const ProductsController = require('../controllers/products.controller');
const validateJoi = require('../middlewares/joiProducts');

const router = express.Router();

router.get('/', rescue(ProductsController.getAll));
router.get('/:id', rescue(ProductsController.getFindById));

router.post('/', validateJoi, rescue(ProductsController.createProduct));

router.put('/:id', validateJoi, rescue(ProductsController.updateProduct));

router.delete('/:id', rescue(ProductsController.deleteProduct));

module.exports = router;
