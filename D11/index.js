const readFile = require("../utils/readFile");

const day11Riddle = () => {
    const input = readFile(__dirname).split("\n").map(singleLine => singleLine.split(""));

    function isSeat(el) {
        return el !== '.'
    }

    function toggleSeatPart1(el, i, j, input) {

        let adjacentSeats = [];

        if (j + 1 < input[i].length) {
            adjacentSeats.push([input[i][j + 1]]);
        }
        if (i + 1 < input.length && j + 1 < input[i].length) {
            adjacentSeats.push([input[i + 1][j + 1]]);
        }
        if (i + 1 < input.length) {
            adjacentSeats.push([input[i + 1][j]]);
        }
        if (i + 1 < input.length && j - 1 >= 0) {
            adjacentSeats.push([input[i + 1][j - 1]]);
        }
        if (j - 1 >= 0) {
            adjacentSeats.push([input[i][j - 1]]);
        }
        if (i - 1 >= 0 && j - 1 >= 0) {
            adjacentSeats.push([input[i - 1][j - 1]]);
        }
        if (i - 1 >= 0) {
            adjacentSeats.push([input[i - 1][j]]);
        }
        if (i - 1 >= 0 && j + 1 < input[i].length) {
            adjacentSeats.push([input[i - 1][j + 1]]);
        }

        if (el === 'L') {
            return adjacentSeats.flat().every(el => el !== '#') ? "#" : el;
        } else if (el === '#') {
            return adjacentSeats.flat().filter(s => s === '#').length >= 4 ? 'L' : el;
        }
    }

    function toggleSeatPart2(el, i, j, input) {

        let adjacentSeats = [];

        adjacentSeats.push(input[i].slice(j + 1).find(el => el !== '.')); // get right
        adjacentSeats.push(input[i].slice(0, j).reverse().find(el => el !== '.')); // get left

        for (let y = i + 1; y < input.length; y++) { // get down
            if(input[y][j] !== '.') {
                adjacentSeats.push(input[y][j]);
                break;
            }
        }

        for (let y = i - 1 >= 0 ? (i - 1) : 0; (y >= 0) && (y !== i); y--) { // get up
            if(input[y][j] !== '.') {
                adjacentSeats.push(input[y][j]);
                break;
            }
        }

        let y = i + 1;
        let x = j + 1;

        while (y < input.length && x < input[i].length) { // get SE
            if(input[y][x] !== '.') {
                adjacentSeats.push(input[y][x]);
                break;
            }
            y++;
            x++;
        }

        y = i + 1;
        x = j - 1;

        while (y < input.length && x >= 0) { // get SW
            if(input[y][x] !== '.') {
                adjacentSeats.push(input[y][x]);
                break;
            }
            y++;
            x--;
        }

        y = i - 1;
        x = j + 1;

        while (y >= 0 && x < input[i].length) { // get NE
            if(input[y][x] !== '.') {
                adjacentSeats.push(input[y][x]);
                break;
            }
            y--;
            x++;
        }

        y = i - 1;
        x = j - 1;

        while (y >= 0 && x >= 0) { // get NW
            if(input[y][x] !== '.') {
                adjacentSeats.push(input[y][x]);
                break;
            }
            y--;
            x--;
        }

        adjacentSeats = adjacentSeats.filter(el => el !== undefined);

        if (el === 'L') {
            return adjacentSeats.flat().every(el => el !== '#') ? "#" : el;
        } else if (el === '#') {
            return adjacentSeats.flat().filter(s => s === '#').length >= 5 ? 'L' : el;
        }
    }

    function solvePart1(input) {
        let entryInput = [...input]
        let outputInput = []

        while (JSON.stringify(entryInput) !== JSON.stringify(outputInput)) {
            if (outputInput.length) {
                entryInput = [...outputInput];
            }
            outputInput.length = 0; // clear from past data
            for (let i = 0; i < entryInput.length; i++) {
                outputInput.push(new Array());
                for (let j = 0; j < entryInput[i].length; j++) {
                    if (isSeat(entryInput[i][j])) {
                        outputInput[i].push(toggleSeatPart1(entryInput[i][j], i, j, entryInput));
                    } else {
                        outputInput[i].push(entryInput[i][j])
                    }
                }
            }
        }
        console.log(outputInput.flat(2).filter(el => el === "#").length);
    }

    function solvePart2(input) {
        let entryInput = [...input]
        let outputInput = []

        while (JSON.stringify(entryInput) !== JSON.stringify(outputInput)) {
            if (outputInput.length) {
                entryInput = [...outputInput];
            }
            outputInput.length = 0; // clear from past data
            for (let i = 0; i < entryInput.length; i++) {
                outputInput.push(new Array());
                for (let j = 0; j < entryInput[i].length; j++) {
                    if (isSeat(entryInput[i][j])) {
                        outputInput[i].push(toggleSeatPart2(entryInput[i][j], i, j, entryInput));
                    } else {
                        outputInput[i].push(entryInput[i][j])
                    }
                }
            }
        }
        console.log(outputInput.flat(2).filter(el => el === "#").length);
    }

    solvePart1(input)
    solvePart2(input)

}

module.exports = day11Riddle;