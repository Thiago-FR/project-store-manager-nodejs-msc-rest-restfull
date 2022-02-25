const SalesModels = require('../models/SalesModels');
const validateQuantity = require('../middlewares/validateQuantityProduct');

const createSales = async (sales) => {
  const isQuantityValid = await validateQuantity.validateQuantityProduct(sales);

  if (isQuantityValid) return isQuantityValid;
  
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

const deleteSales = async (id) => {
  const nameExisting = await SalesModels.getFindById(id);

  if (!nameExisting.length) return false;
  
  const result = await SalesModels.deleteSales(id);  

  return result;
};

module.exports = {
  createSales,
  updateSales,
  deleteSales,
};
