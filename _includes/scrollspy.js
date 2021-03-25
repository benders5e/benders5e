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
const navSections = document.querySelector(".widescreen #nav-sections");
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
        sectionLink.classList.add("active");
        currSectionNav = sectionLink;
    }
    navSections.appendChild(sectionLink);
}
let navSectionsMobile = document.querySelector(".mobile .navbar");
let sectionsClone = navSections.cloneNode(true);
sectionsClone.className = "nav nav-pills";
navSectionsMobile.appendChild(sectionsClone);

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

// add current subsection titles
let subsectionNavbar = document.createElement("nav");
subsectionNavbar.id = "navbar-subsections";
subsectionNavbar.className = "pagenav section navbar navbar-light";
let subsectionSublist = document.createElement("nav");
subsectionSublist.id = "nav-subsections";
subsectionSublist.className = "nav nav-pills flex-column";
for(let i = 0; i < navSubsectionTitles.length; i++) {
    let navLink = document.createElement("a");
    navLink.textContent = navSubsectionTitles[i].textContent;
    navLink.href = `${currSection.id == "classes" ? "/phb/${currSection.id}/" : "#"}${navSubsectionTitles[i].id}`;
    navLink.className = "nav-link ms-3 my-1";
    // add "new" or "change" pill to classes in menu
    if(currSection.id == "classes" && navSubsectionTitles[i].class !== "") {
        navLink.classList.add(navSubsectionTitles[i].class);
    }
    subsectionSublist.appendChild(navLink);
}
subsectionNavbar.appendChild(subsectionSublist);
if(currSection.id == "classes")
    subsectionNavbar.style.cssText = "padding:0;"
if(currSection.id == "feats") {
    const navRight = document.querySelector(".widescreen #navbar-right");
    navRight.appendChild(subsectionNavbar);
    console.log(subsectionNavbar);
    console.log(navRight);
} else {
    currSectionNav.after(subsectionNavbar);
}

let navSubsectionsMobile = document.querySelector(".mobile #navbar-subsections-mobile");
let subsectionsClone = subsectionSublist.cloneNode(true);
subsectionsClone.className = "nav nav-pills";
navSubsectionsMobile.appendChild(subsectionsClone);

var scrollSpy = new bootstrap.ScrollSpy(document.body, {
    target: '#navbar-subsections'
  });
var scrollSpy = new bootstrap.ScrollSpy(document.body, {
    target: '#navbar-right'
  });
var scrollSpy = new bootstrap.ScrollSpy(document.body, {
    target: '#navbar-subsections-mobile'
  });