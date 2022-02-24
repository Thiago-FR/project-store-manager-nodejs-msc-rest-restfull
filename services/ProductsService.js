const ProductsModels = require('../models/ProductsModels');

const createProduct = async (name, quantity) => {
  const nameExisting = await ProductsModels.getFindByName(name);
  
  if (nameExisting) return false;

  const result = await ProductsModels.createProduct(name, quantity);  

  return result;
};

module.exports = {
  createProduct,
};