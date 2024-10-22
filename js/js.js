const updateOperatingNumbers = function() {
    if (resetNumOne) {
        numberOne = 0;
        resetNumOne = false;
    }
    if (operationSelected !== null) {
        if (bDecimalMode) {
            if (numberTwo < 0) {
                numberTwo = numberTwo - +this.textContent/Math.pow(10, ++decimalInputCounter);
            }
            else {
                numberTwo = numberTwo + +this.textContent/Math.pow(10, ++decimalInputCounter);
            }
        }
        else {
            if (numberTwo < 0) {
                numberTwo = numberTwo*10 - +this.textContent;
            }
            else {
                numberTwo = numberTwo*10 + +this.textContent;
            }
        }
        if (bMakeNegative & numberTwo !== 0) {
            numberTwo = -1 * numberTwo;
            bMakeNegative = false;
        }
        if (bDecimalMode & +this.textContent === 0) {
            displaySpecial(decimalInputCounter, bMakeNegative, numberTwo);
        }
        else {
            displayValue(numberTwo);
        }
        bOperationReady = true;
    }
    else {
        if (bDecimalMode) {
            if (numberOne < 0) {
                numberOne = numberOne - +this.textContent/Math.pow(10, ++decimalInputCounter);
            }
            else {
                numberOne = numberOne + +this.textContent/Math.pow(10, ++decimalInputCounter);
            }
        }
        else {
            if (numberOne < 0) {
                numberOne = numberOne*10 - +this.textContent;
            }
            else {
                numberOne = numberOne*10 + +this.textContent;
            }
        }
        if (bMakeNegative & numberOne !== 0) {
            numberOne = -1 * numberOne;
            bMakeNegative = false;
        }
        if (bDecimalMode & +this.textContent === 0) {
            displaySpecial(decimalInputCounter, bMakeNegative, numberOne);
        }
        else {
            displayValue(numberOne);
        }
    }
    // console.log(numberOne, operationSelected, numberTwo);
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
        num = val;
        let strVal = val.toPrecision(10);
        val = +strVal;
        if (strVal.includes('e')) {
            numDigitsInEVal = String(val.toExponential()).split('e')[1].length;
            val = val.toExponential(10-numDigitsInEVal);
        }
        else {
            decimalStr = strVal.split('.')[1];
            if(decimalStr === undefined) {
                numDecimals = 0;
            }
            else {
                numDecimals = decimalStr.replace(/0*$/, '').length;
            }
            //get number of non decimals
            numDigits = strVal.split('.')[0].length;
            //divide up the space
            if (numDigits > 11) {
                //display exponetial
                numDigitsInEVal = String(val.toExponential()).split('e')[1].length;
                val = val.toExponential(10-numDigitsInEVal);                    
            }
            else {
                if (numDigits === 0 & numDecimals > 11) {
                    //display small number
                    numDigitsInEVal = String(val.toExponential()).split('e')[1].length;
                    val = val.toExponential(10-numDigitsInEVal);
                }
                else{
                    //split space
                    numDecimals = 13 - numDigits
                    val = Math.round(val*Math.pow(10, numDecimals))/Math.pow(10, numDecimals);
                }    
            }
        }
        outputArea.textContent = val;
    }
}

const displaySpecial = function(numDigitsAfterDecimal, bNeg, initVal) {
    let strVal = initVal.toPrecision(15);
    strVal = strVal.replace(/0*$/, '');
    if (strVal.length > 10) {
        displayValue(initVal);
    }
    else {
        outputArea.textContent = '';
        if (!strVal.includes('-') & bNeg) {
            outputArea.textContent += '-'
        }
        if (strVal.includes('.')) {
            outputArea.textContent += strVal
            for (let i = 0; i < Math.min(numDigitsAfterDecimal - (strVal.split('.')[1].length), 12 - strVal.length); i++) {
                outputArea.textContent += '0';
            }
        }
        else {
            outputArea.textContent += strVal
            outputArea.textContent += '.'
            for (let i = 0; i < numDigitsAfterDecimal; i++) {
                outputArea.textContent += '0';
            }
        }            
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
    decimalInputCounter = 0;
    displayValue(0);
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
        if(bMakeNegative) {
            outputArea.textContent = '-' + outputArea.textContent;
        }
    }
    bDecimalMode = true;
}

const negateValue = function() {
    if (operationSelected !== null) {
        if (numberTwo === 0) {
            bMakeNegative = true;
            displayValue('-');
        }
        else {
            numberTwo = -1 * numberTwo;
            displayValue(numberTwo);    
        }
    }
    else {
        if (numberOne === 0) {
            bMakeNegative = true;
            displayValue('-');
        }
        else {
            numberOne = -1 * numberOne;
            displayValue(numberOne);    
        }
    }    
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

const signButton = document.querySelector(".sign-button");
signButton.addEventListener("click", negateValue);

const outputArea = document.querySelector(".output");

//start calc vars
let numberOne = 0;
let numberTwo = 0;
let operationSelected = null;
let resetNumOne = true;
let bOperationReady = false;
let bDecimalMode = false;
let decimalInputCounter = 0;
let bMakeNegative = false;
