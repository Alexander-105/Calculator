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