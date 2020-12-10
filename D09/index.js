const readFile = require("../utils/readFile");

const day9Riddle = () => {
    const input = readFile(__dirname).split("\n").map(el => parseInt(el, 10))

    function checkIfSumValid(numberInput, array) {
        let number1;
        let number2;

        for (let i = 0; i < array.length; i++) {
            for (j = 0; j < array.length; j++) {
                if (i !== j) {
                    if ((array[i] + array[j]) === numberInput) {
                        number1 = array[i];
                        number2 = array[j];
                    }
                }
            }
        }

        return number1 && number2 ? numberInput : false
    }

    const range = 25;
    let i = range;
    let isValidNumber = true;
    let wrongNumber;

    while (isValidNumber) {
        const arrayToCheck = input.slice(i - range, i);
        isValidNumber = checkIfSumValid(input[i], arrayToCheck);
        if (!isValidNumber) {
            wrongNumber = input[i];
            console.log(wrongNumber);
        }
        i++;
    }

    for (let i = 0; i < input.length; i++) {
        let sum = 0;
        let range = 2;
        let numbersToSum = [];
        while (sum < wrongNumber) {
            numbersToSum = input.slice(i, i + range);
            sum = numbersToSum.reduce((total, value) => {
                return total + value;
            }, 0)

            if (sum === wrongNumber) {
                break;
            }
            range++;
        }

        if (sum === wrongNumber) {
            numbersToSum = numbersToSum.sort((a, b) => b - a);
            console.log(numbersToSum.shift() + numbersToSum.pop());
            break;
        }
    }

}

module.exports = day9Riddle;