const navSectionTitlesDMG = [
]
const navSectionTitlesPHB = [
    "General", 
    "Classes",
    "Equipment",
    "Feats",
    "Backgrounds"
]

const classes = [
    {textContent: "Airbender", id: "airbender", class: "new"},
    {textContent: "Barbarian", id: "barbarian", class: ""},
    {textContent: "Earthbender", id: "earthbender", class: "new"},
    {textContent: "Fighter", id: "fighter", class: ""},
    {textContent: "Firebender", id: "firebender", class: "new"},
    {textContent: "Monk", id: "monk", class: "change"},
    {textContent: "Rogue", id: "rogue", class: ""},
    {textContent: "Waterbender", id: "waterbender", class: "new"},
]

// add section titles
const navMenu = document.querySelector(".pagenav ul");
let currSection = document.querySelector("h1");
let currSectionNav, navSectionTitles;
if(window.location.pathname.includes("phb")) {
    navSectionTitles = navSectionTitlesPHB;
} else if(window.location.pathname.includes("dmg")) {
    navSectionTitles = navSectionTitlesDMG;
}
for(let i = 0; i < navSectionTitles.length; i++) {
    let sectionLink = document.createElement("a");
    sectionLink.textContent = navSectionTitles[i] + "\n"
    sectionLink.href = "/rules/phb/" + navSectionTitles[i].toLowerCase();
    let sectionItem = document.createElement("li");
    if(navSectionTitles[i].toLowerCase() === currSection.id) {
        currSectionNav = sectionItem;
    }

    sectionItem.appendChild(sectionLink);
    navMenu.appendChild(sectionItem);
}

let navSubsectionTitles;
if(currSection.id == "classes") {
    navSubsectionTitles = classes;
} else if(currSection.id == "feats") {
    // don't show all feats in nav
    // TODO: jump to letter
} else if(currSection.id == "backgrounds") {
    navSubsectionTitles = document.querySelectorAll("main h2");
} else {
    navSubsectionTitles = document.querySelectorAll("h3");
}
let subsectionSublist = document.createElement("ul");
subsectionSublist.id = "subnav";
for(let i = 0; i < navSubsectionTitles.length; i++) {
    let navLink = document.createElement("a");
    navLink.textContent = navSubsectionTitles[i].textContent;
    navLink.href = `/rules/phb/${currSection.id}${currSection.id == "classes" ? "/" : "#"}${navSubsectionTitles[i].id}`;

    let navItem = document.createElement("li");
    navItem.appendChild(navLink);
    if(currSection.id == "classes" && navSubsectionTitles[i].class !== "") {
        navItem.classList.add(navSubsectionTitles[i].class);
    }
    subsectionSublist.appendChild(navItem);
    if(typeof currSectionNav !== 'undefined')
        currSectionNav.append(subsectionSublist);
}