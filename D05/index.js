const readFile = require("../utils/readFile");

const day5Riddle = () => {
    const input = readFile(__dirname).split("\n")

    function checkSeatRow(combination) {
        let lowRangeLimit = 0;
        let highRangeLimit = 127;
        return combination.split('').splice(0, 7).map(letter => {
            if (letter === "F") {
                const range = highRangeLimit - lowRangeLimit;
                if (range > 1) {
                    const rangeHalf = Math.ceil(range / 2);
                    highRangeLimit = highRangeLimit - rangeHalf
                }
                return lowRangeLimit;
            } else if (letter === "B") {
                const range = highRangeLimit - lowRangeLimit;
                if (range > 1) {
                    const rangeHalf = Math.ceil(range / 2);
                    lowRangeLimit = lowRangeLimit + rangeHalf;
                }
                return highRangeLimit
            }
        });
    }

    function checkSeatColumn(combination) {
        let lowRangeLimit = 0;
        let highRangeLimit = 7;
        return combination.split('').splice(7, 3).map(letter => {
            if (letter === "L") {
                const range = highRangeLimit - lowRangeLimit;
                if (range > 1) {
                    const rangeHalf = Math.ceil(range / 2);
                    highRangeLimit = highRangeLimit - rangeHalf
                }
                return lowRangeLimit;
            } else if (letter === "R") {
                const range = highRangeLimit - lowRangeLimit;
                if (range > 1) {
                    const rangeHalf = Math.ceil(range / 2);

                    lowRangeLimit = lowRangeLimit + rangeHalf;
                }
                return highRangeLimit
            }
        });
    }

    const seatID = input.map(combination => {
        const rowNumber = checkSeatRow(combination);
        const columnNumber = checkSeatColumn(combination);

        return (rowNumber.slice(-1)[0] * 8) + columnNumber.slice(-1)[0];
    });


    const highestID = seatID.reduce((high, current) => {
        if (current > high) {
            high = current
        }
        return high;
    });

    console.log("Highest seat ID: " + highestID);

    const sortedSeatID = seatID.sort((a, b) => {
        return a - b;
    });

    for (let i = 0; i < sortedSeatID.length; i++) {
        if (sortedSeatID[i + 1] - sortedSeatID[i] !== 1) {
            console.log("Correct seat ID: :" + (sortedSeatID[i] + 1));
        }
    }
}

module.exports = day5Riddle;