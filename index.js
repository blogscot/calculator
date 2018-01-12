import './style.scss'

const calculator = document.querySelector('#wrapper')
const display = calculator.querySelector('#display')
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
  let stringValue = ''
  let currentValue = 0
  let operator = ''
  let memory = 0
  let userDisplay = ''

  function updateDisplay(text = '0') {
    display.innerText = text
  }

  return {
    save: function(digit) {
      digits = [...digits, digit]
      stringValue = digits.reduce((acc, digit) => acc + digit, '')
      currentValue = Number(stringValue)
      console.log(currentValue)
      updateDisplay(stringValue)
    },
    getCurrentValue: () => currentValue,
    getStringValue: () => stringValue,
    setValue: function(value) {
      if (typeof value === 'number') {
        currentValue = value
        stringValue = '' + value
        digits = []
        updateDisplay(stringValue)
      } else {
        console.error('setValue: Invalid parameter.')
      }
    },
    clearValue: function() {
      digits = []
      updateDisplay('')
    },
    clearAll: function() {
      digits = []
      operator = ''
      memory = 0
      userDisplay = ''
      updateDisplay()
    },
    powerOff: function() {
      powerState = OFF
      this.clearAll()
      updateDisplay('')
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
  const currentInput = calc.getStringValue()
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
      value = calc.getCurrentValue()
      calc.setValue(Math.sqrt(value))
      break
    case '±':
      value = calc.getCurrentValue()
      calc.setValue(value * -1)
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
