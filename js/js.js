const updateOperatingNumbers = function() {
    if (resetNumOne) {
        numberOne = 0;
        resetNumOne = false;
    }
    if (operationSelected !== null) {
        if (bDecimalMode) {
            numberTwo = numberTwo + +this.textContent/Math.pow(10, ++decimalInputCounter);
        }
        else {
            numberTwo = numberTwo*10 + +this.textContent;
        }
        displayValue(numberTwo);
        bOperationReady = true;
    }
    else {
        if (bDecimalMode) {
            numberOne = numberOne + +this.textContent/Math.pow(10, ++decimalInputCounter);
        }
        else {
            numberOne = numberOne*10 + +this.textContent;
        }
        displayValue(numberOne);
    }
    console.log(numberOne, operationSelected, numberTwo)
}

const updateOperation = function() {
    if (operationSelected === null) {
        operationSelected = this.textContent;
        bDecimalMode = false;
        decimalInputCounter = 0;
        resetNumOne = false;
    }
    else if(!bOperationReady) {
        operationSelected = this.textContent;
        resetNumOne = false;
    }
    else {
        doOperation();
        operationSelected = this.textContent;
        bDecimalMode = false;
        decimalInputCounter = 0;
        resetNumOne = false;
    }
}

const displayValue = function(val) {
    if (typeof val === 'string') {
        outputArea.textContent = val;
    }
    else {
        //10000000
        //get number of decimal
        numDecimal = String((val - Math.round(val))).length - 1;
        //get number of non decimals
        numDigits = String(Math.round(val)).length;
        //divide up the 12 digits of space
        availableDecimalSpace = Math.max(12 - numDigits, numDecimal > 2 ? 2 : numDigits);
        numDecimalsToDisplay = Math.min(availableDecimalSpace, numDecimal)
        //precision problems
        numDecimalsToDisplay = Math.min(7, numDecimalsToDisplay);
        numDigitsToDisplay = Math.min(12 - numDecimalsToDisplay, numDigits);
        val = Math.round(val*Math.pow(10, numDecimalsToDisplay))/Math.pow(10, numDecimalsToDisplay);
            if (val >= Math.pow(10, numDigitsToDisplay)) {
                val = val.toExponential(numDigitsToDisplay-4);
            }
        outputArea.textContent = val;
    }
}

const doOperation = function() {
    if (bOperationReady) {
        switch (operationSelected) {
            case '+':
                displayValue(numberOne + numberTwo);
                numberOne = numberOne + numberTwo;
                numberTwo = 0;
                break;
            case '-':
                displayValue(numberOne - numberTwo);
                numberOne = numberOne - numberTwo;
                numberTwo = 0;
                break;
            case '*':
                displayValue(numberOne * numberTwo);
                numberOne = numberOne * numberTwo;
                numberTwo = 0;
                break;
            case '/':
                if (numberTwo === 0) {
                    displayValue("aaaaaaaa")
                    numberOne = 0;
                    numberTwo = 0;
                }
                else {
                    displayValue(numberOne / numberTwo);
                    numberOne = numberOne / numberTwo;
                    numberTwo = 0;
                }
                break;    
        }
        //new operation
        operationSelected = null;
        //if user inputs number, reset the first number
        resetNumOne = true;   
        //cant do another op immediatly
        bOperationReady = false;
        //check if should be in decimal mode
        bDecimalMode = false
        decimalInputCounter = 0;
    }
}

const clearValues = function() {
    numberOne = 0;
    operationSelected = null;
    numberTwo = 0;
    bDecimalMode = false;
    displayValue(0);
}

const deleteInput = function() {
    //remember decimals
}

const changeDecimalMode = function() {
    if (!bDecimalMode) {
        if (resetNumOne) {
            numberOne = 0;
            resetNumOne = false;
            displayValue(numberOne);
            outputArea.textContent += '.';
        }    
        else if (operationSelected !== null) {
            displayValue(numberTwo);
            outputArea.textContent += '.';
        }
        else {
            displayValue(numberOne);
            outputArea.textContent += '.';
        }    
    }
    bDecimalMode = true;
}

const numButtons = document.querySelectorAll(".num-button");
numButtons.forEach(button => {
    button.addEventListener("click", updateOperatingNumbers);
})

const opButtons = document.querySelectorAll(".op-button");
opButtons.forEach(button => {
    button.addEventListener("click", updateOperation);
})

const eqButton = document.querySelector(".eq-button");
eqButton.addEventListener("click", doOperation);

const clearButton = document.querySelector(".clear-button");
clearButton.addEventListener("click", clearValues);

const decimalButton = document.querySelector(".decimal-button");
decimalButton.addEventListener("click", changeDecimalMode);

const outputArea = document.querySelector(".output");

//start calc vars
let numberOne = 0;
let numberTwo = 0;
let operationSelected = null;
let resetNumOne = true;
let bOperationReady = false;
let bDecimalMode = false;
let decimalInputCounter = 0;
