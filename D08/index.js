const readFile = require("../utils/readFile");

const day8Riddle = () => {
    const input = readFile(__dirname).split("\n");

    function checkCodes(type, input) {
        let i = 0;
        let accSum = 0;
        const accomplishedSteps = [];
        while (accomplishedSteps.indexOf(i) === -1 && i < input.length) {
            const operation = input[i].split(" ");
            if (operation[0] === 'acc') {
                accSum += parseInt(operation[1], 10);
                accomplishedSteps.push(i)
                i++;
            } else if (operation[0] === 'jmp') {
                accomplishedSteps.push(i);
                i += parseInt(operation[1], 10);
            } else if (operation[0] === 'nop') {
                accomplishedSteps.push(i);
                i++;
            }
        }

        if (type === 'prevent') {
            if (i === (input.length)) {
                return accSum;
            }
            return false;
        } else if (type === 'find') {
            return accSum;
        }
    }

    function findTheLoop(input) {
        return checkCodes('find', input);
    }

    function preventTheLoop(input) {
        let indexToChange = 0;
        let sum;

        while (indexToChange < input.length) {
            // prepare the data each time
            const inputToIterate = input.map((value, index) => {
                if (index === indexToChange) {
                    let operation = value.split(" ");
                    if (operation[0] === 'jmp') {
                        operation[0] = 'nop'
                        return operation.join(" ");
                    } else if (operation[0] === 'nop') {
                        operation[0] = 'jmp'
                        return operation.join(" ")
                    } else {
                        return operation.join(" ");
                    }
                } else {
                    return value;
                }
            });

            indexToChange++;
            sum = checkCodes('prevent', inputToIterate)
            if (!!sum) {
                break;
            }
        }
        if (!!sum) {
            return sum;
        }
    }

    console.log("Accumulator value before starting a loop: " + findTheLoop(input));
    console.log("Accumulator value after fixing the loop: " + preventTheLoop(input));
}

module.exports = day8Riddle;