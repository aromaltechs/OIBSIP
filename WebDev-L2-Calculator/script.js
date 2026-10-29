const previousNumber = document.getElementById("previous-number");
const currentNumber = document.getElementById("current-number");

const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");

const decimalButton = document.getElementById("decimal");
const clearButton = document.getElementById("clear");
const backspaceButton = document.getElementById("backspace");
const equalsButton = document.getElementById("equals");

let currentInput = "0";
let expression = [];
let waitingForNumber = false;
let resultDisplayed = false;
let hasError = false;


// Update the calculator display
function updateDisplay() {
    currentNumber.textContent = currentInput;
    previousNumber.textContent = expression.join(" ");
}


// Reset the calculator
function clearCalculator() {
    currentInput = "0";
    currentNumber.classList.remove("error-message");
    expression = [];
    waitingForNumber = false;
    resultDisplayed = false;
    hasError = false;

    updateDisplay();
}


// Display an error message
function showError(message) {
    currentInput = message;
    currentNumber.classList.add("error-message");
    expression = [];
    waitingForNumber = false;
    resultDisplayed = false;
    hasError = true;

    updateDisplay();
}


// Handle number button clicks
numberButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const number = button.dataset.number;

        // Start fresh after an error
        if (hasError) {
            clearCalculator();
        }

        // Start a new calculation after displaying a result
        if (resultDisplayed) {
            currentInput = number;
            expression = [];
            resultDisplayed = false;
            updateDisplay();
            return;
        }

        // Start entering the next number after an operator
        if (waitingForNumber) {
            currentInput = number;
            waitingForNumber = false;
        } else if (currentInput === "0") {
            currentInput = number;
        } else {
            currentInput += number;
        }

        updateDisplay();
    });
});


// Handle decimal button clicks
decimalButton.addEventListener("click", function () {
    if (hasError) {
        clearCalculator();
    }

    if (resultDisplayed) {
        currentInput = "0.";
        expression = [];
        resultDisplayed = false;
        updateDisplay();
        return;
    }

    if (waitingForNumber) {
        currentInput = "0.";
        waitingForNumber = false;
    } else if (!currentInput.includes(".")) {
        currentInput += ".";
    }

    updateDisplay();
});


// Handle operator button clicks
operatorButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        if (hasError) {
            clearCalculator();
            return;
        }

        const operator = button.dataset.operator;

        // Continue calculating from the previous result
        if (resultDisplayed) {
            expression = [];
            resultDisplayed = false;
        }

        // Replace the previous operator if another is selected
        if (waitingForNumber) {
            expression[expression.length - 1] = operator;
        } else {
            expression.push(currentInput, operator);
        }

        currentInput = "0";
        waitingForNumber = true;

        updateDisplay();
    });
});


// Calculate an expression without using eval()
function calculate(parts) {
    if (parts.length < 3 || parts.length % 2 === 0) {
        throw new Error("Invalid expression");
    }

    // Store numbers and operators separately
    const numbers = [Number(parts[0])];
    const operators = [];

    // Process multiplication and division first
    for (let i = 1; i < parts.length; i += 2) {
        const operator = parts[i];
        const nextNumber = Number(parts[i + 1]);

        if (!Number.isFinite(nextNumber)) {
            throw new Error("Invalid number");
        }

        if (operator === "*") {
            numbers[numbers.length - 1] *= nextNumber;
        } else if (operator === "/") {
            if (nextNumber === 0) {
                throw new Error("Cannot divide by 0");
            }

            numbers[numbers.length - 1] /= nextNumber;
        } else if (operator === "+" || operator === "-") {
            operators.push(operator);
            numbers.push(nextNumber);
        } else {
            throw new Error("Invalid operator");
        }

        if (!Number.isFinite(numbers[numbers.length - 1])) {
            throw new Error("Result out of range");
        }
    }

    // Process addition and subtraction from left to right
    let result = numbers[0];

    for (let i = 0; i < operators.length; i++) {
        if (operators[i] === "+") {
            result += numbers[i + 1];
        } else {
            result -= numbers[i + 1];
        }
    }

    if (!Number.isFinite(result)) {
        throw new Error("Result out of range");
    }

    // Reduce common floating-point display errors
    return Number(result.toPrecision(12));
}


// Handle equals button clicks
equalsButton.addEventListener("click", function () {
    if (hasError || waitingForNumber || expression.length === 0) {
        return;
    }

    const parts = [...expression, currentInput];
    const completedExpression = parts.join(" ");

    try {
        const result = calculate(parts);

        currentInput = String(result);
        expression = [];
        waitingForNumber = false;
        resultDisplayed = true;

        previousNumber.textContent = completedExpression + " =";
        currentNumber.textContent = currentInput;
    } catch (error) {
        showError(
            error.message === "Cannot divide by 0"
                ? "Cannot divide by 0"
                : "Error"
        );
    }
});


// Handle clear button clicks
clearButton.addEventListener("click", clearCalculator);


// Handle backspace button clicks
backspaceButton.addEventListener("click", function () {
    if (hasError || resultDisplayed) {
        clearCalculator();
        return;
    }

    if (waitingForNumber) {
        return;
    }

    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);

        if (currentInput === "-") {
            currentInput = "0";
        }
    } else {
        currentInput = "0";
    }

    updateDisplay();
});


// Initialize the calculator
updateDisplay();