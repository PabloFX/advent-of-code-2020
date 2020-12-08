const readFile = require("../utils/readFile");

const day7Riddle = () => {

    String.prototype.replaceAll = function (target, replacement) {
        return this.split(target).join(replacement);
    };

    const input = readFile(__dirname).split("\n").map(bagRule => {
        const splitBagRule = bagRule.replaceAll(" bags", "")
            .replaceAll("bags,", "bag,")
            .replaceAll(" bag", "")
            .replaceAll(" bag,", ",")
            .replaceAll(" bags.", ".")
            .replaceAll(/[0-9]/g, "")
            .replaceAll(".", "")
            .split(" contain ");

        const splitBagRuleProps = splitBagRule[1].trim().split(",").map(prop => prop.trim());
        const bagMap = new Map();
        return bagMap.set(splitBagRule[0], splitBagRuleProps)
    });

    const mergedMap = input.reduce((merged, single) => {
        return new Map([...merged, ...single])
    });

    [...mergedMap.keys()].forEach(key => {
        mergedMap.get(key).forEach((value, index, array) => {
            if (array[index].endsWith('s') && array[index] !== 'no others') {
                array[index] = array[index].split('').slice(0, -1).join('');
            }
        })
    });

    function bagHasGold(inputArray) {
        if (inputArray.length === 1) {
            if (inputArray[0] === 'shiny gold' || inputArray[0] === true) {
                return true;
            } else if (inputArray[0] === 'no other' || inputArray[0] === false) {
                return false;
            } else {
                return bagHasGold(mergedMap.get(inputArray[0]))
            }
        } else {
            if (inputArray.indexOf('shiny gold') !== -1) {
                return true
            } else {
                return inputArray.map((value) => {
                    return bagHasGold(mergedMap.get(value));
                })
            }
        }
    }


    const checkedMap = [...mergedMap.keys()].map(key => {
        const bagMap = new Map();
        return bagMap.set(key, bagHasGold(mergedMap.get(key)))
    })

    const mergedCheckedMap = checkedMap.reduce((merged, single) => {
        return new Map([...merged, ...single])
    });

    let numberOfValidBags = 0;

    mergedCheckedMap.forEach(mapEl => {
        if (Array.isArray(mapEl)) {
            if (mapEl.flat(Infinity).filter(Boolean).length) {
                numberOfValidBags += 1;
            }
        } else {
            if (mapEl === true) {
                numberOfValidBags += 1;
            }
        }
    });

    console.log("Number of bag color types that can contain shiny gold bag: " +numberOfValidBags);

    const input2 = readFile(__dirname).split("\n").map(bagRule => {
        const splitBagRule = bagRule.replaceAll(" bags", "")
            .replaceAll("bags,", "bag,")
            .replaceAll(" bag", "")
            .replaceAll(" bag,", ",")
            .replaceAll(" bags.", ".")
            .replaceAll(".", "")
            .replaceAll('no other', '')
            .split(" contain ")

        const splitBagRuleProps = splitBagRule[1].trim().split(",").filter(prop => prop).map(prop => prop.trim());
        const bagMap = new Map();
        return bagMap.set(splitBagRule[0], splitBagRuleProps)
    });

    const mergedMap2 = input2.reduce((merged, single) => {
        return new Map([...merged, ...single])
    });

    function howManyInsideBag(inputArray, sum = 0) {
        if (inputArray.length) {
            inputArray.forEach(bag => {
                sum += parseInt(bag.match(/\d+/g)[0], 10);
                sum += parseInt(bag.match(/\d+/g)[0], 10) * parseInt(howManyInsideBag(mergedMap2.get(bag.match(/\D+/g)[0].trim())), 10);
            })
        }

        return sum;
    }

    const howManyInGold = howManyInsideBag(mergedMap2.get('shiny gold'));
    console.log("Number of other bags in gold bag: " + howManyInGold);
}

module.exports = day7Riddle;