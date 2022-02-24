const ProductsModels = require('../models/ProductsModels');

const createProduct = async (name, quantity) => {
  const nameExisting = await ProductsModels.getFindByName(name);
  
  if (nameExisting) return false;

  const result = await ProductsModels.createProduct(name, quantity);  

  return result;
};

const updateProduct = async (id, name, quantity) => {
  const nameExisting = await ProductsModels.getFindById(id);
  
  if (!nameExisting) return false;

  const result = await ProductsModels.updateProduct(id, name, quantity);  

  return result;
};

const deleteProduct = async (id) => {
  const nameExisting = await ProductsModels.getFindById(id);
  
  if (!nameExisting) return false;

  const result = await ProductsModels.deleteProduct(id);  

  return result;
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
};