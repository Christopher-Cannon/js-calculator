// Simpler type conversion functions
const num = x => Number(x);
const str = x => String(x);

function Calculator() {
  this.ZERO = "0";
  this.expression = [];
  this.curNumber = this.ZERO;
  this.curOperator = "";
  this.evaluate = function() {
    console.log(this.expression);
    console.log(this.getExpression());
  }
  this.push = function(x) {
    this.expression.push(x);
  };
  this.pop = function() {
    this.expression.pop();
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
  this.getCurrentNumber = function() {
    return this.curNumber;
  };
  this.appendToCurrentNumber = function(x) {
    if (this.curNumber === this.ZERO) {
      this.curNumber = x;
    } else {
      this.curNumber += x;
    }
  };
  this.storeCurrentNumber = function() {
    this.expression.push(this.curNumber);
    this.curNumber = this.ZERO;
  };
  this.getCurrentOperator = function() {
    return this.curOperator;
  };
  this.updateCurrentOperator = function(x) {
    this.curOperator = x;
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
}

const c = new Calculator();

const expression = document.querySelector("#expression");
const output = document.querySelector("#output");
const buttons = document.querySelectorAll("button");

output.value = c.getCurrentNumber();
expression.textContent = c.getExpression();

for (const button of buttons) {
  button.addEventListener("click", (e) => {
    console.log(e.target.id);

    switch (e.target.id) {
      case "back":
        c.back();
        break;
      case "clear":
        c.clear();
        break;
      case "clearE":
        c.clearE();
        break;
      case "plusMinus":
        c.plusMinus();
        break;
      case "exponent":
        
        break;
      case "exponentY":
        //if (number !== "" && number !== ZERO) operationList.push(number, "**");
        break;
      case "point":
        c.point();
        break;
      case "divide":
        c.storeCurrentNumber();
        c.updateCurrentOperator("/");
        break;
      case "multiply":
        c.storeCurrentNumber();
        c.updateCurrentOperator("*");
        break;
      case "subtract":
        c.storeCurrentNumber();
        c.updateCurrentOperator("-");
        break;
      case "add":
        c.storeCurrentNumber();
        c.updateCurrentOperator("+");
        break;
      case "equals":
        c.storeCurrentNumber();
        c.clearExpression();

        console.log("EVALUATE EXPRESSION, CLEAR EXPRESSION, OUTPUT TOTAL");
        break;
      case "zero":
        c.storeCurrentOperator();
        c.appendToCurrentNumber("0");
        break;
      case "one":
        c.storeCurrentOperator();
        c.appendToCurrentNumber("1");
        break;
      case "two":
        c.storeCurrentOperator();
        c.appendToCurrentNumber("2");
        break;
      case "three":
        c.storeCurrentOperator();
        c.appendToCurrentNumber("3");
        break;
      case "four":
        c.storeCurrentOperator();
        c.appendToCurrentNumber("4");
        break;
      case "five":
        c.storeCurrentOperator();
        c.appendToCurrentNumber("5");
        break;
      case "six":
        c.storeCurrentOperator();
        c.appendToCurrentNumber("6");
        break;
      case "seven":
        c.storeCurrentOperator();
        c.appendToCurrentNumber("7");
        break;
      case "eight":
        c.storeCurrentOperator();
        c.appendToCurrentNumber("8");
        break;
      case "nine":
        c.storeCurrentOperator();
        c.appendToCurrentNumber("9");
        break;
      }
      if (c.expressionIsEmpty()) {
        output.value = c.getCurrentNumber();
      } else {
        output.value = c.getCurrentNumber();
        // output.value = c.evaluate();
      }
    if (c.getCurrentOperator() !== "") {
      expression.textContent = c.getExpression() + ` ${c.getCurrentOperator()}`;
    } else {
      expression.textContent = c.getExpression();
    }
  });
}
