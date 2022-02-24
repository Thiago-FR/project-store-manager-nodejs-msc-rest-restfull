const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const productsModels = require('../../../models/ProductsModels');

describe('"1" Verifica endpoints para listar os produtos', () => { 
  describe('Retorno negativo da solicitação', () => {
    const result = [[],[]];

    before(() => {
      sinon.stub(connection, 'execute').resolves(result);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Retorna um array', async () => {
      const result = await productsModels.getAll();

      expect(result).to.be.an('array');
    });

    it('Retorna um array vazio', async () => {
      const result = await productsModels.getAll();

      expect(result).to.be.empty;
    });

  });

  describe('Retorno positivo da solicitação', () => {
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
      sinon.stub(connection, 'execute').resolves(result);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Retorna um array', async () => {
      const products = await productsModels.getAll();

      expect(products).to.be.an('array');
    });

    it('Retorna um array de objetos', async () => {
      const products = await productsModels.getAll();

      expect(products).to.be.equal(result[0]);
    });

  });
});

describe('"2" Verifica endpoints para listar os produtos pelo ID', () => {
  describe('Retorno negativo da solicitação', () => {
    const result = [[false],[]];
    const NOT_VALID_ID = 100;   

    before(() => {
      sinon.stub(connection, 'execute').resolves(result);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Retorna um Boolean', async () => {
      const result = await productsModels.getFindById(NOT_VALID_ID);

      expect(result).to.be.a('boolean');
    });

    it('Retorna um valor vazio', async () => {
      const result = await productsModels.getFindById(NOT_VALID_ID);

      expect(result).to.be.false;
    });

  });

  describe('Retorno positivo da solicitação', () => {
    const IS_VALID_ID = 1;
    const result = [
    [{
      id: 1,
      name: 'Martelo de Thor',
      quantity: 10,
    }],[]
  ];

    before(() => {
      sinon.stub(connection, 'execute').resolves(result);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Retorna um objeto', async () => {
      const products = await productsModels.getFindById(IS_VALID_ID);

      expect(products).to.be.an('object');
    });

    it('Retorna um objeto com todas informações', async () => {
      const products = await productsModels.getFindById(IS_VALID_ID);

      expect(products).to.be.equal(result[0][0]);
    });

  });
});

describe('"3" Cria um endpoint para o cadastro de produtos', () => {
  describe('Retorno positivo da solicitação', () => {
    const result = [{ insertId: 4 }]
    const newProduct = {
      name: 'Machadão',
      quantity: 3,
    }

    before(() => {
      sinon.stub(connection, 'execute').resolves(result);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Retorna um objeto', async () => {
      const products = await productsModels.createProduct(newProduct.name, newProduct.quantity);

      expect(products).to.be.an('object');
    });

    it('Retorna um objeto com todas informações', async () => {
      const products = await productsModels.createProduct(newProduct.name, newProduct.quantity);

      expect(products).to.have.property("id");
      expect(products).to.have.property("name");
      expect(products).to.have.property("quantity");
    });

  });
});

describe('"4" Verifica produtos pelo Name', () => {
  describe('Retorno negativo da solicitação', () => {
    const result = [[false],[]];
    const NOT_VALID_NAME = 'Xablau';   

    before(() => {
      sinon.stub(connection, 'execute').resolves(result);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Retorna um Boolean', async () => {
      const result = await productsModels.getFindByName(NOT_VALID_NAME);

      expect(result).to.be.a('boolean');
    });

    it('Retorna um valor vazio', async () => {
      const result = await productsModels.getFindById(NOT_VALID_NAME);

      expect(result).to.be.false;
    });

  });

  describe('Retorno positivo da solicitação', () => {
    const IS_VALID_NAME = 'Xablau';
    const result = [
    [{
      id: 4,
      name: 'Xablau',
      quantity: 50,
    }],[]
  ];

    before(() => {
      sinon.stub(connection, 'execute').resolves(result);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Retorna um objeto', async () => {
      const products = await productsModels.getFindByName(IS_VALID_NAME);

      expect(products).to.be.an('object');
    });

    it('Retorna um objeto com todas informações', async () => {
      const products = await productsModels.getFindByName(IS_VALID_NAME);

      expect(products).to.be.equal(result[0][0]);
    });

  });
});

describe('"5" Crie um endpoint para atualizar um produto', () => {
  describe('Retorno positivo da solicitação', () => {
    const newProduct = {
      id: 1,
      name: 'Machadão',
      quantity: 30,
    };

    before(() => {
      sinon.stub(connection, 'execute').resolves(true);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Retorna um objeto', async () => {
      const products = await productsModels.updateProduct(newProduct.id, newProduct.name, newProduct.quantity);

      expect(products).to.be.an('object');
    });

    it('Retorna um objeto com todas informações', async () => {
      const products = await productsModels.updateProduct(newProduct.id, newProduct.name, newProduct.quantity);

      expect(products).to.have.property("id");
      expect(products).to.have.property("name");
      expect(products).to.have.property("quantity");
    });

  });
});

describe('"6" Crie um endpoint para deletar um produto', () => {
  describe('Retorno positivo da solicitação', () => {
    const productID = 99; 

    before(() => {
      sinon.stub(connection, 'execute').resolves(true);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Retorna um boolean', async () => {
      const products = await productsModels.deleteProduct(productID);

      expect(products).to.be.an('boolean');
    });

    it('Retorna um valor true', async () => {
      const products = await productsModels.deleteProduct(productID);

      expect(products).to.be.true;
    });
    
  });
});