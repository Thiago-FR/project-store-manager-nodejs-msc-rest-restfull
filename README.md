
# Boas vindas ao repositório do projeto Store Manager!

---

# Sumário

- [Habilidades Desenvolvidas](#habilidades)
- [O que foi desenvolvido](#o-que-foi-desenvolvido)
- [Desenvolvimento](#desenvolvimento)
- [Conexão com o Banco](#conexao-db)
- [Para testar o projeto](#testar-o-projeto)
- [Arquivos de teste](#arquivos-de-test)

---

## Habilidades desenvolvidas: <a name="habilidades"></a>

- Desenvolver uma API utilizando o método TDD;
- Entender o funcionamento da camada de Model;
- Delegar responsabilidades específicas para essa camada;
- Conectar aplicação com diferentes bancos de dados;
- Estruturar uma aplicação em camadas;
- Delegar responsabilidades específicas para cada parte do app;
- Melhorar manutenibilidade e reusabilidade do código;
- Entender e aplicar os padrões REST;
- Escrever assinaturas para APIs intuitivas e facilmente entendíveis.

---

## O que foi desenvolvido: <a name="o-que-foi-desenvolvido"></a>

minha primeira API utilizando a arquitetura MSC!

A API trata-se de um sistema de gerenciamento de vendas, onde é possível criar, visualizar, deletar e atualizar produtos e vendas.

---

## Desenvolvimento: <a name="desenvolvimento"></a>

Foi desenvolvido todas as camadas da API (Models, Services caso necessário, e Controllers).

Através dessa aplicação, é possível realizar as operações básicas que se pode fazer em um determinado banco de dados: Criação, Leitura, Atualização e Exclusão (ou `CRUD`).

Foi utilizar o banco MySQL para a gestão de dados. Além disso, a API é RESTful.

⚠️ **Pacotes** ⚠️:

- Foi criado um middlewares de erro personalizado para não repetir a lógica de tratamento de erro em vários lugare, bem como o pacote [express-rescue](https://www.npmjs.com/package/express-rescue) para deixar o código mais enxuto.

- Para realizar a validação dos dados, foi utilizado o pacote [Joi](https://www.npmjs.com/package/joi).

---

### Conexão com o Banco: <a name="conexao-db"></a>

**⚠️ IMPORTANTE! ⚠️**

Essa API utiliza as seguintes variáveis de ambiente:

```sh
MYSQL_HOST=
MYSQL_USER=
MYSQL_PASSWORD=
PORT=
```

---

## Para testar o projeto: <a name="testar-o-projeto"></a>

1. Clone o repositório

- `git clone https://github.com/Thiago-FR/project-store-manager-nodejs-msc-rest-restfull.git`.
- Entre na pasta do repositório que você acabou de clonar.

2. Instale as dependências.

- `npm install`

Atenção :warning: Não rode o comando npm audit fix! Ele atualiza várias dependências do projeto, e essa atualização gera conflitos com o avaliador.

3. Para iniciar o server.

- `npm start`

4. Para rodar os testes.

- `npm run test:mocha`

---

### Arquivos de teste: <a name="arquivos-de-test"></a>

```tree
.
├─ ...
├─ test                              
│   └─ unit  
|       ├─ controllers
│            ├─ productsControllers.js
│            └─ salesControllers.js 
|       ├─ services   
│            ├─ productsServices.js            
│            └─ salesServices.js 
|       └─ models
│            ├─ productsModels.js 
│            └─ salesModels.js 
└─ ...
```

---