const ProductsModels = require('../models/ProductsModels');

const getAll = async (_req, res, _next) => {
  const result = await ProductsModels.getAll();

  if (!result.length) return res.status(404).json({ message: 'Product not found' });

  return res.status(200).json(result);
};

const getFindById = async (req, res, _next) => {
  const { id } = req.params;

  const result = await ProductsModels.getFindById(id);

  if (!result) return res.status(404).json({ message: 'Product not found' });

  return res.status(200).json(result);
};

module.exports = {
  getAll,
  getFindById,
};
