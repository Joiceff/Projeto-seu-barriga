import '../../page/AdicionarContaPage/AdicionarPage.js'
import '../../page/LoginPage/LoginPage'
import '../../page/ListarPage/ListarPage'
import '../../page/EditarContasListadasPage/EditarContasListadasPage.js'
import { faker } from '@faker-js/faker'

describe('Editar Contas Listadas', function() {

const url='https://seubarriga.wcaquino.me/login'
const msgAlerta='.alert'
const randomName = faker.name.lastName()

beforeEach(function() {
  cy.visit(url)
  cy.fillInName('200808@teste.com')
  cy.fillInPassword('123456')
  cy.clickButton()
  cy.get('.dropdown-toggle').click()
  cy.get('a[href^="/contas"]').click()
})

it('Editar conta com sucesso', function() {
  cy.editAccount()
  cy.clearField()
  cy.fillInAccount(randomName)
  cy.clickSave()
  cy.get(msgAlerta)
    .should('be.visible')
    .should('have.text', 'Conta alterada com sucesso!')
})

it('Editar conta com nome em branco', function() {
    cy.editAccount()
    cy.clearField()
    cy.clickSave()
    cy.get(msgAlerta)
      .should('be.visible')
      .should('have.text', 'Informe o nome da conta')
})

it('Editar conta com nome já existente', function() {
    cy.editAccount()
    cy.clearField()
    cy.fillInAccount('C6')
    cy.clickSave()
    cy.get(msgAlerta)
      .should('be.visible')
      .should('have.text', 'Já existe uma conta com esse nome!')
})

})