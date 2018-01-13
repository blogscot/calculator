import './style.scss'

const calculator = document.querySelector('#wrapper')
const displayTop = calculator.querySelector('.display-top')
const displayBottom = calculator.querySelector('.display-bottom')
const digits = calculator.querySelectorAll('.digit')
const operators = calculator.querySelectorAll('.operator')
const memoryKeys = calculator.querySelectorAll('.memory')
const powerKeys = calculator.querySelectorAll('.power')

// Power States
const OFF = 0
const ON = 1

const Calculator = () => {
  let powerState = OFF
  let digits = []
  let currentValue = null // type Number
  let accumulator = null // type Number
  let operator = null // type String
  let memory = 0
  let userDisplay = ''

  function displayValue(text = '0') {
    displayBottom.innerText = text
  }

  function displayOperator(op = '') {
    displayTop.innerText = op
  }

  function clearDisplay() {
    displayTop.innerText = ''
    displayBottom.innerText = ''
  }

  function evaluate(acc, current, operator) {
    if (acc && current && operator) {
      switch (operator) {
        case '+':
          return acc + current
        case '×':
          return acc * current
        case '-':
          return acc - current
        case '÷':
          return acc / current
        default:
          throw new Error('evaluate: Invalid parameter')
      }
    }
    return currentValue || 0
  }

  return {
    save: function(digit) {
      digits = [...digits, digit]
      const stringValue = Number(digits.reduce((acc, digit) => acc + digit, ''))
      currentValue = Number(stringValue)
      displayValue(stringValue)
    },
    getValue: () => currentValue || 0,
    setValue: function(value) {
      if (typeof value === 'number') {
        currentValue = value
        digits = []
        displayValue(currentValue)
      } else {
        console.error('setValue: Invalid parameter.')
      }
    },
    setOperator: function(op) {
      // ignore operators until value is set
      if (!currentValue || typeof op !== 'string') return

      if (!operator) {
        // save current state
        operator = op
        accumulator = currentValue
      } else {
        // Use old operator
        accumulator = evaluate(accumulator, currentValue, operator)
        operator = op
      }
      digits = []
      displayOperator(op)
    },
    showResult() {
      accumulator = evaluate(accumulator, currentValue, operator)
      displayOperator()
      displayValue(String(accumulator))
    },
    clearValue: function() {
      digits = []
      clearDisplay()
    },
    clearAll: function() {
      digits = []
      currentValue = null
      operator = null
      memory = 0
      userDisplay = ''
      displayValue()
    },
    powerOff: function() {
      powerState = OFF
      this.clearAll()
      clearDisplay()
    },
    powerOn: function() {
      powerState = ON
      this.clearAll()
    },
    isPoweredUp: () => powerState === ON,
  }
}

let calc = Calculator()

// Handlers
function handleDigit(e) {
  if (!calc.isPoweredUp()) return
  const digit = e.target.innerText

  // prevent multiple decimal points
  const currentInput = String(calc.getValue())
  if (currentInput.includes('.') && digit === '.') return
  calc.save(digit)
}

function handleOperator(e) {
  if (!calc.isPoweredUp()) return
  const operator = e.target.innerText
  let value
  switch (operator) {
    case 'C':
      calc.clearValue()
      break
    case 'AC':
      calc.clearAll()
      break
    case '√':
      value = calc.getValue()
      calc.setValue(Math.sqrt(value))
      break
    case '±':
      value = calc.getValue()
      calc.setValue(value * -1)
      break
    case '+':
    case '×':
    case '-':
    case '÷':
      calc.setOperator(operator)
      break
    case '=':
      calc.showResult()
      break
    case '%':
    default:
      console.log('What operator was that?', operator)
  }
}

function handleMemoryKey(e) {
  if (!calc.isPoweredUp()) return
  const key = e.target.innerText
}

function handlePowerKey(e) {
  const key = e.target.innerText
  switch (key) {
    case 'AC':
      if (!calc.isPoweredUp()) {
        calc.powerOn()
      }
      break
    case OFF:
    default:
      if (calc.isPoweredUp()) {
        calc.powerOff()
      }
  }
}

// Event Handlers
digits.forEach(digit => digit.addEventListener('click', handleDigit))

operators.forEach(operator =>
  operator.addEventListener('click', handleOperator)
)
memoryKeys.forEach(memoryKey =>
  memoryKey.addEventListener('click', handleMemoryKey)
)

powerKeys.forEach(powerKey =>
  powerKey.addEventListener('click', handlePowerKey)
)
