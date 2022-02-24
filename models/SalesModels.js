const connection = require('./connection');

const serialize = (array) => array.map((m) => (
  {
    saleId: m.sale_id,
    productId: m.product_id,
    quantity: m.quantity,
    date: m.date,
  }
));

const getAll = async () => {
  const SQL = `
  SELECT SA.*, S.* 
  FROM StoreManager.sales_products AS SA
  INNER JOIN StoreManager.sales AS S
  ON SA.sale_id = S.id
  ORDER BY sale_id ASC, product_id ASC;`;

  const [result] = await connection.execute(SQL);

  return serialize(result);
};

const getFindById = async (id) => {
  const SQL = `
  SELECT SA.product_id, SA.quantity, S.date
  FROM StoreManager.sales_products AS SA
  INNER JOIN StoreManager.sales AS S
  ON SA.sale_id = S.id
  WHERE id = ?
  ORDER BY sale_id ASC, product_id ASC;`;

  const [result] = await connection.execute(SQL, [id]);

  if (!result.length) return result;

  return serialize(result);
};

const createSales = async () => {
  const SQL = 'INSERT INTO StoreManager.sales () VALUES ();';

  const [result] = await connection.execute(SQL);

  return { id: result.insertId };
};

const createSalesProduct = async (id, productId, quantity) => {
  const SQL = `
  INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
  VALUES (?, ? ,?);`;

  await connection.execute(SQL, [id, productId, quantity]);

  return { productId, quantity };
};

module.exports = {
  getAll,
  getFindById,
  createSales,
  createSalesProduct,
};
