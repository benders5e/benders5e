// select elements
const myTable = document.querySelector("#player-table");
const nameInput = document.querySelector("#name-input");
const acInput = document.querySelector("#AC-input");
const hpInput = document.querySelector("#HP-input");
const addBtn = document.querySelector("#add");
const resultText = document.querySelector("#result");
var appendRowPos = 2;

var rows = [];

function updateHP(event, inputField, myRow) {
    var oldHP = myRow.currHP;
    var index = myRow.id;

    // only update *after* user has hit enter
    if(event.key === "Enter" || event.keyCode === 13) {
        let dmg = 0;
        let input = inputField.value;
        // if the input starts with +/-
        // update HP accordingly
        if(input[0] === "+" || input[0] === "-") {
            // if they took damage
            if(Number(input) < 0) {
                dmg = Math.abs(Number(input));
            }
            // update HP
            inputField.value = Math.floor(Number(oldHP) + Number(input));
        }
        // else if input is plain number
        // set that as the new HP
        myRow.currHP = inputField.value;

        /*** check for zone change ***/
        if(dmg > 0) {
            // check if cross an HP checkpoint first
            // |hp3|=====3=====|hp2|=====2=====|hp1|=====1=====|0|=====KO=====
            let oldCheckpt = 0;
            if(oldHP > Number(myRow.hp2.textContent)) {
                oldCheckpt = 3;
            } else if(oldHP > Number(myRow.hp1.textContent)) {
                oldCheckpt = 2;
            } else if (oldHP > 0) {
                oldCheckpt = 1;
            }
            let newCheckpt = 0; // means you are at <= 0 HP
            if(myRow.currHP > Number(myRow.hp2.textContent)) {
                newCheckpt = 3;
            } else if(myRow.currHP > Number(myRow.hp1.textContent)) {
                newCheckpt = 2;
            } else if(myRow.currHP > 0) {
                newCheckpt = 1;
            }
            let numHPBoundaryCrossings = oldCheckpt-newCheckpt;

            // if no crossing, use damage distance
            let oldDist = Number(myRow.distField.value);
            let newDist = oldDist;
            if(numHPBoundaryCrossings == 0) {
                newDist = oldDist - dmg;
            }
            let numDmgCrossings = 0;
            while(newDist <= 0) {
                numDmgCrossings = numDmgCrossings+1;
                newDist = Math.min(newDist + 30, 29); // can't be at exactly 30 because then you'd be on the line
            }

            let oldZone = Number(myRow.zoneField.value)
            let newZone = oldZone + numHPBoundaryCrossings + numDmgCrossings;

            // announce result
            if(newZone > 3 || newCheckpt == 0) { // knockout
                resultText.textContent = "KNOCKOUT!!!";
                setTimeout(function() {
                    resultText.textContent = "";
                }, 3000); // time in ms
                myRow.zone.textContent = "KO";
                myRow.dist.textContent = "--";
            } else if(numHPBoundaryCrossings > 0) {
                resultText.textContent = `BWEHHH! ${myRow.name.textContent} is knocked back ${newZone-oldZone} zone(s).`;
                setTimeout(function() {
                    resultText.textContent = "";
                }, 3000);
                newDist = 29;
                myRow.zoneField.value = newZone;
                myRow.distField.value = newDist;
            } else if(numDmgCrossings > 0) {
                resultText.textContent = `BWEHHH! ${myRow.name.textContent} is knocked back ${Math.abs(dmg)} feet into zone ${newZone}.`;
                setTimeout(function() {
                    resultText.textContent = "";
                }, 3000);
                myRow.zoneField.value = newZone;
                myRow.distField.value = newDist;
            } else { // only move within zone
                resultText.textContent = `${myRow.name.textContent} is knocked back ${Math.abs(dmg)} feet.`;
                setTimeout(function() {
                    resultText.textContent = "";
                }, 3000);
                myRow.distField.value = newDist;
            }
        }
        // update row in rows array
        rows[index] = myRow;
    }
}

function addChar() {
    /*** create new row ***/
    let newRow = myTable.insertRow(appendRowPos);
    let nameCell = newRow.insertCell(0);
    let ACcell = newRow.insertCell(1);
    let HPcell = newRow.insertCell(2);
    let hpFull = newRow.insertCell(3);
    let hp2 = newRow.insertCell(4);
    let hp1 = newRow.insertCell(5);
    let zone = newRow.insertCell(6);
    let dist = newRow.insertCell(7);

    /*** populate fields ***/
    nameCell.textContent = nameInput.value;
    let resetBtn = document.createElement("input");
    resetBtn.type = "submit";
    resetBtn.value = "reset";
    resetBtn.className = "reset-btn";
    nameCell.appendChild(resetBtn);

    let newAC = document.createElement("input");
    newAC.type = "number";
    newAC.value = acInput.value;
    ACcell.appendChild(newAC);

    let hp = hpInput.value;
    let newHP = document.createElement("input");
    newHP.type = "number";
    newHP.value = hp;
    HPcell.appendChild(newHP);

    // HP checkpoints
    hpFull.textContent = hp;
    hp2.textContent = Math.floor(hp/3*2);
    hp1.textContent = Math.floor(hp/3);

    // position
    // zone.textContent = "1";
    let zoneInput = document.createElement("input");
    zoneInput.type = "number";
    zoneInput.value = 1;
    zone.appendChild(zoneInput);

    // dist.textContent = "25";
    let distInput = document.createElement("input");
    distInput.type = "number";
    distInput.value = 25;
    dist.appendChild(distInput);

    /*** add row elements to array ***/
    myId = appendRowPos-2;
    rows.push({
        id: myId,
        name: nameCell, 
        ac: newAC,
        currHP: hp, hpField: newHP,
        hp3: hpFull, hp2: hp2, hp1: hp1,
        zone: zone, zoneField: zoneInput, 
        dist: dist, distField: distInput,
        reset: resetBtn
    });
    // add event listener for each row's HP field
    for(let i = 0; i < rows.length; i++) {
        rows[i].hpField.addEventListener('keyup', function(e) { updateHP(e, rows[i].hpField, rows[i]);});
        rows[i].reset.addEventListener('click', function() { resetChar(rows[i]); });
    }

    /*** clear input fields ***/
    nameInput.value = "";
    acInput.value = "";
    hpInput.value = "";

    // update position for next append
    appendRowPos++;
}
function resetChar(myRow) {
    myRow.hpField.value = myRow.hp3.textContent;
    myRow.zoneField.value = 1;
    myRow.zone.textContent = "";
    myRow.zone.appendChild(myRow.zoneField);
    myRow.distField.value = 25;
    myRow.dist.textContent = "";
    myRow.dist.appendChild(myRow.distField);
}

addBtn.addEventListener('click', addChar);