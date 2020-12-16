const readFile = require("../utils/readFile");

const day16Riddle = () => {
    const input = readFile(__dirname).split("\n\n")

    const propsMap = new Map();

    input[0].split('\n').forEach(prop => {
        const splitProp = prop.split(': ');
        const propName = splitProp[0];
        let propValues = [];
        splitProp[1].split(' or ').forEach(range => {
            const splitRange = range.split("-").map(digit => {
                return parseInt(digit, 10)
            });
            for (let i = splitRange[0]; i <= splitRange[1]; i++) {
                propValues.push(i)
            }
        });
        propsMap.set(propName, propValues)
    });

    let allValidValues = []

    propsMap.forEach(prop => {
        allValidValues.push(...prop)
    });

    allValidValues = [...new Set(allValidValues)];

    const tickets = input[2].split('\n').slice(1).map(ticket => ticket.split(',').map(value => parseInt(value, 10)));
    const invalidValues = [];

    tickets.forEach(ticket => {
        ticket.forEach(value => {
            if (!allValidValues.includes(value)) {
                invalidValues.push(value);
            }
        })
    })
    const scanningErrorRate = invalidValues.reduce((total, val) => {
        return total + val
    }, 0)

    console.log(scanningErrorRate);

    const validTickets = tickets.map(ticket => { // filter out all invalid tickets and keep only valid ones
        return ticket.every(value => allValidValues.includes(value)) ? ticket : null;
    }).filter(ticket => ticket !== null)
    
    const myTicket = (input[1].split('\n'))[1].split(',').map(val => parseInt(val, 10));
    const propsMapIndexed = new Map();

    myTicket.forEach((val, i) => {
        const allPropVals = [];

        for (let j = 0; j < validTickets.length; j++) {
            allPropVals.push(validTickets[j][i])
        }

        const propsMapKeys = [...propsMap.keys()];

        for (let k = 0; k < propsMapKeys.length; k++) { // find all matching array indexes for each ticket property
            if (allPropVals.every(propVal => {
                return propsMap.get(propsMapKeys[k]).includes(propVal)
            })) {
                if (!propsMapIndexed.get(propsMapKeys[k])) {
                    propsMapIndexed.set(propsMapKeys[k], i);
                } else {
                    const indexes = [];
                    indexes.push(propsMapIndexed.get(propsMapKeys[k]));
                    const indexesFlat = indexes.flat(Infinity);
                    indexesFlat.push(i);
                    propsMapIndexed.set(propsMapKeys[k], indexesFlat);
                }
            }
        }
    })

    while([...propsMapIndexed.values()].some(arr => Array.isArray(arr))) { //reduce Map element values to single items (remove duplicated indexes if single values somewhere else)
        const singleIndexes = [];

        propsMapIndexed.forEach(value => {
            if(!Array.isArray(value)) {
                singleIndexes.push(value)
            }
        });

        singleIndexes.forEach(singleIndex => {
            propsMapIndexed.forEach((value, key) => {
                if(Array.isArray(value) && value.includes(singleIndex)) {
                    value.splice(value.indexOf(singleIndex), 1);
                    if(value.length === 1) {
                        value = value[0];
                    }
                    propsMapIndexed.set(key, value)
                }
            })
        })
    }

    const propsMapIndexedKeys = [...propsMapIndexed.keys()].filter(key => { // find all keys with word 'departure'
        return key.match('departure');
    })


    const departureValuesMultiply = propsMapIndexedKeys.map((key) => { // get matching index number, fetch the value, and then multiple all of them together
        return myTicket[propsMapIndexed.get(key)]
    }).reduce((value, total) => {
        return total * value;
    }, 1)

    console.log(departureValuesMultiply);
}

module.exports = day16Riddle;