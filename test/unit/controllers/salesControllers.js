const sinon = require('sinon');
const { expect } = require('chai');

const SalesModels = require('../../../models/SalesModels');
const SalesController = require('../../../controllers/SalesController');

describe('"1" Crie endpoints para listar as Vendas', () => {
  describe('Retorno negativo da solicitação', () => {
    const response = {};
    const request = {};
    const next = () => {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(SalesModels, 'getAll').resolves(false);
    });

    after(() => {
      SalesModels.getAll.restore();
    });

    it('Retorna um status 404', async () => {
      await SalesController.getAll(request, response, next);

      expect(response.status.calledWith(404)).to.be.equal(true);
    });

    it('Retorna uma message', async () => {
      await SalesController.getAll(request, response, next);

      expect(response.json.calledWith({ message: 'Sale not found' })).to.be.equal(true);
    });
  });

  describe('Retorno positivo da solicitação', () => {
    const response = {};
    const request = {};
    const next = () => {};

    const result = [
    [{
      saleId: 1,
      productId: 1,
      quantity: 5,
      date: '2022-02-23T21:11:03.000Z'
    },
    {
      saleId: 1,
      productId: 2,
      quantity: 10,
      date: '2022-02-23T21:11:03.000Z'
    }],[]
  ];

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(SalesModels, 'getAll').resolves(result[0]);
    });

    after(() => {
      SalesModels.getAll.restore();
    });

    it('Retorna um status 200', async () => {
      await SalesController.getAll(request, response, next);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('Retorna um objetos', async () => {
      await SalesController.getAll(request, response, next);

      expect(response.json.calledWith(result[0])).to.be.equal(true);
    });

  });
});

describe('"2" Crie endpoints para listar as Vendas pelo ID', () => {
  describe('Retorno negativo da solicitação', () => {
    const response = {};
    const request = {};
    const next = () => {};

    before(() => {
      request.params = { id: 100 };
      
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(SalesModels, 'getFindById').resolves([]);
    });

    after(() => {
      SalesModels.getFindById.restore();
    });

    it('Retorna um status 404', async () => {
      await SalesController.getFindById(request, response, next);

      expect(response.status.calledWith(404)).to.be.equal(true);
    });

    it('Retorna uma message', async () => {
      await SalesController.getFindById(request, response, next);

      expect(response.json.calledWith({ message: 'Sale not found' })).to.be.equal(true);
    });
  });

  describe('Retorno positivo da solicitação', () => {
    const response = {};
    const request = {};
    const next = () => {};

    const result = [
    [{
      productId: 1,
      quantity: 5,
      date: '2022-02-23T21:11:03.000Z'
    }],[]
  ];

    before(() => {
      request.params = { id: 1 };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(SalesModels, 'getFindById').resolves(result[0]);
    });

    after(() => {
      SalesModels.getFindById.restore();
    });

    it('Retorna um status 200', async () => {
      await SalesController.getFindById(request, response, next);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('Retorna um objetos', async () => {
      await SalesController.getFindById(request, response, next);

      expect(response.json.calledWith(result[0])).to.be.equal(true);
    });

  });
});