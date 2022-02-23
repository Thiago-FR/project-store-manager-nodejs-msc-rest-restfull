const express = require('express');
const ProductsController = require('../controllers/ProductsController');

const router = express.Router();

router.get('/', ProductsController.getAll);
router.get('/:id', ProductsController.getFindById);

module.exports = router;
