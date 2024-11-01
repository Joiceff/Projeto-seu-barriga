import '../../page/AdicionarContaPage/AdicionarPage'
import '../../page/LoginPage/LoginPage'
import '../../page/ListarPage/ListarPage'
import { faker } from '@faker-js/faker'

describe('Adicionar Conta', function() {

const url='https://seubarriga.wcaquino.me/login'
const msgAlerta='.alert'
const randomName = faker.name.lastName()

beforeEach(function() {
  cy.visit(url)
  cy.fillInName('2008@teste.com')
  cy.fillInPassword('123')
  cy.clickButton()
  cy.get('.dropdown-toggle').click()
  cy.get('a[href^="/addConta"]').click()
  const testTitlesToRunBeforeEach = [
    'Adicionar conta com nome muito extenso'
  ]
  if (testTitlesToRunBeforeEach.includes(this.currentTest.title)) {
    cy.deleteAccount();
    cy.get('.dropdown-toggle').click()
    cy.get('a[href^="/addConta"]').click()
  }
})

afterEach(function() {
  const testTitlesToRunAfterEach = [
    'Adicionar conta com nome já existente'
  ]

  if (testTitlesToRunAfterEach.includes(this.currentTest.title)) {
    cy.deleteAccount()
  }
})

it('Adicionar conta com sucesso', function() {
  cy.fillInAccount(randomName)
  cy.clickSave()
  cy.get(msgAlerta)
    .should('be.visible')
    .should('have.text', 'Conta adicionada com sucesso!')
})

it('Adicionar conta com nome em branco', function() {
  cy.clickSave()
  cy.get(msgAlerta)
    .should('be.visible')
    .should('have.text', 'Informe o nome da conta')
})

it('Adicionar conta com nome já existente', function() {
  cy.fillInAccount(randomName)
  cy.clickSave()
  cy.get(msgAlerta)
    .should('be.visible')
    .should('have.text', 'Já existe uma conta com esse nome!')
})


})
