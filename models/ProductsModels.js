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

module.exports = {
  getAll,
  getFindById,
};
