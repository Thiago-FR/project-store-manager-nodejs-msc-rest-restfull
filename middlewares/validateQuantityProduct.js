const ProductModels = require('../models/ProductsModels');

const validateQuantityProduct = async (sales) => {
  const validateQuantity = await sales.map((item) => 
  ProductModels.getFindById(item.productId));

  const validations = await Promise.all(validateQuantity);

  if (validations[0].quantity <= 0 || validations[0].quantity < sales[0].quantity) {
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
