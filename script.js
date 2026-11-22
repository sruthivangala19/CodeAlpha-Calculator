const result = document.getElementById("result");
const expression = document.getElementById("expression");

const buttons = document.querySelectorAll("button");

let currentInput = "0";
let previousInput = "";
let operator = null;
let waitingForOperand = false;

// Update calculator display
function updateDisplay() {
    result.value = currentInput;
}

// Enter numbers
function enterNumber(number) {
    if (waitingForOperand) {
        currentInput = number;
        waitingForOperand = false;
    } else {
        currentInput =
            currentInput === "0" ? number : currentInput + number;
    }

    updateDisplay();
}

// Enter decimal
function enterDecimal() {
    if (waitingForOperand) {
        currentInput = "0.";
        waitingForOperand = false;
    } else if (!currentInput.includes(".")) {
        currentInput += ".";
    }

    updateDisplay();
}

// Calculate result
function calculate(a, b, op) {
    switch (op) {
        case "+":
            return a + b;

        case "-":
            return a - b;

        case "*":
            return a * b;

        case "/":
            return b === 0 ? "Error" : a / b;

        case "%":
            return a % b;

        default:
            return b;
    }
}

// Select operator
function chooseOperator(nextOperator) {
    const inputValue = parseFloat(currentInput);

    if (operator && !waitingForOperand) {
        const resultValue = calculate(
            parseFloat(previousInput),
            inputValue,
            operator
        );

        if (resultValue === "Error") {
            currentInput = "Error";
            operator = null;
            updateDisplay();
            return;
        }

        currentInput = String(Number(resultValue.toFixed(10)));
        updateDisplay();
    }

    previousInput = currentInput;
    operator = nextOperator;
    waitingForOperand = true;

    expression.textContent =
        previousInput + " " + operator;
}

// Equal button
function showResult() {
    if (!operator || waitingForOperand) return;

    const secondInput = parseFloat(currentInput);
    const firstInput = parseFloat(previousInput);

    const finalResult = calculate(
        firstInput,
        secondInput,
        operator
    );

    expression.textContent =
        previousInput + " " + operator + " " + currentInput + " =";

    currentInput = finalResult === "Error"
        ? "Error"
        : String(Number(finalResult.toFixed(10)));

    operator = null;
    previousInput = "";
    waitingForOperand = true;

    updateDisplay();
}

// Clear all
function clearCalculator() {
    currentInput = "0";
    previousInput = "";
    operator = null;
    waitingForOperand = false;

    expression.textContent = "";
    updateDisplay();
}

// Delete last digit
function deleteDigit() {
    if (waitingForOperand) return;

    currentInput =
        currentInput.length > 1
            ? currentInput.slice(0, -1)
            : "0";

    if (currentInput === "-") currentInput = "0";

    updateDisplay();
}

// Positive / Negative
function changeSign() {
    if (currentInput === "0" || currentInput === "Error") return;

    currentInput = String(parseFloat(currentInput) * -1);
    updateDisplay();
}

// Button click events
buttons.forEach(button => {
    button.addEventListener("click", () => {

        if (button.dataset.number !== undefined) {
            enterNumber(button.dataset.number);
        }

        if (button.dataset.operator) {
            if (currentInput === "Error") return;
            chooseOperator(button.dataset.operator);
        }

        const action = button.dataset.action;

        if (action === "decimal") enterDecimal();
        if (action === "equals") showResult();
        if (action === "clear") clearCalculator();
        if (action === "delete") deleteDigit();
        if (action === "sign") changeSign();

        if (action === "clear") {
            expression.textContent = "";
        }
    });
});

// Keyboard support
document.addEventListener("keydown", event => {
    const key = event.key;

    if (key >= "0" && key <= "9") {
        enterNumber(key);
    }

    if (key === ".") {
        enterDecimal();
    }

    if (["+", "-", "*", "/", "%"].includes(key)) {
        if (currentInput !== "Error") {
            chooseOperator(key);
        }
    }

    if (key === "Enter" || key === "=") {
        showResult();
    }

    if (key === "Backspace") {
        deleteDigit();
    }

    if (key === "Escape") {
        clearCalculator();
    }
});

// Initial display
updateDisplay();
