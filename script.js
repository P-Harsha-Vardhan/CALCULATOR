let currentNumber = "";
let previousNumber = "";
let operation = null;
let shouldResetScreen = false;

const result = document.getElementById("result");
const expression = document.getElementById("expression");

function updateDisplay() {
    result.textContent = currentNumber || "0";
}

function inputNumber(number) {
    if (shouldResetScreen) {
        currentNumber = "";
        shouldResetScreen = false;
    }

    if (number === "." && currentNumber.includes(".")) {
        return;
    }

    if (currentNumber === "0" && number !== ".") {
        currentNumber = number;
    } else {
        currentNumber += number;
    }

    updateDisplay();
}

function setOperation(operator) {
    if (currentNumber === "" && previousNumber === "") {
        return;
    }

    if (currentNumber !== "" && previousNumber !== "") {
        calculate();
    }

    if (currentNumber !== "") {
        previousNumber = currentNumber;
    }

    operation = operator;

    expression.textContent = `${previousNumber} ${operation}`;

    shouldResetScreen = true;
}

function calculate() {
    if (
        previousNumber === "" ||
        currentNumber === "" ||
        operation === null
    ) {
        return;
    }

    const previous = parseFloat(previousNumber);
    const current = parseFloat(currentNumber);

    let answer;

    switch (operation) {
        case "+":
            answer = previous + current;
            break;

        case "-":
            answer = previous - current;
            break;

        case "×":
            answer = previous * current;
            break;

        case "÷":
            if (current === 0) {
                result.textContent = "ERROR";
                expression.textContent = "Cannot divide by zero";

                currentNumber = "";
                previousNumber = "";
                operation = null;

                return;
            }

            answer = previous / current;
            break;
    }

    answer = parseFloat(answer.toFixed(10));

    expression.textContent =
        `${previousNumber} ${operation} ${currentNumber} =`;

    currentNumber = answer.toString();
    previousNumber = "";
    operation = null;
    shouldResetScreen = true;

    updateDisplay();
}

function clearAll() {
    currentNumber = "";
    previousNumber = "";
    operation = null;
    shouldResetScreen = false;

    expression.textContent = "";
    result.textContent = "0";
}

function deleteNumber() {
    if (shouldResetScreen) {
        return;
    }

    currentNumber = currentNumber.slice(0, -1);

    updateDisplay();
}

function percentage() {
    if (currentNumber === "") {
        return;
    }

    const number = parseFloat(currentNumber);

    currentNumber = (number / 100).toString();

    updateDisplay();
}

document.addEventListener("keydown", function(event) {
    const key = event.key;

    if (key >= "0" && key <= "9") {
        inputNumber(key);
    }

    else if (key === ".") {
        inputNumber(".");
    }

    else if (key === "+") {
        setOperation("+");
    }

    else if (key === "-") {
        setOperation("-");
    }

    else if (key === "*") {
        setOperation("×");
    }

    else if (key === "/") {
        event.preventDefault();
        setOperation("÷");
    }

    else if (key === "Enter" || key === "=") {
        calculate();
    }

    else if (key === "Backspace") {
        deleteNumber();
    }

    else if (key === "Escape") {
        clearAll();
    }

    else if (key === "%") {
        percentage();
    }
});