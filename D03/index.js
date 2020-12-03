const readFile = require("../utils/readFile");

const day3Riddle = () => {
    const input = readFile(__dirname).split("\n").map(singleLine => singleLine.split(""));

    // Increase array size if steps are getting out of bounds (day 3 - increase only width)
    function adjustArray(input, stepVertical, stepHorizontal) {
        if (Math.floor(input[0].length / input.length) < Math.ceil(stepHorizontal / stepVertical)) {
            const arrayMultiplier = Math.ceil((input.length * stepHorizontal) / input[0].length);

            return input.map(singleLine => {
                const lineToCopy = [...singleLine];
                for (let i = 0; i < (arrayMultiplier + 1); i++) {
                    singleLine.push(...lineToCopy);
                }
                return singleLine;
            });
        } else {
            return input;
        }
    }

    function traverseArray(input, stepVertical, stepHorizontal, target, blank) {
        const adjustedInput = adjustArray(input, stepVertical, stepHorizontal);
        let posHorizontal = 0;
        let resultsArray = [];
        for (let i = 0; i < adjustedInput.length; i += stepVertical) {
            resultsArray.push(adjustedInput[i][posHorizontal] === target);
            posHorizontal += stepHorizontal;
        }
        return resultsArray;
    }

    const targetCount = traverseArray(input, 1, 3, "#", ".").filter(Boolean).length;
    console.log("Slope 3 and 1: " + targetCount);

    // ### PART 2 ###
    const stepsArray = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]];

    function checkOtherSlopes(input, stepsArray, target, blank) {
        return stepsArray.map(steps => traverseArray(input, steps[1], steps[0], target, blank).filter(Boolean).length);
    }

    const slopesMultiplied = checkOtherSlopes(input, stepsArray, "#", ".").reduce((prev, curr) => prev * curr);

    console.log('Trees from all Slopes multiplied: ' + slopesMultiplied);
}

module.exports = day3Riddle;