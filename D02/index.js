const readFile = require("../utils/readFile");

const day2Riddle = () => {
    const input = readFile(__dirname).split("\n").map(singleLine => {
        const line = singleLine.split(" ");
        let parsedLine = [];
        const letterLimit = line[0].split("-").map(value => {
            return parseInt(value, 10);
        });
        parsedLine.push(letterLimit);
        parsedLine.push(line[1].split("").shift());
        parsedLine.push(line[2]);
        return parsedLine;
    });

    function checkIfValidLength(singleLineInput) {
        const lowerLimit = singleLineInput[0][0];
        const upperLimit = singleLineInput[0][1];
        const letterToCheck = singleLineInput[1];


        const letterCount = singleLineInput[2].split("").reduce((letterCount, currentLetter) => {
            if (currentLetter === letterToCheck) {
                return letterCount + 1
            } else {
                return letterCount;
            }
        }, 0);

        return (letterCount >= lowerLimit && letterCount <= upperLimit);
    }

    function checkIfValidOccurrence(singleLineInput) {
        const firstPosition = singleLineInput[0][0];
        const secondPosition = singleLineInput[0][1];
        const letterToCheck = singleLineInput[1];

        function checkPositions(password) {
            let testResult = [];
            testResult.push(password[firstPosition - 1] === letterToCheck);
            testResult.push(password[secondPosition - 1] === letterToCheck);
            return testResult
        }

        return checkPositions(singleLineInput[2].split(""));
    }
    const validPasswordsLength = input.map(checkIfValidLength).filter(passwordChecked => {
        return passwordChecked;
    }).length;
    console.log("Number of valid passwords by length: " + validPasswordsLength);

    const validPasswordOccurrence = input.map(checkIfValidOccurrence).filter(passwordChecked => {
        return passwordChecked.filter(letterTestResult => letterTestResult).length === 1;
    }).length;
    console.log("Number of valid passwords by occurrence: " + validPasswordOccurrence);
}

module.exports = day2Riddle;