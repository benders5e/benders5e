// select elements
const dieFormula = document.querySelector("#die-formula");
const submitBtn = document.querySelector("#submit");
const resultText = document.querySelector("#result");
let errMsg = "Incorrectly formatted formula. Try typing it a different way.";

function evalFormula(f) {
    if(!isNaN(Number(f)))
        return Number(f);

    try {
        let splitD = f.split("d");
        let numDice = splitD[0];

        let dieType;
        let keep;
        let reroll;
        if(splitD[1].includes("r")) { // 1d[20r1]
            let splitR = splitD[1].split("r");
            dieType = Number(splitR[0]);

            if(splitR[1].includes("k")) { // 2d[20r1k1]
                let splitK = splitR[1].split("k");
                keep = Number(splitK[1]); // may be NaN

                reroll = [].concat(splitK[0].split(",").map(Number));
            } else {
                reroll = [].concat(splitR[1].split(",").map(Number));
            }
        } else if(splitD[1].includes("k")) { // 2d[20k1]
            let splitK = splitD[1].split("k");
            dieType = Number(splitK[0]);

            keep = Number(splitK[1]); // may be NaN
        } else {
            dieType = Number(splitD[1]);
        }

        // console.log("numDice: " + numDice + ", dieType: " + dieType + ", keep: " + keep + ", reroll: " + reroll);

        let result;
        let rollsList = [];
        if(numDice === undefined || dieType === undefined || dieType < 1) {
            return {rolls: [], result: errMsg};
        } else {
            for(j = 0; j < numDice; j++) {
                rollsList.push(roll(dieType));
            }
            // reroll
            if(reroll !== undefined) {
                // Check if formula is impossible (prevent infinite loop)
                let rollRange = [...Array(dieType+1).keys()].slice(1);
                if(rollRange.sort().toString() === reroll.sort().toString) {
                    // check if they are equal
                    return {rolls: [], result: errMsg};
                }

                for(i = 0; i < rollsList.length; i++) {
                    let count = 0;
                    while(reroll.indexOf(rollsList[i]) > -1 && count < 100) {
                        rollsList[i] = roll(dieType);
                        count++;
                    }
                }
                //console.log(`rolls after rerolling ${rollsList}`);
            }
            // keep
            if(keep !== undefined) {
                if(keep > numDice) {
                    return {rolls: [], result: errMsg};
                }
                let sortedRolls = [].concat(rollsList).sort((a,b) => a-b);
                let toKeep = sortedRolls.slice(sortedRolls.length-keep, sortedRolls.length);

                rollsList = toKeep.sort((a,b) => rollsList.indexOf(a) - rollsList.indexOf(b));
            }
        }

        let outcome = rollsList.reduce(function (a, b) {
            return a + b;
        }, 0);
        output = {rolls: rollsList, result: outcome};
        // console.log(output);
        return output;
    }
    catch (error) {
        return {rolls: [], result: errMsg};
    }
}

function roll(dieType) {
    return Math.floor(Math.random()*dieType+1);
}

function rollDice() {
    let formula = dieFormula.value;
    let results = [];
    let signs = [];

    // split + first
    let formulas = formula.split("+");
    formulas = formulas.map(s => s.trim()); // may not be numbers
    for(let j = 0; j < formulas.length; j++) {
        let formulas2 = formulas[j].split("-");
        formulas2 = formulas2.map(s => s.trim());
        let curr_signs = ["+"];
        for(let i = 0; i < formulas2.length; i++) {
            results.push(evalFormula(formulas2[i]));
            if(i > 0)
                curr_signs.push("-");
        }
        signs = signs.concat(curr_signs);
    }

    let str = "(" + results[0]["rolls"] + ")"; // = " + results[0]["result"];
    let total = Number(results[0]["result"]);
    if(results.length != signs.length) {
        alert("Error: results length != signs length! Try a different formula.");
    }
    for(let i = 1; i < results.length; i++) {
        if(typeof results[i] === 'number') {
            if(signs[i] == "+") {
                str += " + " + results[i];
                total += results[i];
            } else {
                str += " - " + results[i];
                total -= results[i];
            }
        } else {
            if(signs[i] == "+") {
                str += " + (" + results[i]["rolls"] + ")"; // = " + results[i]["result"];
                total += Number(results[i]["result"]);
            } else {
                str += " - (" + results[i]["rolls"] + ")"; // = " + results[i]["result"];
                total -= Number(results[i]["result"]);
            }
        }
    }
    str += " = " + total;
    if (str.includes("NaN"))
        resultText.textContent = errMsg;
    else
        resultText.textContent = str;
}
submitBtn.addEventListener('click', rollDice);