const readFile = require("../utils/readFile");

const day1Riddle = () => {
    const input = readFile(__dirname).split("\n").map((value) => {
        return parseInt(value, 10);
    });

    function checkIfSum2020twoDigits (input) {
        let number1;
        let number2;

        for (let i = 0; i < input.length; i++) {
            for (j = 0; j < input.length; j++) {
                if (i !== j) {
                    if ((input[i] + input[j]) === 2020) {
                        number1 = input[i];
                        number2 = input[j];
                    }
                }
            }
        }

        return {number1, number2}
    }

    function checkIfSum2020threeDigits (input) {
        let number1;
        let number2;
        let number3;

        for (let i = 0; i < input.length; i++) {
            for (j = 0; j < input.length; j++) {
                for(k = 0; k < input.length; k++) {
                    if (i !== j !== k) {
                        if ((input[i] + input[j] + input[k]) === 2020) {
                            number1 = input[i];
                            number2 = input[j];
                            number3 = input[k];
                        }
                    }
                }
            }
        }

        return {number1, number2, number3}
    }

    const twoNumbers = checkIfSum2020twoDigits(input);

    console.log(twoNumbers);
    console.log(twoNumbers.number1 * twoNumbers.number2);

    const threeNumbers = checkIfSum2020threeDigits(input);
    console.log(threeNumbers);
    console.log(threeNumbers.number1 * threeNumbers.number2 * threeNumbers.number3);
}

module.exports = day1Riddle;