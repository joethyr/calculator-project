const buttonNumber = document.querySelectorAll(".btn__number");
const buttonClear = document.querySelector(".btn__clear");
const buttonDecimal = document.querySelector(".btn__decimal");
const buttonOperator = document.querySelectorAll(".btn__operator");
const equalsButton = document.querySelector(".btn__equal");
const buttonDelete = document.querySelector(".btn__delete");

let screenValue = "";
let operatorClicked = false;
let currentOperation = null;

window.addEventListener("keydown", keyPress);

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

buttonNumber.forEach(function (button) {
  button.addEventListener("click", function () {
    appendNumber(button.textContent);
  });
});

function appendNumber(number) {
  if (screenValue.length > 20) {
    alert("the number value is too high!");
    return;
  }
  if (number == 0 && screenValue.length == 0) {
    return;
  }
  operatorClicked = false;
  screenValue += number;
  document.querySelector(".screen__value").innerHTML = screenValue;
}

buttonDelete.addEventListener("click", function () {
  deleteNumber();
});

function deleteNumber() {
  if (screenValue === "") {
    return;
  }
  let newScreenValue = Array.from(screenValue);
  newScreenValue.pop();
  screenValue = newScreenValue.join("");
  document.querySelector(".screen__value").innerHTML = screenValue;
}

buttonClear.addEventListener("click", () => {
  clear();
});

function clearEntry() {
  screenValue = "";
  document.querySelector(".screen__value").innerHTML = screenValue;
}

function clear() {
  screenValue = "";
  firstOperand = "";
  secondOperand = "";
  currentOperation = null;
  document.querySelector(".screen__value").innerHTML = screenValue;
}

// when the decimal button is clicked and there is no "." value found in screenValue variable, append it to the variable.
buttonDecimal.addEventListener("click", () => {
  decimalButton();
});

function decimalButton() {
  if (screenValue.includes(".") !== true) {
    appendNumber(buttonDecimal.textContent);
  }
}

buttonOperator.forEach((button) =>
  button.addEventListener("click", () => setOperation(button.textContent))
);

function setOperation(operator) {
  if (currentOperation !== null) {
    evaluate();
    currentOperation = operator;
    return;
  }
  firstOperand = parseFloat(screenValue);
  currentOperation = operator;
  if (screenValue === "0" && currentOperation === "/") {
    alert("division by zero is undefined.");
    clear();
    return;
  }
  operatorClicked = true;
  screenValue = "";
}
function evaluate() {
  if (currentOperation === null || operatorClicked == true) return;
  if (screenValue === "0" && currentOperation === "/") {
    alert("division by zero is undefined.");
    clear();
    return;
  }
  secondOperand = parseFloat(screenValue);
  operate(currentOperation, firstOperand, secondOperand);
}

function operateFull(operation) {
  firstOperand = operation;
  document.querySelector(".screen__value").innerHTML = operation;
  screenValue = "";
  operatorClicked = true;
}

function operate(operator, a, b) {
  if (operator === "+") {
    add(a, b);
    operateFull(round(add(a, b)));
    return;
  }
  if (operator === "-") {
    subtract(a, b);
    operateFull(round(subtract(a, b)));
    return;
  }
  if (operator === "*") {
    multiply(a, b);
    operateFull(round(multiply(a, b)));
    return;
  }
  if (operator === "/") {
    divide(a, b);
    operateFull(round(divide(a, b)));
    return;
  }
}

equalsButton.addEventListener("click", () => {
  evaluate();
});

function round(x) {
  return Math.round(x * 1000) / 1000;
}
function keyPress(e) {
  if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
  if (e.key === ".") decimalButton();
  if (e.key === "=" || e.key === "Enter") evaluate();
  if (e.key === "Backspace") deleteNumber();
  if (e.key === "Escape") clear();
  if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/")
    setOperation(e.key);
}
