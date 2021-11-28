// Simpler type conversion functions
const num = x => Number(x);
const str = x => String(x);

function Calculator() {
  this.ZERO = "0";
  this.expression = [];
  this.result = "";
  this.curNumber = this.ZERO;
  this.curOperator = "";
  this.numbers = {
    "zero": "0",
    "one": "1",
    "two": "2",
    "three": "3",
    "four": "4",
    "five": "5",
    "six": "6",
    "seven": "7",
    "eight": "8",
    "nine": "9",
  };
  this.operators = {
    "divide": "/",
    "multiply": "*",
    "subtract": "-",
    "add": "+",
    "pow": "^",
  };
  this.functions = ["log", "sqrt"];
  this.debug = function(button) {
    try {
      console.log("button:", button);
      console.log("curNumber:", this.getCurrentNumber());
      console.log("curOperator:", this.getCurrentOperator());
      console.log("result:", this.getResult());
      console.log("getExpression():", this.getExpression());
    } catch (error) {
      console.log(error);
    }
  };
  this.evaluate = function() {
    this.result = math.evaluate(this.getExpression());
  };
  this.push = function(x) {
    this.expression.push(x);
  };
  this.pop = function() {
    return this.expression.pop();
  };
  this.expressionIsEmpty = function() {
    if (!this.expression.length) return true;
    return false;
  };
  this.clearExpression = function() {
    this.expression = [];
  };
  this.getExpression = function() {
    return this.expression.join(" ");
  };
  this.getResult = function() {
    return this.result;
  };
  this.getCurrentNumber = function() {
    return this.curNumber;
  };
  this.appendToCurrentNumber = function(num) {
    if (this.curNumber === this.ZERO) {
      this.curNumber = this.numbers[num];
    } else {
      this.curNumber += this.numbers[num];
    }
  };
  this.storeCurrentNumber = function(fn="") {
    if (fn !== "") {
      if (this.lastStoredWasFunction()) {
        this.expression.push(`${fn}(${this.pop()})`);
      } else {
        this.expression.push(`${fn}(${this.curNumber})`);
      }
    } else {
      this.expression.push(this.curNumber);
    }
    this.curNumber = this.ZERO;
  };
  this.getCurrentOperator = function() {
    return this.curOperator;
  };
  this.updateCurrentOperator = function(op) {
    this.curOperator = this.operators[op];
  };
  this.storeCurrentOperator = function() {
    if (this.curOperator !== "") {
      this.expression.push(this.curOperator);
      this.curOperator = "";
    }
  };
  this.lastStored = function() {
    if (!this.expressionIsEmpty()){
      return this.expression[this.expression.length - 1];
    }
    return false;
  };
  this.lastStoredWasNumber = function() {
    if (!Number.isNaN(num(this.lastStored()))) return true;
    return false;
  };
  this.lastStoredWasFunction = function() {
    if (!this.lastStored()) return false;

    for (const fn of this.functions) {
      if (this.lastStored().startsWith(fn)) return true;
    }

    return false;
  };
  this.back = function() {
    if (this.curNumber !== this.ZERO) {
      this.curNumber = this.curNumber.slice(0, this.curNumber.length - 1);
    }
    if (this.curNumber === "") {
      this.curNumber = this.ZERO;
    }
  };
  this.clear = function() {
    this.expression = [];
    this.curNumber = this.ZERO;
    this.curOperator = "";
  };
  this.clearE = function() {
    this.curNumber = this.ZERO;
  };
  this.plusMinus = function() {
    this.curNumber = this.curNumber[0] !== "-" ? "-" + this.curNumber : this.curNumber.slice(1);
  };
  this.point = function() {
    if (!this.curNumber.includes(".")) this.curNumber += ".";
  };
  this.number = function(num) {
    this.storeCurrentOperator();
    this.appendToCurrentNumber(num);
  };
  this.operator = function(op) {
    if (!this.lastStoredWasFunction()) {
      if (!this.lastStoredWasNumber() || this.expressionIsEmpty()) this.storeCurrentNumber();
    }
    this.updateCurrentOperator(op);
  };
  this.square = function() {
    if (!this.lastStoredWasFunction()) {
      if (!this.lastStoredWasNumber() || this.expressionIsEmpty()) this.storeCurrentNumber();
    }
    this.updateCurrentOperator("pow");
    this.storeCurrentOperator();
    this.push("2");
  };
  this.function = function(button) {
    this.storeCurrentOperator();
    this.storeCurrentNumber(button);
  };
  this.equals = function() {
    // If equals is clicked after clicking an operator
    if (this.getCurrentNumber() === "0") this.storeCurrentOperator();
    if (!this.lastStoredWasFunction()) this.storeCurrentNumber();
    this.evaluate();
    this.clearExpression();
  };
}

const c = new Calculator();

const expression = document.querySelector("#expression");
const output = document.querySelector("#output");
const buttons = document.querySelectorAll("button");

output.value = c.getCurrentNumber();
expression.textContent = c.getExpression();

const displayResult = function() {
  try {
    c.evaluate();
  } catch (error) {
    console.log(`Error: couldn't evaluate (${error})`);
  }
  output.value = c.getResult();
};

const displayExpression = function() {
  if (c.getCurrentOperator() !== "") {
    expression.textContent = c.getExpression() + ` ${c.getCurrentOperator()}`;
  } else {
    expression.textContent = c.getExpression();
  }
};

for (const button of buttons) {
  button.addEventListener("click", (e) => {
    switch (e.target.id) {
      case "back":
        c.back();
        output.value = c.getCurrentNumber();
        break;
      case "clear":
        c.clear();
        output.value = c.getCurrentNumber();
        break;
      case "clearE":
        c.clearE();
        output.value = c.getCurrentNumber();
        break;
      case "plusMinus":
        c.plusMinus();
        break;
      case "sqrt":
      case "log":
        c.function(e.target.id);
        displayResult();
        break;
      case "point":
        c.point();
        break;
      case "divide":
      case "multiply":
      case "subtract":
      case "add":
      case "pow":
        c.operator(e.target.id);
        displayResult();
        break;
      case "sqr":
        c.square();
        displayResult();
        break;
      case "equals":
        c.equals();
        output.value = c.getResult();
        break;
      case "zero":
      case "one":
      case "two":
      case "three":
      case "four":
      case "five":
      case "six":
      case "seven":
      case "eight":
      case "nine":
        c.number(e.target.id);
        output.value = c.getCurrentNumber();
        break;
      }

    // Display expression above output box
    displayExpression();
  });
}
