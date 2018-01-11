import './style.scss'

const calculator = document.querySelector('#wrapper')
const display = calculator.querySelector('#display')
const digits = calculator.querySelectorAll('.digit')
const operators = calculator.querySelectorAll('.operator')
const memoryKeys = calculator.querySelectorAll('.memory')

const Store = () => {
  let digits = []
  let operator = ''
  let memoryKey = ''
  let userDisplay = ''
  return {
    save: function(digit) {
      digits = [...digits, digit]
      this.updateDisplay()
    },
    getValue: function() {
      return digits.reduce((acc, digit) => acc + digit, '')
    },
    clearValue: function() {
      digits = []
      this.updateDisplay()
    },
    clearStore: function() {
      this.clearValue()
      operator = ''
      memoryKey = ''
      userDisplay = ''
      this.updateDisplay()
    },
    updateDisplay: function() {
      const text = this.getValue()
      // console.log('text', text)
      display.innerText = text
    },
  }
}

let store = Store()

// Handlers
function handleDigit(e) {
  const digit = e.target.innerText
  store.save(digit)
}

function handleOperator(e) {
  const operator = e.target.innerText
  switch (operator) {
    case 'C':
      store.clearValue()
      break
    case 'AC':
      store.clearStore()
      break
    default:
      console.log('default', store.getValue())
  }
}

function handleMemoryKey(e) {
  const key = e.target.innerText
}

// Event Handlers
digits.forEach(digit => digit.addEventListener('click', handleDigit))

operators.forEach(operator =>
  operator.addEventListener('click', handleOperator)
)
memoryKeys.forEach(memoryKey =>
  memoryKey.addEventListener('click', handleMemoryKey)
)
