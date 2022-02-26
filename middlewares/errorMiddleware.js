module.exports = (err, _req, res, _next) => {
  if (err.error) {
    const [code, message] = err.error.split('|');
    return res.status(code).json({ message });
  }
  console.log(err);
};
