const readFile = require("../utils/readFile");

const day15Riddle = () => {
    const input = readFile(__dirname).split(",").map(el => parseInt(el, 10));

    const numbersArray = [...input];
    while (true) {
        const lastNumber = numbersArray[numbersArray.length - 1];

        const occurrencesIndexes = numbersArray.map((el, i) => {
            if (el === lastNumber) {
                return i;
            }
        }).filter(idx => idx !== undefined);

        if (occurrencesIndexes.length === 1) {
            numbersArray.push(0)
        } else {
            numbersArray.push(occurrencesIndexes[occurrencesIndexes.length - 1] - occurrencesIndexes[occurrencesIndexes.length - 2]);
        }

        if (numbersArray.length === 2020) {
            break;
        }
    }

    console.log(numbersArray[numbersArray.length - 1]);

    // Part 2

    const numbersMap = new Map()

    input.forEach((el, idx) => {
        numbersMap.set(el, [idx]);
    })

    let lastNumber = input[input.length - 1];
    let lastIndex = input.length - 1;

    for (lastIndex; lastIndex < 30000000 - 1; lastIndex++) {
        if (numbersMap.get(lastNumber).length === 1) {
            const zeroIndexes = numbersMap.get(0);
            zeroIndexes.push(lastIndex + 1);
            if (zeroIndexes.length > 2) {
                zeroIndexes.shift();
            }
            numbersMap.set(0, zeroIndexes);
            lastNumber = 0;
        } else if (numbersMap.get(lastNumber).length === 2) {
            const idxArr = numbersMap.get(lastNumber);
            const newVal = idxArr[1] - idxArr[0];

            if (numbersMap.get(newVal) === undefined) {
                numbersMap.set(newVal, [lastIndex + 1]);
                lastNumber = newVal;
            } else {
                const newIdxArr = numbersMap.get(newVal);
                newIdxArr.push(lastIndex + 1);
                if (newIdxArr.length > 2) {
                    newIdxArr.shift();
                }
                numbersMap.set(newVal, newIdxArr);
                lastNumber = newVal;
            }
        }
    }
    console.log(lastNumber);
}

module.exports = day15Riddle;