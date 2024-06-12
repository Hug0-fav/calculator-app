"strict";

const cal = document.querySelector(".calculator");
const keys = cal.querySelector(".calculator__keys");
const calScreen = cal.querySelector(".calculator__display");

keys.addEventListener("click", (event) => {
  if (!event.target.closest("button")) return;

  const key = event.target;
  const keyValue = key.textContent;
  const displayScreen = calScreen.textContent;
  const { type } = key.dataset;
  const { previousKeyType } = cal.dataset;

  if (type === "number") {
    if (displayScreen === "0") {
      calScreen.textContent = keyValue;
    } else if (previousKeyType === "operator") {
      calScreen.textContent = keyValue;
    } else {
      calScreen.textContent = displayScreen + keyValue;
    }
  }

  if (type === "operator") {
    const operatorKeys = keys.querySelectorAll("[data-type = selected]");
    operatorKeys.forEach((el) => {
      el.dataset.state = "";
    });

    key.dataset.state = "seleted";

    cal.dataset.firstNumber = displayScreen;
    cal.dataset.operator = key.dataset.key;
  }

  if (type === "equal") {
    // perform calculation

    const firstNumber = parseInt(cal.dataset.firstNumber);
    const operator = cal.dataset.operator;
    const secondNumber = parseInt(displayScreen);

    console.log(firstNumber, operator, secondNumber);

    let result = "";
    if (operator === "plus") result = firstNumber + secondNumber;
    if (operator === "minus") result = firstNumber - secondNumber;
    if (operator === "divide") result = firstNumber / secondNumber;
    if (operator === "times") result = firstNumber * secondNumber;

    calScreen.textContent = result;

    console.log(operator);
  }

  if (type === "clear") {
    calScreen.textContent = "0";
    delete cal.dataset.firstNumber;
    delete cal.dataset.operator;
  }

  cal.dataset.previousKeyType = type;
});
