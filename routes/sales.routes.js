const express = require('express');
const SalesController = require('../controllers/SalesController');

const router = express.Router();

router.get('/', SalesController.getAll);
router.get('/:id', SalesController.getFindById);

router.post('/', SalesController.createSales);

router.put('/:id', SalesController.updateSales);

module.exports = router;
