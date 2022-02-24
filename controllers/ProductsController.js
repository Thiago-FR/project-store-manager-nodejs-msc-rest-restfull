const ProductsModels = require('../models/ProductsModels');
const ProductsServices = require('../services/ProductsService');

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

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;

  const result = await ProductsServices.createProduct(name, quantity);
  
  if (!result) return res.status(409).json({ message: 'Product already exists' });

  return res.status(201).json(result);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const result = await ProductsServices.updateProduct(id, name, quantity);
  
  if (!result) return res.status(404).json({ message: 'Product not found' });

  return res.status(200).json(result);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const result = await ProductsServices.deleteProduct(id);
  
  if (!result) return res.status(404).json({ message: 'Product not found' });

  return res.status(204).json();
};

module.exports = {
  getAll,
  getFindById,
  createProduct,
  updateProduct,
  deleteProduct,
};
