const SalesModels = require('../models/SalesModels');

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

module.exports = {
  getAll,
  getFindById,
};