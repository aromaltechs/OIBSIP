const previousNumber = document.getElementById("previous-number");
const currentNumber = document.getElementById("current-number");

const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");

const clearButton = document.getElementById("clear");
const backspaceButton = document.getElementById("backspace");
const decimalButton = document.getElementById("decimal");
const equalsButton = document.getElementById("equals");

let currentValue = "0";
let previousValue = "";
let selectedOperator = null;
let calculationCompleted = false;


function updateDisplay() 
{
    currentNumber.textContent = currentValue;
    previousNumber.textContent = previousValue;
}


//number buttons
numberButtons.forEach(function(button) 
{
    button.addEventListener("click", function() {
        const number = button.dataset.number;

         if (calculationCompleted)
        {
            currentValue = number;
            previousValue = "";
            calculationCompleted = false;
        }
        else if (currentValue === "0") 
        {
            currentValue = number;
        }
        else 
        {
            currentValue += number;
        }

        updateDisplay();
    });
});


//decimal button
decimalButton.addEventListener("click", function() {
    if (calculationCompleted)
    {
        currentValue = "0.";
        previousValue = "";
        calculationCompleted = false;
    }
    else if (!currentValue.includes(".")) 
    {
        currentValue += ".";
    }

    updateDisplay();
});


//multiple operator buttons
operatorButtons.forEach(function(button) 
{
    button.addEventListener("click", function() {

        if (selectedOperator !== null)  //operator chaining
        {
            calculateResult();
        }

        previousValue = currentValue + " " + button.textContent;
        selectedOperator = button.dataset.operator;
        currentValue = "0";
        calculationCompleted = false;

        updateDisplay();
    });
});

//calculation result
function calculateResult() 
{
    const firstNumber = parseFloat(previousValue);
    const secondNumber = parseFloat(currentValue);

    let result;

    if (selectedOperator === "+") 
    {
        result = firstNumber + secondNumber;
    } 
    else if (selectedOperator === "-")
    {
        result = firstNumber - secondNumber;
    }
    else if (selectedOperator === "*")
    {
        result = firstNumber * secondNumber;
    }
    else if (selectedOperator === "/")
    {
        if (secondNumber === 0) 
        {
            currentValue = "Cannot divide by 0";
            previousValue = "";
            selectedOperator = null;
            updateDisplay();
            return;
        }
        result = firstNumber / secondNumber;
    }

    currentValue = String(result);
    previousValue = "";
    selectedOperator = null;

    updateDisplay();
}


//equals button
equalsButton.addEventListener("click", function() {
    if (selectedOperator !== null && currentValue !== "")
    {
        calculateResult();
        calculationCompleted = true;
    }
});


//clear button
clearButton.addEventListener("click", function() {
    currentValue = "0";
    previousValue = "";
    selectedOperator = null;
    calculationCompleted = false;

    updateDisplay();
});


//backspace button
backspaceButton.addEventListener("click", function() {
    if (currentValue.length > 1) 
    {
        currentValue = currentValue.slice(0, -1);
    }
    else
    {
        currentValue = "0";
    }

    updateDisplay();
});

