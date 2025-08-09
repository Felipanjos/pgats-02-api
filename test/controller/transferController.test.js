// Libraries
const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');

// Application
const app = require('../../app');

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
  });
});
