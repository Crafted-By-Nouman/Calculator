// Create stars
const starsContainer = document.getElementById("stars");
for (let i = 0; i < 100; i++) {
  const star = document.createElement("div");
  star.classList.add("star");
  star.style.width = `${Math.random() * 3}px`;
  star.style.height = star.style.width;
  star.style.left = `${Math.random() * 100}%`;
  star.style.top = `${Math.random() * 100}%`;
  star.style.opacity = Math.random();
  star.style.setProperty("--duration", `${Math.random() * 3 + 2}s`);
  starsContainer.appendChild(star);
}

// Calculator functionality
class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = "0";
    this.previousOperand = "";
    this.operation = undefined;
    this.updateDisplay();
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
    if (this.currentOperand === "") {
      this.currentOperand = "0";
    }
    this.updateDisplay();
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    if (this.currentOperand === "0" && number !== ".") {
      this.currentOperand = number.toString();
    } else {
      this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    this.updateDisplay();
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
    this.updateDisplay();
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "×":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      default:
        return;
    }

    this.currentOperand = computation.toString();
    this.operation = undefined;
    this.previousOperand = "";
    this.updateDisplay();
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;

    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }

    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );

    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = "";
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    button.classList.add("active");
    setTimeout(() => button.classList.remove("active"), 100);
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    button.classList.add("active");
    setTimeout(() => button.classList.remove("active"), 100);
  });
});

equalsButton.addEventListener("click", () => {
  calculator.compute();
  equalsButton.classList.add("active");
  setTimeout(() => equalsButton.classList.remove("active"), 100);
});

allClearButton.addEventListener("click", () => {
  calculator.clear();
  allClearButton.classList.add("active");
  setTimeout(() => allClearButton.classList.remove("active"), 100);
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  deleteButton.classList.add("active");
  setTimeout(() => deleteButton.classList.remove("active"), 100);
});

// Add keyboard support
document.addEventListener("keydown", (e) => {
  if (e.key >= 0 && e.key <= 9) calculator.appendNumber(e.key);
  if (e.key === ".") calculator.appendNumber(".");
  if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
    calculator.chooseOperation(
      e.key === "*" ? "×" : e.key === "/" ? "÷" : e.key
    );
  }
  if (e.key === "Enter" || e.key === "=") calculator.compute();
  if (e.key === "Backspace") calculator.delete();
  if (e.key === "Escape") calculator.clear();
});

// Add 3D tilt effect
const calc = document.querySelector(".calculator");
calc.addEventListener("mousemove", (e) => {
  const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
  const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
  calc.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});

calc.addEventListener("mouseenter", () => {
  calc.style.transition = "none";
});

calc.addEventListener("mouseleave", () => {
  calc.style.transition = "transform 0.5s";
  calc.style.transform = "rotateY(0deg) rotateX(0deg)";
});
