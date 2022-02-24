const connection = require('./connection');

const getAll = async () => {
  const SQL = 'SELECT * FROM StoreManager.products '
            + 'ORDER BY id ASC';
  const [result] = await connection.execute(SQL);

  return result;
};

const getFindById = async (id) => {
  const SQL = 'SELECT * FROM StoreManager.products WHERE id = ?';
  const [result] = await connection.execute(SQL, [id]);

  return result[0];
};

const getFindByName = async (name) => {
  const SQL = 'SELECT * FROM StoreManager.products WHERE name = ?';
  const [result] = await connection.execute(SQL, [name]);

  return result[0];
};

const createProduct = async (name, quantity) => {
  const SQL = 'INSERT INTO StoreManager.products(name, quantity) VALUES(?,?);';

  const [result] = await connection.execute(SQL, [name, quantity]);

  return {
    id: result.insertId,
    name,
    quantity,
  };
};

module.exports = {
  getAll,
  getFindById,
  getFindByName,
  createProduct,
};
