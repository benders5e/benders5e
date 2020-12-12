
const navSectionTitles = [
    "Introduction", 
    "Classes",
    "Equipment",
    "Feats",
    "Backgrounds",
    "Appendix"
]

const classes = [
    {textContent: "Airbender", id: "airbender"},
    {textContent: "Barbarian", id: "barbarian"},
    {textContent: "Earthbender", id: "earthbender"},
    {textContent: "Fighter", id: "fighter"},
    {textContent: "Firebender", id: "firebender"},
    {textContent: "Modified Monk", id: "monk"},
    {textContent: "Rogue", id: "rogue"},
    {textContent: "Waterbender", id: "waterbender"},
]

// add section titles
const navMenu = document.querySelector(".pagenav ul");
let currSection = document.querySelector("h1");
let currSectionNav;
for(let i = 0; i < navSectionTitles.length; i++) {
    let sectionLink = document.createElement("a");
    sectionLink.textContent = navSectionTitles[i] + "\n"
    sectionLink.href = "/phb/" + navSectionTitles[i].toLowerCase();
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
    navLink.textContent = navSubsectionTitles[i].textContent + "\n";
    navLink.href = `/phb/${currSection.id}/${currSection.id == "classes" ? "" : "#"}${navSubsectionTitles[i].id}`;

    let navItem = document.createElement("li");
    navItem.appendChild(navLink);
    subsectionSublist.appendChild(navItem);
    currSectionNav.append(subsectionSublist);
}