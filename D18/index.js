const readFile = require("../utils/readFile");

const day18Riddle = () => {
    const input = readFile(__dirname).split('\n')

    function parseBrackets(expression) { // parse string to separate equation in brackets
        let bracketsLevel = 0;
        let splitString = [];
        let insideBracket = [];

        for (let i = 0; i < expression.length; i++) {
            if (expression[i] === "(") {
                if (bracketsLevel > 0) {
                    insideBracket.push(expression[i])
                }
                bracketsLevel++;
            } else if (expression[i] === ")") {
                bracketsLevel--;
                if (bracketsLevel > 0) {
                    insideBracket.push(expression[i])
                }
                if (bracketsLevel === 0) {
                    splitString.push((JSON.parse(JSON.stringify(insideBracket))))
                    insideBracket.length = 0;
                }
            } else {
                if (bracketsLevel > 0 && expression[i] !== ' ') {
                    insideBracket.push(expression[i])
                } else if (expression[i] !== ' ') {
                    splitString.push(expression[i])
                }
            }
        }

        return splitString;
    }

    function parseNumbers(splitString) { // parse all numbers to Number Type
        return splitString.map(el => {
            if (Array.isArray(el)) {
                return el.join('')
            } else {
                if (el !== "+" && el !== "*") {
                    return parseInt(el, 10);
                } else {
                    return el;
                }

            }
        })
    }

    function groupAdditions(splitString) { // group elements that are summed together (Part 2 helper function)
        for (let i = 0; i < splitString.length; i++) {
            if ((splitString[i + 1]) === "+") {
                const newArr = splitString.slice(i, i + 3);
                splitString.splice(i, 3, newArr);
                i = 0;
            }
        }

        return splitString
    }

    function arrayToString(arr) {
        return arr.map(el => {
            if (Array.isArray(el)) {
                return "(" + arrayToString(el) + ")"
            } else if (el.length > 1) {
                return "(" + el + ")"
            } else {
                return el;

            }
        }).join('')
    }

    // Part 1 function
    function calculateExpression(expression) {
        const splitString = parseNumbers(parseBrackets(expression))
        return splitString.reduce((total, el, i, arr) => {
            if (i === 0) {
                if (el.length > 1) {
                    return total + calculateExpression(el);
                } else {
                    return total + el
                }
            }
            if (el === "+" || el === "*") {
                return total;
            } else if (el.length > 1) {
                if (arr[i - 1] === "+") {
                    return total + calculateExpression(el);
                } else if (arr[i - 1] === "*") {
                    return total * calculateExpression(el);
                }
            } else {
                if (arr[i - 1] === "+") {
                    return total + parseInt(el, 10);
                } else if (arr[i - 1] === "*") {
                    return total * parseInt(el, 10);
                }
            }
        }, 0)
    }

    // Part 2 function
    function calculateExpressionAdditionPrioritized(expression) {
        let splitString = groupAdditions(parseNumbers(parseBrackets(expression)))

        // flat array if nested
        if (splitString.length === 1) {
            splitString = [...splitString[0]]
        }

        return splitString.reduce((total, el, i, arr) => {
            if (i === 0) { // check if first element is single value or grouped equation
                if (el.length > 1) {
                    if (Array.isArray(el)) {
                        el = arrayToString(el)
                    }
                    return total + calculateExpressionAdditionPrioritized(el);
                } else {
                    return total + el
                }
            }
            if (el === "+" || el === "*") { // if sign, skip
                return total;
            } else if (el.length > 1) { // if nested equation, calculate recursively
                if (Array.isArray(el)) { // if array, change to string
                    el = arrayToString(el)
                }
                if (arr[i - 1] === "+") {
                    return total + calculateExpressionAdditionPrioritized(el);
                } else if (arr[i - 1] === "*") {
                    return total * calculateExpressionAdditionPrioritized(el);
                }
            } else { // if single value, add or multiply total by it
                if (arr[i - 1] === "+") {
                    return total + parseInt(el, 10);
                } else if (arr[i - 1] === "*") {
                    return total * parseInt(el, 10);
                }
            }
        }, 0)
    }

    const calculatedInput = input.map(equation => {
        return calculateExpression(equation)
    }).reduce((total, el) => {
        return total + el;
    }, 0)

    console.log(calculatedInput);

    const calculatedInputPartTwo = input.map(equation => {
        return calculateExpressionAdditionPrioritized(equation)
    }).reduce((total, el) => {
        return total + el;
    }, 0)

    console.log(calculatedInputPartTwo);

}

module.exports = day18Riddle;