import './style.scss'

const calculator = document.querySelector('#wrapper')
const display = calculator.querySelector('#display')
const digits = calculator.querySelectorAll('.digit')
const operators = calculator.querySelectorAll('.operator')
const memoryKeys = calculator.querySelectorAll('.memory')
const powerKeys = calculator.querySelectorAll('.power')

const Calculator = () => {
  let powerState = 'OFF' // 'OFF' | 'ON'
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
      digits = ['0']
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
    powerOff: function() {
      powerState = 'OFF'
      this.clearStore()
      digits = []
      this.updateDisplay()
    },
    powerOn: function() {
      powerState = 'ON'
      this.clearStore()
      digits = ['0']
      this.updateDisplay()
    },
    isPoweredUp: () => powerState === 'ON',
  }
}

let calc = Calculator()

// Handlers
function handleDigit(e) {
  if (!calc.isPoweredUp()) return
  const digit = e.target.innerText
  calc.save(digit)
}

function handleOperator(e) {
  if (!calc.isPoweredUp()) return
  const operator = e.target.innerText
  switch (operator) {
    case 'C':
      calc.clearValue()
      break
    case 'AC':
      calc.clearStore()
      break
    default:
      console.log('default', calc.getValue())
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
    case 'OFF':
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
