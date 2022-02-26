const express = require('express');
const rescue = require('express-rescue');
const SalesController = require('../controllers/SalesController');
const validateJoi = require('../middlewares/joiSales');

const router = express.Router();

router.get('/', rescue(SalesController.getAll));
router.get('/:id', rescue(SalesController.getFindById));

router.post('/', validateJoi, rescue(SalesController.createSales));

router.put('/:id', validateJoi, rescue(SalesController.updateSales));

router.delete('/:id', rescue(SalesController.deleteSales));

module.exports = router;
