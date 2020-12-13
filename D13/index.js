const readFile = require("../utils/readFile");

const day13Riddle = () => {
    const input = readFile(__dirname).split("\n");

    const inputOne = input[1].split(",").filter(id => id !== 'x');
    const timeDeparts  = new Map();

    inputOne.forEach(id => {
        let multiplicator = 1;

        while (multiplicator * id < input[0]) {
            multiplicator++
        }
        timeDeparts.set(id, multiplicator * id);
    });

    const sortedTimeDeparts = new Map([...timeDeparts.entries()].sort((a, b) => a[1] - b[1]));
    console.log(sortedTimeDeparts.entries().next().value[0] * (sortedTimeDeparts.entries().next().value[1] - input[0]));

    const inputTwo = input[1].split(',');
    let timestamp = 0;
    let multiplier = parseInt(inputTwo[0], 10);
    
    for(let i = 1; i < inputTwo.length; i++) {
        if(inputTwo[i] !== 'x') {
            while(true) {
                if((timestamp + i) % parseInt(inputTwo[i], 10) === 0) {
                 multiplier *= parseInt(inputTwo[i], 10);
                 break;
                }
                timestamp += multiplier;
            }
        }
    }

    console.log(timestamp);

}

module.exports = day13Riddle;