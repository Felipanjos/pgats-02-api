// Libraries
const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');

// Application
const app = require('../../app');

// Mock
const transferService = require('../../service/transferService');

// Testes
describe('Transfer Controller', () => {
  describe('POST /transfers', () => {
    it('Quando informo remetente e destinatário inexistentes, o retorno será 400', async () => {
      const resposta = await request(app).post('/transfers').send({
        from: 'julio',
        to: 'priscila',
        value: 100,
      });
      expect(resposta.status).to.equal(400);
      expect(resposta.body).to.have.property('error', 'Usuário remetente ou destinatário não encontrado');
    });

    it('Quando informo remetente e destinatário inexistentes, o retorno será 400', async () => {
      // Mockar apenas a função transfer do service
      const transferServiceMock = sinon.stub(transferService, 'transfer');
      transferServiceMock.throws(new Error('Usuário remetente ou destinatário não encontrado'));

      const resposta = await request(app).post('/transfers').send({
        from: 'julio',
        to: 'priscila',
        value: 100,
      });
      expect(resposta.status).to.equal(400);
      expect(resposta.body).to.have.property('error', 'Usuário remetente ou destinatário não encontrado');

      // Resetar o Mock
      sinon.restore();
    });
  });
});
