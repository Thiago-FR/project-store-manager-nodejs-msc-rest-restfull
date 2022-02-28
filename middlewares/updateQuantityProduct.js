const ProductsModels = require('../models/products.models');

const updateQuantityProduct = async (sales) => {
  const newPromise = sales.map((item) => ProductsModels
    .updateQuantityProduct(item.productId, item.quantity));

  await Promise.all(newPromise);

  return true;
};

const updateQuantityProductDelete = async (sales) => {
  const newPromise = sales.map((item) => ProductsModels
    .updateQuantityProductDelete(item.productId, item.quantity));

  await Promise.all(newPromise);

  return true;
};

module.exports = {
  updateQuantityProduct,
  updateQuantityProductDelete,
};
