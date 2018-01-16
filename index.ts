import './style.scss'

const calculator: HTMLElement = document.querySelector('#wrapper')
const display: HTMLElement = calculator.querySelector('.display')
const memoryStatus: HTMLElement = calculator.querySelector('.display-top-left')
const activeOperator: HTMLElement = calculator.querySelector(
  '.display-top-right'
)
const displayBottom: HTMLElement = calculator.querySelector('.display-bottom')
const digits = calculator.querySelectorAll('.digit')
const operators = calculator.querySelectorAll('.operator')
const memoryKeys = calculator.querySelectorAll('.memory')
const powerKeys = calculator.querySelectorAll('.power')

// Power States
enum PowerState {
  OFF = 0,
  ON = 1,
}

type ArithmeticOperator = '+' | '×' | '-' | '÷'

const Calculator = () => {
  let powerState = PowerState.OFF
  let digits = []
  let currentValue: number = null
  let accumulator: number = null
  let operator: ArithmeticOperator = null
  let memory = 0
  let percentPressed = false

  // Display functions
  function displayValue(value: number = 0) {
    const max_number_of_digits = 23
    const length = String(value).length
    // Truncate very long numbers
    if (length > max_number_of_digits) return

    // For long numbers scale down the font-size
    if (length >= 20) {
      displayBottom.classList.add('extended_number')
    } else {
      displayBottom.classList.remove('extended_number')
    }

    displayBottom.innerText = String(value)
  }

  function showMemoryIcon(flag: boolean = true) {
    memoryStatus.innerText = flag ? 'M' : ''
  }

  function displayOperator(op: string) {
    activeOperator.innerText = op
  }

  function clearOperator() {
    activeOperator.innerText = ''
  }

  function clearDisplay() {
    clearOperator()
    displayBottom.innerText = ''
  }

  // Helpers
  function evaluate(
    acc: number,
    current: number,
    operator: ArithmeticOperator
  ): number {
    if (acc !== null && current !== null && operator) {
      if (percentPressed) {
        percentPressed = false
        current /= 100
      }
      digits = []
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
    return null
  }

  // Public functions
  return {
    save: function(digit: string) {
      digits = [...digits, digit]
      const stringValue = digits.reduce((acc, digit) => acc + digit, '')
      currentValue = Number(stringValue)
      displayValue(stringValue)
    },

    getValue: (): number => currentValue || 0,

    setValue: function(value: number) {
      currentValue = value
      digits = []
      displayValue(currentValue)
    },

    setOperator: function(op: ArithmeticOperator) {
      // ignore operators until value is set
      if (!currentValue) return

      if (!operator) {
        // save current state
        operator = op
        accumulator = currentValue
      } else {
        // Use previous operator
        accumulator = evaluate(accumulator, currentValue, operator)
        operator = op
      }
      digits = []
      currentValue = 0
      displayOperator(op)
    },

    setPercentage: operator => {
      displayOperator(operator)
      percentPressed = true
    },

    applyMemoryKey: key => {
      switch (key) {
        case 'MC':
          memory = 0
          showMemoryIcon(false)
          break
        case 'MR':
          currentValue = memory
          displayValue(currentValue)
          break
        case 'M+':
          showMemoryIcon()
          memory += currentValue
          digits = []
          break
        case 'M-':
          showMemoryIcon()
          memory -= currentValue
          digits = []
          break
        default:
          console.log('What memory key was that? ', key)
      }
    },

    showResult: function() {
      const result = evaluate(accumulator, currentValue, operator)
      // User can be evaluating an expression or a constant
      if (result !== null) {
        clearOperator()
        operator = null
        displayValue(result)
        currentValue = result
      } else {
        displayValue(currentValue)
      }
    },

    clearValue: function() {
      digits = []
      clearDisplay()
    },

    clearAll: function() {
      digits = []
      currentValue = null
      operator = null
      clearOperator()
      displayValue()
    },

    powerOff: function() {
      display.classList.remove('powered')
      powerState = PowerState.OFF
      this.clearAll()
      clearDisplay()
    },

    powerOn: function() {
      display.classList.add('powered')
      powerState = PowerState.ON
      this.clearAll()
    },

    isPoweredUp: () => powerState === PowerState.ON,
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
      calc.setPercentage(operator)
      break
    default:
      console.log('What operator was that?', operator)
  }
}

function handleMemoryKey(e) {
  if (!calc.isPoweredUp()) return
  const key = e.target.innerText
  calc.applyMemoryKey(key)
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
