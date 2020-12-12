const readFile = require("../utils/readFile");

const day12Riddle = () => {
    const input = readFile(__dirname).split("\n").map(step => {
        return {dir: step.slice(0, 1), value: parseInt(step.slice(1), 10)}
    });


    const stepsPart1 = [];
    stepsPart1.push({x: 0, y: 0, dir: "E"});

    const directions = ["N", "E", "S", "W"]

    input.forEach(step => {
        const lastPosition = stepsPart1[stepsPart1.length - 1];
        const currentDir = lastPosition.dir;
        let newDir = currentDir;


        if (step.dir === "L" || step.dir === "R") {
            const rotateValue = (step.value / 90);
            const currentDirIndex = directions.indexOf(currentDir);
            if (step.dir === "L") {
                newDir = directions[currentDirIndex - rotateValue] !== undefined ? directions[currentDirIndex - rotateValue] : directions[directions.length - (rotateValue - currentDirIndex)];
            } else {
                newDir = directions[currentDirIndex + rotateValue] !== undefined ? directions[currentDirIndex + rotateValue] : directions[(rotateValue - 1) - ((directions.length - 1) - currentDirIndex)];
            }
            stepsPart1.push({x: lastPosition.x, y: lastPosition.y, dir: newDir});
        } else {
            if (step.dir === "F") {
                let x = lastPosition.x;
                let y = lastPosition.y
                switch (newDir) {
                    case 'N':
                        y += step.value;
                        break;
                    case 'E':
                        x += step.value;
                        break;
                    case 'S':
                        y -= step.value;
                        break;
                    case 'W':
                        x -= step.value;
                        break;
                }
                stepsPart1.push({x: x, y: y, dir: newDir})
            } else {
                let x = lastPosition.x;
                let y = lastPosition.y
                switch (step.dir) {
                    case 'N':
                        y += step.value;
                        break;
                    case 'E':
                        x += step.value;
                        break;
                    case 'S':
                        y -= step.value;
                        break;
                    case 'W':
                        x -= step.value;
                        break;
                }
                stepsPart1.push({x: x, y: y, dir: newDir})
            }
        }
    });

    const lastPosition = stepsPart1[stepsPart1.length - 1];
    const manhattanDist = Math.abs(lastPosition.x) + Math.abs(lastPosition.y);

    console.log(manhattanDist);

    // Part 2

    const stepsPart2 = [];
    stepsPart2.push({x: 0, y: 0, xw: 10, yw: 1});

    input.forEach(step => {
        const lastPositionData = stepsPart2[stepsPart2.length - 1];
        if (step.dir === 'F') {
            stepsPart2.push({
                x: lastPositionData.x += (lastPositionData.xw * step.value),
                y: lastPositionData.y += (lastPositionData.yw * step.value),
                xw: lastPositionData.xw,
                yw: lastPositionData.yw
            })
        } else if (directions.includes(step.dir)) {
            switch (step.dir) {
                case 'N':
                    lastPositionData.yw += step.value;
                    break;
                case 'E':
                    lastPositionData.xw += step.value;
                    break;
                case 'S':
                    lastPositionData.yw -= step.value;
                    break;
                case 'W':
                    lastPositionData.xw -= step.value;
                    break;
            }

            stepsPart2.push({
                x: lastPositionData.x,
                y: lastPositionData.y,
                xw: lastPositionData.xw,
                yw: lastPositionData.yw
            })
        } else {
            const rotationSteps = step.value / 90;
            let xwTemp;
            let ywTemp;

            for (let i = 0; i < rotationSteps; i++) {
                xwTemp = lastPositionData.xw;
                ywTemp = lastPositionData.yw;

                lastPositionData.yw = Math.abs(xwTemp);
                lastPositionData.xw = Math.abs(ywTemp);

                if(step.dir === 'R') {
                    if (ywTemp < 0) {
                        lastPositionData.xw = lastPositionData.xw * (-1);
                    }
                    if (xwTemp > 0) {
                        lastPositionData.yw = lastPositionData.yw * (-1);
                    }
                } else {
                    if(ywTemp > 0) {
                        lastPositionData.xw = lastPositionData.xw *(-1);
                    }

                    if(xwTemp < 0) {
                        lastPositionData.yw = lastPositionData.yw * (-1);
                    }
                }
            }

            stepsPart2.push({
                x: lastPositionData.x,
                y: lastPositionData.y,
                xw: lastPositionData.xw,
                yw: lastPositionData.yw
            })
        }
    });

    const lastPosition2 = stepsPart2[stepsPart2.length - 1];
    const manhattanDist2 = Math.abs(lastPosition2.x) + Math.abs(lastPosition2.y);

    console.log(manhattanDist2);
}

module.exports = day12Riddle;