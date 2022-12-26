function factorial(firstOperand) {
    return (firstOperand != 1) ? firstOperand * factorial(firstOperand - 1) : 1;
}
