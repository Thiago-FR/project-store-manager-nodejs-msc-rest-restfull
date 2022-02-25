const SalesModels = require('../models/SalesModels');
const SalesServices = require('../services/SalesServices');

const getAll = async (_req, res, _next) => {
  const result = await SalesModels.getAll();

  if (!result.length) return res.status(404).json({ message: 'Sale not found' });

  return res.status(200).json(result);
};

const getFindById = async (req, res, _next) => {
  const { id } = req.params;

  const result = await SalesModels.getFindById(id);

  if (!result.length) return res.status(404).json({ message: 'Sale not found' });

  return res.status(200).json(result);
};

const createSales = async (req, res, _next) => {
  const sales = req.body;

  const result = await SalesServices.createSales(sales);

  if (!result.error) return res.status(201).json(result);

  // if (!result) return res.status(404).json({ message: 'Sale not found' });

  return res.status(result.error.code).json({ message: result.error.message });  
};

const updateSales = async (req, res) => {
  const { id } = req.params;
  const [sales] = req.body;

  const result = await SalesServices.updateSales(id, sales.productId, sales.quantity);
  
  // if (!result) return res.status(404).json({ message: 'Sale not found' });

  return res.status(200).json(result);
};

const deleteSales = async (req, res) => {
  const { id } = req.params;

  const result = await SalesServices.deleteSales(id);
  
  if (!result) return res.status(404).json({ message: 'Sale not found' });

  return res.status(204).json();
};

module.exports = {
  getAll,
  getFindById,
  createSales,
  updateSales,
  deleteSales,
};
