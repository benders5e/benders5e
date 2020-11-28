// select elements
const lunarEclipse = document.querySelector("#lunarEclipse");
const solarEclipse = document.querySelector("#solarEclipse");
const comet = document.querySelector("#comet");
const winterSolstice = document.querySelector("#winterSolstice");
const summerSolstice = document.querySelector("#summerSolstice");
const harmonicConvergence = document.querySelector("#harmonicConvergence");
const minusBtn = document.querySelector("#minus");
const plusBtn = document.querySelector("#plus");

// set elements to starting values
lunarEclipse.setAttribute("hidden", "true");
solarEclipse.setAttribute("hidden", "true");
comet.setAttribute("hidden", "true");
winterSolstice.setAttribute("hidden", "true");
summerSolstice.setAttribute("hidden", "true");
harmonicConvergence.setAttribute("hidden", "true");

// get values
let monthText = document.querySelector("#monthText");
let dayText = document.querySelector("#dayText");
let moonPhaseText = document.querySelector("#moonPhaseText");

// defaults
let lunarDay = 0;
let monthValue = 0;
let dayValue = 0;
months = ["\u966C", "\u674F", "\u6843", "\u6885", "\u69B4", "\u8377",
"\u862D", "\u6842", "\u83CA", "\u9732", "\u846D", "\u51B0"];
days0 = ["\u521D", "\u5341", "\u5EFF", "\u4E09"]
days1 = ["\u5341", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D", "\u4E03", "\u516B", "\u4E5D"]
let eclipseSeason = true;
let eclipseCount = 0;
let moonPhase = "new";
updateCelestialBodies();

// incrementing/decrementing day
function prevDay() {
    // -1 ~= +29 (mod 30)
    dayValue = (dayValue+29)%30;
    if(dayValue == 29) {
        // -1 ~= +11 (mod 12)
        monthValue = (monthValue+11)%12;
        monthText.textContent = monthValue+1;
    }
    dayText.textContent = dayValue+1;
    // -1 ~= +29
    lunarDay = (lunarDay+29)%30;
    eclipseCount--;
    updateCelestialBodies();
}
minusBtn.addEventListener('click', prevDay);

function nextDay() {
    dayValue = (dayValue+1)%30;
    if(dayValue == 0) {
        monthValue = (monthValue+1)%12;
        monthText.textContent = monthValue+1;
    }
    dayText.textContent = dayValue+1;
    lunarDay = (lunarDay+1)%30;
    eclipseCount++;
    updateCelestialBodies();
}
plusBtn.addEventListener('click', nextDay);

function updateCelestialBodies() {
    /*** Month & Day ***/
    monthText.textContent = `${months[monthValue]}\u6708 (${monthValue+1})`;
    dayText.textContent = `${days0[Math.floor(dayValue/10)]}${days1[(dayValue+1)%10]} (${dayValue+1})`;
    if (dayValue+1 == 20) {
        dayText.textContent = `${days1[2]}${days1[0]} (${dayValue+1})`;
    }
    if (dayValue+1 == 30) {
        dayText.textContent = `${days1[3]}${days1[0]} (${dayValue+1})`;
    }

    /*** Moon phase ***/
    moonPhaseText.textContent = getMoonPhase(lunarDay);

    /*** Eclipses ***/
    // eclipse season is 35 days long
    if(eclipseSeason == true && eclipseCount >= 34) {
        eclipseCount = 0;
        eclipseSeason = false;
    }
    // eclipse seasons are separated by 6 months = 6 x 30 days
    if(eclipseSeason == false && eclipseCount >= 179) {
        eclipseCount = 0;
        eclipseSeason = false;
    }
    if(eclipseSeason){
        if (moonPhase == 'new') {
            solarEclipse.hidden = false;
        } else if (moonPhase == 'full') {
            lunarEclipse.hidden = false;
        } else {
            solarEclipse.hidden = true;
            lunarEclipse.hidden = true;
        }
    } else {
            solarEclipse.hidden = true;
            lunarEclipse.hidden = true;
    }

    /*** Solstices ***/
    if (monthText.textContent == "6" && dayText.textContent == "16")
        summerSolstice.hidden = false;
    else if (monthText.textContent == "12" && dayText.textContent == "16")
        winterSolstice.hidden = false;
    else {
        summerSolstice.hidden = true;
        winterSolstice.hidden = true;
    }
}

function getMoonPhase(day) {
    switch(day) {
        case 0:
            moonPhase = "new";
            return '\u25CF (new)';
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
            moonPhase = "waxing crescent";
            return '\u263D (waxing crescent)';
        case 8:
            moonPhase = "first quarter";
            return '\u25D0 (first quarter)';
        case 9:
        case 10:
        case 11:
        case 12:
        case 13:
        case 14:
            moonPhase = "waxing gibbous";
            return ' (waxing gibbous)';
        case 15:
            moonPhase = "full";
            return '\u25CB (full)';
        case 16:
        case 17:
        case 18:
        case 19:
        case 20:
        case 21:
            moonPhase = "waning gibbous";
            return ' (waning gibbous)';
        case 22:
            moonPhase = "last quarter";
            return '\u25D1 (last quarter)';
        case 23:
        case 24:
        case 25:
        case 26:
        case 27:
        case 28:
        case 29:
            moonPhase = "waning crescent";
            return '\u263E (waning crescent)';
    }
}