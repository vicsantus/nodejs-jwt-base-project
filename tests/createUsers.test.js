const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

const server = require('../src/api/app');

// Importação do modelo original, contido em `models`, a partir da raiz, em `/src`
const { User } = require('../src/models');
// Importação do mock utilizado nesse contexto
const { User: userMock } = require('./mock/models');

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota /api/users', () => {
  const ENDPOINT = '/api/users';

  before(() => {
    // Intercepta, com stubs, os métodos utilizados pelo modelo do
    // sequelize e os substitui pelos nossos mocks, através da função
    // `callsFake`, antes de começarmos os testes
    sinon.stub(User, 'create').callsFake(userMock.create);
    sinon.stub(User, 'findAll').callsFake(userMock.findAll);
  });

  after(() => {
    // Restaura o comportamento normal dos métodos do modelo
    // (Remove a interceptação), após os testes
    User.create.restore();
    User.findAll.restore();
  });

  describe('Consulta a lista de pessoas usuárias', () => {
    let response;

    before(async () => {
      response = await chai.request(server).get(ENDPOINT);
    });

    it('Essa requisição deve retornar código de status 200', () => {
      expect(response).to.have.status(200);
    });

    it('Traz uma lista inicial contendo dois registros de pessoas usuárias', () => {
      expect(response.body).to.have.length(2);
    });
  });

  describe('Insere um novo registro', () => {
    let createRequest = {};
    let firstUserList = [];
    let secondUserList = [];
    const newUser = {
      username: 'jane',
      password: 'senha123',
    };

    before(async () => {
      /*
                Antes de validar os testes, serão feitas três requisições:
                (1) Validação da lista de usuários inicial: `firstUserList`
                (2) Criação de um novo usuário: `createRequest`
                (3) Re-validação da lista, que deve conter o 
                    novo registro: `secondUserList`
            */
      firstUserList = await chai
        .request(server)
        .get(ENDPOINT)
        .then(({ body }) => body);
      createRequest = await chai.request(server).post(ENDPOINT).send(newUser);
      secondUserList = await chai
        .request(server)
        .get(ENDPOINT)
        .then(({ body }) => body);
    });

    describe('firstUserList', () => {
      it('A primeira requisição GET para a rota deve retornar 2 registros', () => {
        expect(firstUserList).to.have.length(2);
      });
    });

    describe('createRequest', () => {
      it('A requisição POST para a rota retorna o código de status 201', () => {
        expect(createRequest).to.have.status(201);
      });

      it('A requisição deve retornar um objeto no corpo da resposta', () => {
        expect(createRequest.body).to.be.a('object');
      });

      it('O objeto possui a propriedade "message"', () => {
        expect(createRequest.body).to.have.property('message');
      });

      it('A propriedade "message" possui o texto "Novo usuário criado com sucesso"', () => {
        expect(createRequest.body.message).to.be.equal(
          'Novo usuário criado com sucesso',
        );
      });
    });

    describe('secondUserList', () => {
      it('A segunda requisição GET para rota deve retornar, por tanto, 3 registros', () => {
        expect(secondUserList).to.have.length(3);
      });

      it('O registro criado deve corresponder ao enviado na requisição POST', () => {
        expect(secondUserList[2]).to.contain(newUser);
      });
    });
  });
});
