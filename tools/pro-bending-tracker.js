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
            // resolve damage distance first
            // console.log(`damage = ${dmg}`);
            let newDist = Number(myRow.dist.textContent) - dmg;
            let oldZone = Number(myRow.zone.textContent)
            let newZone = oldZone;
            while(newDist <= 0) {
                newZone = newZone+1;
                newDist = Math.min(newDist + 30, 29); // can't be at exactly 30 because then you'd be on the line
            }

            // now HP checkpoints
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
            newZone = newZone + numHPBoundaryCrossings;

            // console.log(`old HP zone: ${oldCheckpt}\tnew HP zone: ${newCheckpt}`);

            // announce result
            if(newZone > 3 || newCheckpt == 0) { // knockout
                console.log("KNOCKOUT!!!");
                resultText.textContent = "KNOCKOUT!!!";
                // myRow.currHP = 0;
                // myRow.hpField.value = 0;
                myRow.dist.textContent = "--";
                myRow.zone.textContent = "KO";
            } else if(newZone > oldZone) {
                console.log(`BWEHHH! ${myRow.name.textContent} is knocked back ${newZone-oldZone} zone(s).`);
                resultText.textContent = `BWEHHH! ${myRow.name.textContent} is knocked back ${newZone-oldZone} zone(s).`;
                myRow.zone.textContent = newZone;
                myRow.dist.textContent = newDist; // for pure damage knockback
                if(numHPBoundaryCrossings > 0)
                    myRow.dist.textContent = 29; // HP boundary crossing happens after damage knockback
            // } else if(newZone > oldZone) { // if cross a zone by pure damage
            //     console.log(`BWEHHH! You are knocked back ${newZone - oldZone} zone(s).`);
            //     myRow.zone.textContent = newZone;
            //     myRow.dist.textContent = newDist;
            } else { // only move within zone
                console.log(`${myRow.name.textContent} is knocked back ${Math.abs(dmg)} feet.`);
                resultText.textContent = `${myRow.name.textContent} is knocked back ${Math.abs(dmg)} feet.`;
                myRow.dist.textContent = newDist;
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

    let newAC = document.createElement("input");
    newAC.type = "number";
    newAC.value = acInput.value;
    ACcell.appendChild(newAC);

    var hp = hpInput.value;
    let newHP = document.createElement("input");
    newHP.type = "number";
    newHP.value = hp;
    HPcell.appendChild(newHP);

    // HP checkpoints
    hpFull.textContent = hp;
    hp2.textContent = Math.floor(hp/3*2);
    hp1.textContent = Math.floor(hp/3);

    // position
    zone.textContent = "1";
    dist.textContent = "25";

    /*** add row elements to array ***/
    myId = appendRowPos-2;
    rows.push({
        id: myId,
        name: nameCell, 
        ac: newAC,
        currHP: hp, hpField: newHP,
        hp3: hpFull, hp2: hp2, hp1: hp1,
        zone: zone, dist: dist
    });
    // event listeners
    // newHP.addEventListener('input', function(){ updateHP(newHP, rows[myId].currHP, myId); });
    newHP.addEventListener('keyup', function(e){ updateHP(e, newHP, rows[myId]); });

    // TODO try adding two rows and then changing HP of the older row

    /*** clear input fields ***/
    nameInput.value = "";
    acInput.value = "";
    hpInput.value = "";

    // update position for next append
    appendRowPos++;
}

addBtn.addEventListener('click', addChar);