const fs = require("fs");

const readFile = input => {
    return fs.readFileSync(input + "/input.txt", "utf8");
};

module.exports = readFile;