const display = () => cy.get('.display-bottom')
const displayTopLeft = () => cy.get('.display-top-left')
const displayTopRight = () => cy.get('.display-top-right')

const powerOn = () => cy.get('.power:last')
const powerOff = () => cy.get('.power:first')

// Operators
const sqroot = () => cy.get('.operator:first')
const divide = () => cy.get('.operator').eq(1)
const percent = () => cy.get('.operator').eq(2)
const times = () => cy.get('.operator').eq(3)
const negate = () => cy.get('.operator').eq(4)
const minus = () => cy.get('.operator').eq(5)
const clear = () => cy.get('.operator').eq(6)
const add = () => cy.get('.operator').eq(7)
const allclear = () => cy.get('.operator').eq(8)
const equals = () => cy.get('.operator:last')

// Digits
const seven = () => cy.get('.digit:first')
const eight = () => cy.get('.digit').eq(1)
const nine = () => cy.get('.digit').eq(2)
const four = () => cy.get('.digit').eq(3)
const five = () => cy.get('.digit').eq(4)
const six = () => cy.get('.digit').eq(5)
const one = () => cy.get('.digit').eq(6)
const two = () => cy.get('.digit').eq(7)
const three = () => cy.get('.digit').eq(8)
const zero = () => cy.get('.digit').eq(9)
const period = () => cy.get('.digit:last')

// Memory keys
const memoryClear = () => cy.get('.memory:first')
const memoryRecall = () => cy.get('.memory').eq(1)
const memoryPlus = () => cy.get('.memory').eq(2)
const memoryMinus = () => cy.get('.memory:last')

describe('Calculator Integration Tests', () => {
  before(() => {
    // baseUrl is initialised in cypress.json
    cy.visit('/')
  })

  beforeEach(() => {
    powerOn().click()
  })

  after(() => {
    powerOff().click()
  })

  it('power cycles the calculator', () => {
    display().contains('0')
  })

  it('adds two numbers', () => {
    one().click()
    display().contains('1')
    add().click()
    displayTopRight().contains('+')
    one().click()
    display().contains('1')
    equals().click()
    display().contains('2')
  })

  it('multiplies two numbers', () => {
    three().click()
    display().contains('3')
    times().click()
    displayTopRight().contains('×')
    eight().click()
    display().contains('8')
    equals().click()
    display().contains('24')
  })

  it('memory display is clear after power off', () => {
    one().click()
    divide().click()
    six().click()
    equals().click()
    display().contains('0.16666666666666666')
    memoryPlus().click()
    displayTopLeft().contains('M')
    powerOff().click()
    displayTopLeft().should('be.empty')
    display().should('be.empty')
  })

  it('performs a chain of actions', () => {
    one().click()
    zero().click()
    display().contains('10')
    times().click()
    eight().click()
    zero().click()
    display().contains('80')
    percent().click()
    displayTopRight().contains('%')
    add().click()
    displayTopRight().contains('+')
    one().click()
    period().click()
    five().click()
    display().contains('1.5')
    equals().click()
    display().contains('9.5')
  })
})
