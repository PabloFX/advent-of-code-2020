const readFile = require("../utils/readFile");

const day6Riddle = () => {
    const input = readFile(__dirname).split("\n\n").map(singleLine => {
        return singleLine.split("\n").join("");
    });

    const filteredAnswers = input.map(singleGroup => {
        return new Set(singleGroup.split(""));
    });

    const yesCount = filteredAnswers.reduce((total, singleSet) => {
        return total + singleSet.size;
    }, 0);

    console.log("Total 'yes' count: " + yesCount);

// Part 2

    const input2 = readFile(__dirname).split("\n\n").map(singleLine => {
        return singleLine.split("\n");
    });

    const setsToArrays = filteredAnswers.map(singleSet => [...singleSet]);

    // setsToArrays - list all of different answers in each group to check with
    // input2- data to check

    function checkIfAnswerInAll(answer, answerArray) {
        const answerCount = answerArray.reduce((total, singlePerson) => {
            if (singlePerson.indexOf(answer) !== -1) {
                return total += 1;
            } else {
                return total;
            }
        }, 0);

        return answerCount === answerArray.length;
    }

    const sameAnswersCount = setsToArrays.reduce((total, set, index) => {
        const checkedArrays = set.map(el => {
            return checkIfAnswerInAll(el, input2[index]);
        });

        return total + checkedArrays.filter(Boolean).length
    }, 0)

    console.log("Same answers count: " + sameAnswersCount);
}

module.exports = day6Riddle;