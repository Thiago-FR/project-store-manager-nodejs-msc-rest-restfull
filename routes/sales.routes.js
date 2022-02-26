const express = require('express');
const rescue = require('express-rescue');
const SalesController = require('../controllers/SalesController');
const validateJoi = require('../middlewares/joiSales');

const router = express.Router();

router.get('/', SalesController.getAll);
router.get('/:id', SalesController.getFindById);

router.post('/', validateJoi, rescue(SalesController.createSales));

router.put('/:id', validateJoi, SalesController.updateSales);

router.delete('/:id', SalesController.deleteSales);

module.exports = router;
