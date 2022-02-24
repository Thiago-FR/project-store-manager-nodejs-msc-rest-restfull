const sinon = require('sinon');
const { expect } = require('chai');

const SalesModels = require('../../../models/SalesModels');
const SalesServices = require('../../../services/SalesServices')

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