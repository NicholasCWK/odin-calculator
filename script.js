function operate(num1, num2, operator) {
    switch (operator) {
        case "+": return add(num1, num2);
        case "-": return subtract(num1, num2);
        case "*": return multiply(num1, num2);
        case "/": return divide(num1, num2);
    }
}

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function updateLowerDisplay(value) {
    content = lowerDisplay.textContent;
    if (content == "0") content = "";
    content += value;
    lowerDisplay.textContent = content;
}

function evaluateExpression() {
    if (currentOperator != null) {
        content = lowerDisplay.textContent;
        operands = content.split(currentOperator);
        if (operands.length != 2) return;
        num1 = Number(operands[0]);
        num2 = Number(operands[1]);
        upperDisplay.textContent = content;
        if (num2 == 0 && currentOperator == "/") {
            lowerDisplay.textContent = "ERROR";
            buttons.forEach(button => {
                if (button.id != "clear") button.disabled = true;
            })
            return;
        }
        lowerDisplay.textContent = String(operate(num1, num2, currentOperator));
        currentOperator = null;
        console.log(lowerDisplay.textContent);
        if (lowerDisplay.textContent.includes(".")) dot.disabled = true;
    }
}

const operatorSymbols = ["+", "-", "*", "/"];
const digits = document.querySelectorAll(".digit");
const operators = document.querySelectorAll(".operator");
const equal = document.querySelector("#equal");
const clear = document.querySelector("#clear");
const del = document.querySelector("#delete");
const buttons = document.querySelectorAll("button");
const dot = document.querySelector("#dot");
const upperDisplay = document.querySelector("#upper-display");
const lowerDisplay = document.querySelector("#lower-display");

digits.forEach(digit => digit.addEventListener("click", e => {
    updateLowerDisplay(digit.textContent);
}));

operators.forEach(operator => operator.addEventListener("click", e => {
    evaluateExpression();
    if (currentOperator != null) return;
    updateLowerDisplay(operator.textContent);
    currentOperator = operator.textContent;
    dot.disabled = false;
}))

equal.addEventListener("click", e => evaluateExpression());

clear.addEventListener("click", e => {
    lowerDisplay.textContent = 0;
    upperDisplay.textContent = "";
    buttons.forEach(button => button.disabled = false);
});

del.addEventListener("click", e => {
    content = lowerDisplay.textContent;
    if (currentOperator != null) {
        if (content.slice(-1) == currentOperator) {
            if (content.includes(".")) dot.disabled = true;
            currentOperator = null;
        }
    }
    if (content.slice(-1) == ".") {
        dot.disabled = false;
    }    
    content = content.slice(0, -1);
    if (content == "") content = "0";
    lowerDisplay.textContent = content;
})

dot.addEventListener("click", e => {
    updateLowerDisplay(".");
    dot.disabled = true;
})

lowerDisplay.textContent = 0;
let currentOperator = null;