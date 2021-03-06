require('dotenv').config();
const express = require('express');
const errorMiddleware = require('./middlewares/errorMiddleware');

const productsRoutes = require('./routes/products.routes');
const salesRoutes = require('./routes/sales.routes');

const app = express();

app.use(express.json());

app.use('/products', productsRoutes);
app.use('/sales', salesRoutes);

app.use(errorMiddleware);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
