const navSectionTitlesDMG = [
]
const navSectionTitlesPHB = [
    "General", 
    "Classes",
    "Equipment",
    "Feats",
    "Backgrounds",
    "Appendix"
]

// var scrollSpy = new bootstrap.ScrollSpy(document.body, {
//     target: '#navbar'
//   });

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

// add section titles (left side)
const navSections = document.querySelector("#nav-sections");
let currSection = document.querySelector("h1");
let currSectionNav, navSectionTitles;
if(window.location.pathname.includes("phb")) {
    navSectionTitles = navSectionTitlesPHB;
} else if(window.location.pathname.includes("dmg")) {
    navSectionTitles = navSectionTitlesDMG;
}
for(let i = 0; i < navSectionTitles.length; i++) {
    let sectionLink = document.createElement("a");
    sectionLink.textContent = navSectionTitles[i]
    sectionLink.href = "/phb/" + navSectionTitles[i].toLowerCase();
    sectionLink.className = "nav-link";
    if(navSectionTitles[i].toLowerCase() === currSection.id) {
        sectionLink.classList.add("disabled");
        currSectionNav = sectionLink;
    }
    // sectionItem.appendChild(sectionLink);
    navSections.appendChild(sectionLink);
}

// add subsection titles (right side)
const navSubsections = document.querySelector("#nav-subsections");
let navSubsectionTitles;
if(currSection.id == "classes") {
    // navSubsectionTitles = classes;
    navSubsectionTitles = [];
} else if(currSection.id == "feats") {
    navSubsectionTitles = document.querySelectorAll(".subsection a");
} else if(currSection.id == "backgrounds" || currSection.id == "equipment") {
    navSubsectionTitles = document.querySelectorAll("main h2");
    // TODO include sub-lists of h3's in the right navbar
} else {
    navSubsectionTitles = document.querySelectorAll("h3");
}
// let subsectionSublist = document.createElement("ul");
// let subsectionSublist = document.createElement("nav");
/* <nav class="nav nav-pills flex-column"></nav> */
// subsectionSublist.id = "subnav";
// subsectionSublist.className = "nav nav-pills flex-column";
for(let i = 0; i < navSubsectionTitles.length; i++) {
    let navLink = document.createElement("a");
    // <a class="nav-link ms-3 my-1" href="#planes-of-existence">Planes of Existence</a>
    navLink.textContent = navSubsectionTitles[i].textContent;
    // navLink.href = `/phb/${currSection.id}${currSection.id == "classes" ? "/" : "#"}${navSubsectionTitles[i].id}`;
    navLink.href = `${currSection.id == "classes" ? "/phb/${currSection.id}/" : "#"}${navSubsectionTitles[i].id}`;
    navLink.className = "nav-link ms-3 my-1";
    if(currSection.id == "classes" && navSubsectionTitles[i].class !== "") {
        navLink.classList.add(navSubsectionTitles[i].class);
    }
    navSubsections.appendChild(navLink);
}
var scrollSpy = new bootstrap.ScrollSpy(document.body, {
    target: '#navbar-right'
  });