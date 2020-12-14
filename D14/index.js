const readFile = require("../utils/readFile");

const day14Riddle = () => {
    const input = readFile(__dirname).split("\n");

    const parsedInput = new Array();

    input.forEach(line => {
        const splitLine = line.split(" = ");
        parsedInput.push([splitLine[0].startsWith('mem') ? splitLine[0].slice(4, -1) : splitLine[0], splitLine[1]])
    });

    function convertData(currentMask, mem, value) {
        const reversedBinaryValue = value.toString(2).split('').reverse().join('');
        const reversedMask = currentMask.split('').reverse().join((''))
        let newValue = [];

        for (let i = 0; i < reversedMask.length; i++) {
            if (reversedMask[i] === 'X') {
                if (reversedBinaryValue[i]) {
                    newValue.push(reversedBinaryValue[i])
                } else {
                    newValue.push('0')
                }

            } else {
                newValue.push(reversedMask[i])
            }
        }
        return [mem, newValue.reverse().join('')]
    }

    const convertedValues = new Map();
    let currentMask = '';

    parsedInput.forEach(([key, val]) => {
        if (key === 'mask') {
            currentMask = val;
        } else {
            const convertedData = convertData(currentMask, key, parseInt(val, 10));
            convertedValues.set(convertedData[0], convertedData[1])
        }
    })

    let valuesArray = [...convertedValues.values()];
    valuesArray = valuesArray.map(binaryVal => parseInt(binaryVal, 2));
    const sum = valuesArray.reduce((total, val) => {
        return total + val;
    }, 0);

    console.log(sum);


    function maskAddress(currentMask, address) {
        let reversedBinaryAddress = address.toString(2).split('').reverse().join('');
        const reversedMask = currentMask.split('').reverse().join((''))

        let newAddress = [];
        reversedBinaryAddress = reversedBinaryAddress.concat('0'.repeat(reversedMask.length - reversedBinaryAddress.length)); // fill with missing zeros if address binary value is shorter than mask length

        for (let i = 0; i < reversedMask.length; i++) {
            if (reversedMask[i] === '1') {
                newAddress.push('1');
            } else if (reversedMask[i] === 'X') {
                newAddress.push('X')
            } else {
                newAddress.push(reversedBinaryAddress[i])
            }
        }

        return newAddress.reverse().join('');
    }

    function findAllAddressesCombination(floatingAddress) {
        let addressesCombination = [];
        let floatingIndex = floatingAddress.indexOf('X');
        let address = [...floatingAddress]
        address[floatingIndex] = 0;
        addressesCombination.push(address.join(''));
        address[floatingIndex] = 1;
        addressesCombination.push(address.join(''));

        let i = 0;
        while (i < addressesCombination.length) {
            if (addressesCombination[i].indexOf('X') !== -1) {
                floatingIndex = addressesCombination[i].indexOf('X')
            } else {
                break;
            }
            address = [...addressesCombination[i]];
            address[floatingIndex] = 0;
            addressesCombination.push(address.join(''));
            address[floatingIndex] = 1;
            addressesCombination.push(address.join(''));
            i++;
        }

        return addressesCombination.filter(single => single.indexOf('X') === -1).map(s => parseInt(s, 2));
    }

    const convertedValuesPartTwo = new Map();
    let currentMaskPartTwo = '';

    parsedInput.forEach(([key, val]) => {
        if (key === 'mask') {
            currentMaskPartTwo = val;
        } else {
            const allAddresses = findAllAddressesCombination(maskAddress(currentMaskPartTwo, parseInt(key, 10)));
            allAddresses.forEach(address => {
                convertedValuesPartTwo.set(address, val)
            })
        }
    })

    let valuesArrayPartTwo = [...convertedValuesPartTwo.values()];
    valuesArrayPartTwo = valuesArrayPartTwo.map(decimalVal => parseInt(decimalVal, 10));
    const sumPartTwo = valuesArrayPartTwo.reduce((total, val) => {
        return total + val;
    }, 0);

    console.log(sumPartTwo);
}

module.exports = day14Riddle;