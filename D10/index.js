const readFile = require("../utils/readFile");

const day10Riddle = () => {
    const input = readFile(__dirname).split("\n").map(el => parseInt(el, 10)).sort((a, b) => a - b);
    input.unshift(0);
    input.push(input[input.length - 1] + 3)

    let oneDiffJoints = 0;
    let threeDiffJoints = 0;

    input.forEach((el, index, array) => {
        if (index < array.length - 1) {
            if ((array[index + 1] - el === 1)) {
                oneDiffJoints++;
            } else if ((array[index + 1] - el === 3)) {
                threeDiffJoints++;
            }
        }
    });

    console.log(oneDiffJoints * threeDiffJoints);

    const possibilities = new Array(input.length).fill(0);
    possibilities[0] = 1;

    for (let i = 0; i < input.length; ++i) {
        for (let j = i + 1; j < input.length; ++j) {
            if (input[j] - input[i] > 3) break;
            possibilities[j] += possibilities[i];
        }
    }

    console.log(possibilities[possibilities.length - 1]);
}

module.exports = day10Riddle;