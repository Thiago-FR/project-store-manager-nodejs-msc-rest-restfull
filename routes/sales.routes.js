const express = require('express');
const SalesController = require('../controllers/SalesController');
const validateJoi = require('../middlewares/joiSales');

const router = express.Router();

router.get('/', SalesController.getAll);
router.get('/:id', SalesController.getFindById);

router.post('/', validateJoi, SalesController.createSales);

router.put('/:id', validateJoi, SalesController.updateSales);

module.exports = router;
