const readFile = require("../utils/readFile");

const day4Riddle = () => {
    String.prototype.replaceAll = function (target, replacement) {
        return this.split(target).join(replacement);
    };

    const input = readFile(__dirname).split("\n").join().split(',,').map(el => {
        const passportEl = el.replaceAll(",", " ").split(" ").map(prop => {
            return prop.split(":")
        });
        const passportMap = new Map();
        passportEl.forEach(el => {
            passportMap.set(el[0], el[1]);
        });
        return passportMap;
    });

    function checkPassportByFieldCount(passport) {
        if (passport.size === 8) {
            return passport
        } else if (passport.size < 7) {
            return false
        } else {
            return !passport.has("cid") ? passport : false;
        }
    }

    const validatedPassportsByFieldCount = input.map(el => checkPassportByFieldCount(el)).filter(el => el !== false);
    console.log("Passports validated by property number: " + validatedPassportsByFieldCount.length);

    //
    function checkPassportByProperty(passport) {
        if (checkBirthday(passport.get('byr')) === false) {
            return false;
        }

        if (checkIssueYear(passport.get('iyr')) === false) {
            return false;
        }

        if (checkExpYear(passport.get('eyr')) === false) {
            return false;
        }

        if (checkHeight(passport.get('hgt')) === false) {
            return false;
        }

        if (checkHairColor(passport.get('hcl')) === false) {
            return false;
        }

        if (checkEyeColor(passport.get('ecl')) === false) {
            return false;
        }

        if (checkPassportId(passport.get('pid')) === false) {
            return false;
        }

        return passport;
    }

    function checkBirthday(date) {
        return (1920 <= parseInt(date, 10) && parseInt(date, 10) <= 2002)
    }

    function checkIssueYear(date) {
        return 2010 <= parseInt(date, 10) && parseInt(date, 10) <= 2020
    }

    function checkExpYear(date) {
        return 2020 <= parseInt(date, 10) && parseInt(date, 10) <= 2030
    }

    function checkPassportId(pid) {
        return pid.length === 9
    }

    function checkEyeColor(ecl) {
        const validColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
        return validColors.includes(ecl);
    }

    function checkHairColor(hcl) {
        const stringHcl = String(hcl);
        const hclArr = stringHcl.split('');
        const validChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
        if (hclArr.length === 7 || hclArr[0] === "#") {
            return hclArr.splice(1, 6).every(el => validChars.includes(el));
        }

        return false;
    }

    function checkHeight(hgt) {
        const unit = hgt.slice(-2);
        if (unit === 'cm') {
            return (hgt.length === 5) && (150 <= hgt.slice(0, 3) <= 193)

        } else if (unit === 'in') {
            return (hgt.length === 4) && (59 <= hgt.slice(0, 2) <= 76)
        }

        return false;
    }

    const validatedPassportsByProperty = validatedPassportsByFieldCount.map(el => checkPassportByProperty(el)).filter(el => el !== false);
    console.log("Passports validated by property validation: " + validatedPassportsByProperty.length);


}

module.exports = day4Riddle;