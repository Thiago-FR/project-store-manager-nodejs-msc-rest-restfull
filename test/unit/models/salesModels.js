const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const salesModels = require('../../../models/SalesModels');

describe('"1" Verifica endpoints para listar as Vendas', () => { 
  describe('Retorno negativo da solicitação', () => {
    const result = [[],[]];

    before(() => {
      sinon.stub(connection, 'execute').resolves(result);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Retorna um array', async () => {
      const result = await salesModels.getAll();

      expect(result).to.be.an('array');
    });

    it('Retorna um array vazio', async () => {
      const result = await salesModels.getAll();

      expect(result).to.be.empty;
    });

  });

  describe('Retorno positivo da solicitação', () => {
    const result = [
    [{
      sale_id: 1,
      product_id: 1,
      quantity: 5,
      date: '2022-02-23T21:11:03.000Z'
    },
    {
      sale_id: 1,
      product_id: 2,
      quantity: 10,
      date: '2022-02-23T21:11:03.000Z'
    }],[]
  ];

    before(() => {
      sinon.stub(connection, 'execute').resolves(result);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Retorna um array', async () => {
      const products = await salesModels.getAll();

      expect(products).to.be.an('array');
    });

    it('Retorna um array de objetos', async () => {
      const products = await salesModels.getAll();

      expect(products[0]).to.have.property("saleId");
      expect(products[0]).to.have.property("productId");
      expect(products[0]).to.have.property("quantity");
      expect(products[0]).to.have.property("date");
    });

  });
});

describe('"2" Verifica endpoints para listar as vendas pelo ID', () => { 
  describe('Retorno negativo da solicitação', () => {
    const result = [[],[]];
    const NOT_VALID_ID = 100;   

    before(() => {
      sinon.stub(connection, 'execute').resolves(result);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Retorna um Boolean', async () => {
      const result = await salesModels.getFindById(NOT_VALID_ID);

      expect(result).to.be.a('array');
    });

    it('Retorna um valor vazio', async () => {
      const result = await salesModels.getFindById(NOT_VALID_ID);

      expect(result).to.be.empty;
    });

  });

  describe('Retorno positivo da solicitação', () => {
    const IS_VALID_ID = 1;
    const result = [
    [{
      product_id: 1,
      quantity: 5,
      date: '2022-02-23T21:11:03.000Z'
    }],[]
  ];

    before(() => {
      sinon.stub(connection, 'execute').resolves(result);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Retorna um array', async () => {
      const products = await salesModels.getFindById(IS_VALID_ID);

      expect(products).to.be.an('array');
    });

    it('Retorna um objeto com todas informações', async () => {
      const products = await salesModels.getFindById(IS_VALID_ID);

      expect(products[0]).to.have.property("productId");
      expect(products[0]).to.have.property("quantity");
      expect(products[0]).to.have.property("date");
    });

  });
});