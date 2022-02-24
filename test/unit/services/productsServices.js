const sinon = require('sinon');
const { expect } = require('chai');

const ProductsModels = require('../../../models/ProductsModels');
const ProductsServices = require('../../../services/ProductsService')

describe('"1" Criar um produto', () => { 
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

describe('"2" Atualizar um produto', () => { 
  describe('Retorno negativo da solicitação', () => {
    const request = {
      id: 999,
      name: 'Machadão',
      quantity: 3,
    }

    before(() => {
      sinon.stub(ProductsModels, 'getFindById').resolves(false);
    });

    after(() => {
      ProductsModels.getFindById.restore();
    });

    it('Retorna um boolean', async () => {
      const result = await ProductsServices.updateProduct(request.id, request.name, request.quantity);

      expect(result).to.be.a('boolean');
    });

    it('Retorna um valor false', async () => {
      const result = await ProductsServices.updateProduct(request.id, request.name, request.quantity);

      expect(result).to.be.false;
    });
  });

  describe('Retorno positivo da solicitação', () => {
    const request = {
      id: 1,
      name: 'Machadão',
      quantity: 3,
    }

    const result = {
      id: 1,
      name: 'Xablau',
      quantity: 30,
    };

    before(() => {
      sinon.stub(ProductsModels, 'getFindById').resolves(true);
      sinon.stub(ProductsModels, 'updateProduct').resolves(result);
    });

    after(() => {
      ProductsModels.getFindById.restore();
      ProductsModels.updateProduct.restore();
    });

    it('Retorna um objeto', async () => {
      const products = await ProductsServices.updateProduct(request.id, request.name, request.quantity);

      expect(products).to.be.an('object');
    });

    it('Retorna um array de objetos', async () => {
      const products = await ProductsServices.updateProduct(request.id, request.name, request.quantity);

      expect(products).to.be.equal(result);
    });

  });
});

describe('"3" Deleta um produto', () => { 
  describe('Retorno negativo da solicitação', () => {
    const productId = 99;

    before(() => {
      sinon.stub(ProductsModels, 'getFindById').resolves(false);
    });

    after(() => {
      ProductsModels.getFindById.restore();
    });

    it('Retorna um boolean', async () => {
      const result = await ProductsServices.deleteProduct(productId);

      expect(result).to.be.a('boolean');
    });

    it('Retorna um valor false', async () => {
      const result = await ProductsServices.deleteProduct(productId);

      expect(result).to.be.false;
    });
  });

  describe('Retorno positivo da solicitação', () => {
    const productId = 1;

    before(() => {
      sinon.stub(ProductsModels, 'getFindById').resolves(true);
      sinon.stub(ProductsModels, 'deleteProduct').resolves(true);
    });

    after(() => {
      ProductsModels.getFindById.restore();
      ProductsModels.deleteProduct.restore();
    });

    it('Retorna um boolean', async () => {
      const products = await ProductsServices.deleteProduct(productId);

      expect(products).to.be.an('boolean');
    });

    it('Retorna um array de objetos', async () => {
      const products = await ProductsServices.deleteProduct(productId);

      expect(products).to.be.true;
    });

  });
});
