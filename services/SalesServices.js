const SalesModels = require('../models/SalesModels');

const createSales = async (sales) => {
  const newSalesId = await SalesModels.createSales();

  const newPromise = sales.map((item) => SalesModels
    .createSalesProduct(newSalesId.id, item.productId, item.quantity));

  const result = await Promise.all(newPromise);

  return {
    id: newSalesId.id,
    itemsSold: result,
  };
};

module.exports = {
  createSales,
};
