const sinon = require('sinon');
const { expect } = require('chai');

const ProductsModels = require('../../../models/ProductsModels');
const ProductsServices = require('../../../services/ProductsService')

describe('"1" Verifica produtos por Name', () => { 
  describe('Retorno negativo da solicitação', () => {
    const request = {
      name: 'Machadão',
      quantity: 3,
    }

    before(() => {
      sinon.stub(ProductsModels, 'getFindByName').resolves(true);
    });

    after(() => {
      ProductsModels.getFindByName.restore();
    });

    it('Retorna um boolean', async () => {
      const result = await ProductsServices.createProduct(request.name, request.quantity);

      expect(result).to.be.a('boolean');
    });

    it('Retorna um valor false', async () => {
      const result = await ProductsServices.createProduct(request.name, request.quantity);

      expect(result).to.be.false;
    });
  });

  describe('Retorno positivo da solicitação', () => {
    const request = {
      name: 'Machadão',
      quantity: 3,
    }

    const result = {
      id: 4,
      name: 'Machadão',
      quantity: 3,
    };

    before(() => {
      sinon.stub(ProductsModels, 'getFindByName').resolves(false);
      sinon.stub(ProductsModels, 'createProduct').resolves(result);
    });

    after(() => {
      ProductsModels.getFindByName.restore();
      ProductsModels.createProduct.restore();
    });

    it('Retorna um objeto', async () => {
      const products = await ProductsServices.createProduct(request.name, request.quantity);

      expect(products).to.be.an('object');
    });

    it('Retorna um array de objetos', async () => {
      const products = await ProductsServices.createProduct(request.name, request.quantity);

      expect(products).to.be.equal(result);
    });

  });
});
