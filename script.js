const buttonNumber = document.querySelectorAll(".btn__number");
const buttonClear = document.querySelector(".btn__clear");
const buttonDecimal = document.querySelector(".btn__decimal");

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

//when a numbered button is clicked, it will run appendNumber() with its text content as the parameter.
buttonNumber.forEach(function (button) {
  button.addEventListener("click", function () {
    appendNumber(button.textContent);
  });
});

// the function takes the text content and makes it equal the screenValue variable.
// It then displays the variable in the html element with class ".screen__value"
function appendNumber(number) {
  if (screenValue.length > 20) {
    alert("the number value is too high!");
    return;
  }
  if (number == 0 && screenValue.length == 0) {
    return;
  }
  screenValue += number;
  document.querySelector(".screen__value").innerHTML = screenValue;
}

// when the CE is clicked, it will clear out the value in the screenValue variable.
// It will also clear out the value display on the screen browser.
buttonClear.addEventListener("click", () => {
  screenValue = "";
  document.querySelector(".screen__value").innerHTML = screenValue;
});

// when the decimal button is clicked and there is no "." value found in screenValue variable, append it to the variable.
buttonDecimal.addEventListener("click", () => {
  if (screenValue.includes(".") !== true) {
    appendNumber(buttonDecimal.textContent);
  }
});
