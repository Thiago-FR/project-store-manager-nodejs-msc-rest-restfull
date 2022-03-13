module.exports = (err, _req, res, _next) => {
  const ERROR_DB = 'ER_BAD_DB_ERROR';
  const ERROR_SQL = 'SELECT * FROM StoreManager.products WHERE id = ?';
  if (err.error) {
    const [code, message] = err.error.split('|');
    return res.status(code).json({ message });
  }
  if (!err.code) return res.status(500).json({ message: 'Server Error' });

  if (err.code.includes(ERROR_DB) && err.sql.includes(ERROR_SQL)) {
    return res.status(404).json({ message: 'Product not found' });
  }
};
