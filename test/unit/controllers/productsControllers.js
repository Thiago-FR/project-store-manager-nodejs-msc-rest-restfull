const sinon = require('sinon');
const { expect } = require('chai');

const ProductsModels = require('../../../models/ProductsModels');
const ProductsServices = require('../../../services/ProductsService');
const ProductsController = require('../../../controllers/ProductsController');

describe('"1" Crie endpoints para listar os produtos', () => {
  describe('Retorno negativo da solicitação', () => {
    const response = {};
    const request = {};
    const next = () => {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(ProductsModels, 'getAll').resolves(false);
    });

    after(() => {
      ProductsModels.getAll.restore();
    });

    it('Retorna um status 404', async () => {
      await ProductsController.getAll(request, response, next);

      expect(response.status.calledWith(404)).to.be.equal(true);
    });

    it('Retorna uma message "Product not found"', async () => {
      await ProductsController.getAll(request, response, next);

      expect(response.json.calledWith({ message: 'Product not found' })).to.be.equal(true);
    });
  });

  describe('Retorno positivo da solicitação', () => {
    const response = {};
    const request = {};
    const next = () => {};

    const result = [
    [{
      id: 1,
      name: 'Martelo de Thor',
      quantity: 10,
    },
    {
      id: 2,
      name: 'Traje De Encolhimento',
      quantity: 20,
    }],[]
  ];

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(ProductsModels, 'getAll').resolves(result[0]);
    });

    after(() => {
      ProductsModels.getAll.restore();
    });

    it('Retorna um status 200', async () => {
      await ProductsController.getAll(request, response, next);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('Retorna um objetos', async () => {
      await ProductsController.getAll(request, response, next);

      expect(response.json.calledWith(result[0])).to.be.equal(true);
    });

  });
});

describe('"2" Crie endpoints para listar os produtos pelo ID', () => {
  describe('Retorno negativo da solicitação', () => {
    const response = {};
    const request = {};
    const next = () => {};

    before(() => {
      request.params = { id: 100 };
      
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(ProductsModels, 'getFindById').resolves(false);
    });

    after(() => {
      ProductsModels.getFindById.restore();
    });

    it('Retorna um status 404', async () => {
      await ProductsController.getFindById(request, response, next);

      expect(response.status.calledWith(404)).to.be.equal(true);
    });

    it('Retorna uma message "Product not found"', async () => {
      await ProductsController.getFindById(request, response, next);

      expect(response.json.calledWith({ message: 'Product not found' })).to.be.equal(true);
    });
  });

  describe('Retorno positivo da solicitação', () => {
    const response = {};
    const request = {};
    const next = () => {};

    const result = [
    [{
      id: 1,
      name: 'Martelo de Thor',
      quantity: 10,
    }],[]
  ];

    before(() => {
      request.params = { id: 1 };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(ProductsModels, 'getFindById').resolves(result[0]);
    });

    after(() => {
      ProductsModels.getFindById.restore();
    });

    it('Retorna um status 200', async () => {
      await ProductsController.getFindById(request, response, next);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('Retorna um objetos', async () => {
      await ProductsController.getFindById(request, response, next);

      expect(response.json.calledWith(result[0])).to.be.equal(true);
    });

  });
});

describe('"3" Cria um endpoint para o cadastro de produtos', () => {
  describe('Retorno negativo da solicitação', () => {
    const response = {};
    const request = {};
    const next = () => {};

    before(() => {
      request.body = {
        name: 'Machadão',
        quantity: 3,
      };
      
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(ProductsServices, 'createProduct').resolves(false);
    });

    after(() => {
      ProductsServices.createProduct.restore();
    });

    it('Retorna um status 409', async () => {
      await ProductsController.createProduct(request, response, next);

      expect(response.status.calledWith(409)).to.be.equal(true);
    });

    it('Retorna uma message "Product already exists"', async () => {
      await ProductsController.createProduct(request, response, next);

      expect(response.json.calledWith({ message: 'Product already exists' })).to.be.equal(true);
    });
  });

  describe('Retorno positivo da solicitação', () => {
    const response = {};
    const request = {};
    const next = () => {};

    const result = {
      id: 5,
      name: 'Machadão',
      quantity: 3,
    };

    before(() => {
      request.body = {
        name: 'Machadão',
        quantity: 3,
      };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(ProductsServices, 'createProduct').resolves(result);
    });

    after(() => {
      ProductsServices.createProduct.restore();
    });

    it('Retorna um status 201', async () => {
      await ProductsController.createProduct(request, response, next);

      expect(response.status.calledWith(201)).to.be.equal(true);
    });

    it('Retorna um objetos', async () => {
      await ProductsController.createProduct(request, response, next);

      expect(response.json.calledWith(result)).to.be.equal(true);
    });
  });
});