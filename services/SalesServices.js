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

const updateSales = async (saleId, productId, quantity) => {
  // const nameExisting = await SalesModels.getFindById(id);
  
  // if (!nameExisting.length) return false;

  const result = await SalesModels.updateSales(saleId, productId, quantity);  

  return {
    saleId,
    itemUpdated: result,
  };
};

module.exports = {
  createSales,
  updateSales,
};
