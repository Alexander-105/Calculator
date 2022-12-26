window.addEventListener('load', onLoad);

const calculator = {
    firstOperand: '',
    sign: null,
    secondOperand: '',
    result: null,
};

const operations = {
    add: '+',
    subtract: '-',
    multiply: '*',
    divide: '/',
    mod: 'mod',
    power: '^',
    sqrt: 'sqrt',
    factorial: '!',
    divideX: '1/x',
};

function clearCalcHistory() {

    const calcHistory = document.querySelector('#calcHistory');

    if (calcHistory.childElementCount) {
        calcHistory.firstChild.remove();
    }
}

/**
 * 
 * @param {Object} calculator
 * @param {String} calculator.sign
 */
function getResult(calculator) {
    let result = null;
    let firstOperand = Number(calculator.firstOperand);
    let secondOperand = Number(calculator.secondOperand);

    switch (calculator.sign) {
        case 'add': {
            result = firstOperand + secondOperand;

            break;
        }

        case 'subtract': {
            result = firstOperand - secondOperand;

            break;
        }

        case 'multiply': {
            result = firstOperand * secondOperand;

            break;
        }
        case 'divide': {
            result = firstOperand / secondOperand;

            break;
        }
        case 'mod': {
            result = firstOperand % secondOperand;

            if (!result) {
                return String(result);
            }

            break;
        }

        case 'power': {
            result = firstOperand ** secondOperand;

            break;
        }
    }

    return result;
}

function clearInputText(clearHistory = false) {
    const inputTxt = document.querySelector('#inputTxt');

    if (clearHistory) {
        inputTxt.value = '';
        calculator.firstOperand = '';
        calculator.sign = null;
        calculator.secondOperand = '';
        calculator.result = null;
    }

    if (!clearHistory) {

        if (calculator.firstOperand && calculator.sign && calculator.secondOperand) {
            inputTxt.value = inputTxt.value.trim().slice(0, -1);

            return calculator.secondOperand = calculator.secondOperand.slice(0, -1);
        }
        if (calculator.firstOperand && calculator.sign && !calculator.secondOperand) {
            inputTxt.value = inputTxt.value.trim().slice(0, -1);

            return calculator.sign = null;
        }
        if (calculator.firstOperand && !calculator.sign && !calculator.secondOperand) {
            inputTxt.value = inputTxt.value.trim().slice(0, -1);

            return calculator.firstOperand = calculator.firstOperand.slice(0, -1);
        }
    }
}

/**
 * 
 * @param {Object} calculator
 * @param {String} calculator.firstOperand
 * @param {String} calculator.sign
 * @param {String} calculator.secondOperand
 * @param {Number} calculator.result
 */
function printInput(calculator) {
    const inputTxt = document.querySelector('#inputTxt');

    if (calculator.result) {
        inputTxt.value = calculator.result;
    } else {
        inputTxt.value = `${calculator.firstOperand} ${operations[calculator.sign] ?? ''} ${calculator.secondOperand ?? ''}`;
    }
}

/**
 * 
 * @param {Object} calculator
 * @param {String} calculator.firstOperand
 * @param {String} calculator.sign
 * @param {String} calculator.secondOperand
 * @param {Number} calculator.result
 */
function printHistory(calculator) {
    const calcHistory = document.querySelector('#calcHistory');
    const historyElement = document.createElement('p');

    historyElement.textContent = `${calculator.firstOperand} ${operations[calculator.sign]} ${calculator.secondOperand ?? ''} = ${calculator.result ?? ''}`;
    calcHistory.append(historyElement);
}

/**
 * 
 * @param {HTMLElement} calculatorElement
 */
function initCalc(calculatorElement) {

    calculatorElement.addEventListener('click', (event) => {
        const element = event.target;

        if (element?.nodeName !== 'BUTTON') {
            return;
        }

        const value = Number(element.name);

        if (element.name === 'clearHistory') {
            return clearCalcHistory();
        }


        if (element.name === 'clearAll') {
            return clearInputText(true);
        }

        if (element.name === 'clear') {
            return clearInputText();
        }

        if (element.name === 'sqrt' && calculator.firstOperand) {
            calculator.sign = 'sqrt';
            calculator.result = Math.sqrt(calculator.firstOperand);
            printInput(calculator);
            printHistory(calculator);
        }

        if (element.name === 'factorial' && calculator.firstOperand) {
            calculator.sign = 'factorial';
            calculator.result = factorial(calculator.firstOperand);
            printInput(calculator);
            printHistory(calculator);
        }

        if (element.name === 'divideX' && calculator.firstOperand) {

            calculator.result = 1 / calculator.firstOperand;
            calculator.sign = 'divideX';
            printInput(calculator);
            printHistory(calculator);
        }

        if (!Number.isNaN(value)) {
            if (!calculator.sign) {
                calculator.firstOperand += value;
            } else if (calculator.sign) {
                calculator.secondOperand += value;
            }

            printInput(calculator);
        } else if (Object.keys(operations).includes(element.name)) {
            calculator.sign = element.name;
            printInput(calculator);

        } else if (element.name = '=') {
            if (calculator.firstOperand && calculator.sign && calculator.secondOperand) {
                const result = getResult(calculator);
                calculator.result = result;

                printInput(calculator);
                printHistory(calculator);

                calculator.firstOperand = `${result}`;
                calculator.sign = null;
                calculator.secondOperand = '';
                calculator.result = null;
            }
        }
    });
}

function onLoad() {
    const calculatorElement = document.querySelector('.calculator');

    if (!calculatorElement) {
        alert('Calculator can not be initialized!');

        return;
    }

    initCalc(calculatorElement);
}

function factorial(firstOperand) {
    return (firstOperand != 1) ? firstOperand * factorial(firstOperand - 1) : 1;
}

function test(counter) {
    counter--;
    console.log("part 1 - " + counter);

    if (counter != 0) {
        test(counter);
    }

    console.log("part 2 - " + counter);
}