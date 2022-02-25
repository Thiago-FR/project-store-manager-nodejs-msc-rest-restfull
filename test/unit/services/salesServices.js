const sinon = require('sinon');
const { expect } = require('chai');

const SalesModels = require('../../../models/SalesModels');
const SalesServices = require('../../../services/SalesServices')
const validateQuantity = require('../../../middlewares/validateQuantityProduct');

describe('"1" Cria um endpoint para cadastrar vendas', () => { 
    describe('Retorno positivo da solicitação', () => {
      const newSalesId = { id: 1 };
      const product = [
        {
          productId: 1,
          quantity: 3
        }
      ];

    before(() => {
      sinon.stub(SalesModels, 'createSales').resolves(newSalesId);
      sinon.stub(SalesModels, 'createSalesProduct').resolves(product[0]);
      sinon.stub(Promise, 'all').resolves(product);
    });

    after(() => {
      SalesModels.createSales.restore();
      SalesModels.createSalesProduct.restore();
      Promise.all.restore();
    });

    it('Retorna um objeto', async () => {
      const products = await SalesServices.createSales(product);

      expect(products).to.be.an('object');
    });

    it('Retorna um objetos com as informações de cadastro da venda', async () => {
      const products = await SalesServices.createSales(product);

      expect(products).to.have.property("id");
      expect(products).to.have.property("itemsSold");
      expect(products.itemsSold[0]).to.have.property("productId");
      expect(products.itemsSold[0]).to.have.property("quantity");
    });

  });
});

describe('"2" Atualizar uma venda', () => { 
  describe('Retorno positivo da solicitação "sales"', () => {
    const saleId = 1;
    const product = [{
      productId: 1,
      quantity: 6
    }]

    before(() => {
      sinon.stub(SalesModels, 'updateSales').resolves(product);
    });

    after(() => {
      SalesModels.updateSales.restore();
    });

    it('Retorna um array', async () => {
      const products = await SalesModels.updateSales(saleId, product[0].productId, product[0].quantity);

      expect(products).to.be.an('array');
    });

    it('Retorna um array com produto', async () => {
      const products = await SalesServices.updateSales(saleId, product[0].productId, product[0].quantity);

      expect(products).to.have.property("saleId");
      expect(products).to.have.property("itemUpdated");
    });
  });
});

describe('"4" Deleta uma venda', () => { 
  describe('Retorno negativo da solicitação', () => {
    const productId = 99;

    before(() => {
      sinon.stub(SalesModels, 'getFindById').resolves([]);
    });

    after(() => {
      SalesModels.getFindById.restore();
    });

    it('Retorna um boolean', async () => {
      const result = await SalesServices.deleteSales(productId);

      expect(result).to.be.a('boolean');
    });

    it('Retorna um valor false', async () => {
      const result = await SalesServices.deleteSales(productId);

      expect(result).to.be.false;
    });
  });

  describe('Retorno positivo da solicitação', () => {
    const productId = 1;

    before(() => {
      sinon.stub(SalesModels, 'getFindById').resolves([1]);
      sinon.stub(SalesModels, 'deleteSales').resolves(true);
    });

    after(() => {
      SalesModels.getFindById.restore();
      SalesModels.deleteSales.restore();
    });

    it('Retorna um boolean', async () => {
      const products = await SalesServices.deleteSales(productId);

      expect(products).to.be.true;
    });
  });
});

describe('"5" Valida a quantidade de produtos', () => { 
  describe('Retorno negativo da solicitação', () => {
    const product = [{
      productId: 1,
      quantity: 600,
    }]

    const error = {
      code: 422,
      message: 'Such amount is not permitted to sell'
    }

    before(() => {
      sinon.stub(validateQuantity, 'validateQuantityProduct').resolves(error);
    });

    after(() => {
      validateQuantity.validateQuantityProduct.restore();
    });

    it('Retorna um objeto', async () => {
      const result = await SalesServices.createSales(product);

      expect(result).to.be.a('object');
    });

    it('Retorna um valor de erro', async () => {
      const result = await SalesServices.createSales(product);

      expect(result).to.have.property("code");
      expect(result).to.have.property("message");
      expect(result.message).to.be.equal("Such amount is not permitted to sell");
    });
  });
});