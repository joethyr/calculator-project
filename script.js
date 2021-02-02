const buttonNumber = document.querySelectorAll(".btn__number");

let screenValue = "";

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

function appendNumber(number) {
  screenValue += number;
  document.querySelector(".screen__value").innerHTML = screenValue;
}

buttonNumber.forEach(function (button) {
  button.addEventListener("click", function () {
    appendNumber(button.textContent);
  });
});
