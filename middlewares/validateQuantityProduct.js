const ProductModels = require('../models/ProductsModels');

const validateQuantityProduct = async (sales) => {
  const promiseDataProducts = await sales.map((item) => 
  ProductModels.getFindById(item.productId));

  const resultDataProducts = await Promise.all(promiseDataProducts);

  let result = false;

  sales.forEach((item) => {
    const findById = resultDataProducts.find((product) => product.id === item.productId);
    if (findById && (findById.quantity <= 0 || findById.quantity <= item.quantity)) result = true;
  });

  if (result) {
    return {
      error: {
        code: 422,
        message: 'Such amount is not permitted to sell',
      },
    };
  }
};

module.exports = {
  validateQuantityProduct,
};
