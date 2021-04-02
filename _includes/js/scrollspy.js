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
    {textContent: "Earthbender", id: "earthbender", class: "new"},
    {textContent: "Firebender", id: "firebender", class: "new"},
    {textContent: "Waterbender", id: "waterbender", class: "new"},
    {textContent: "Barbarian", id: "barbarian", class: ""},
    {textContent: "Fighter", id: "fighter", class: ""},
    {textContent: "Monk", id: "monk", class: "change"},
    {textContent: "Rogue", id: "rogue", class: ""},
]

function removeMobileSectionNav() {
    document.querySelector(".background.mobile").style.visibility = "hidden";
    document.querySelector(".nav-area.section.mobile").style.visibility = "hidden";
    document.querySelector(".nav-area.section.mobile").style.height = "0";
}
function removeMobileSubsectionNav() {
    document.querySelector(".background.mobile.bottom").style.visibility = "hidden";
    document.querySelector(".nav-area.subsection.mobile").style.visibility = "hidden";
    document.querySelector(".nav-area.subsection.mobile").style.height = "0";
}

// add section titles (left side)
const navSections = document.querySelector(".widescreen #nav-sections");
const navSectionsMobile = document.querySelector(".mobile-nav .triggerSection"); 
let currSection = document.querySelector("h1");
let currSectionNav, currSectionNav_mobile, navSectionTitles;
if(window.location.pathname.includes("phb")) {
    navSectionTitles = navSectionTitlesPHB;

    //// add phb title to section menu
    // desktop
    let phbTitle = document.createElement("a");
    phbTitle.innerHTML = '<a class="navbar-brand" href="#">Player\'s Handbook</a>';
    navSections.before(phbTitle);
    // mobile
    let phbTitleMobile = document.createElement("span");
    phbTitleMobile.innerHTML = '<span class="navbar-brand" href="#">Player\'s Handbook</span>';
    document.querySelector(".mobile-nav label").appendChild(phbTitleMobile);
} 
else if(window.location.pathname.includes("gmg")) {
    navSectionTitles = navSectionTitlesDMG;
    removeMobileSectionNav();
    removeMobileSubsectionNav();
} else {
    navSectionTitles = [];
    removeMobileSectionNav();
}
for(let i = 0; i < navSectionTitles.length; i++) {
    let sectionLink = document.createElement("a");
    sectionLink.textContent = navSectionTitles[i];
    sectionLink.href = "/rules/phb/" + navSectionTitles[i].toLowerCase();
    let mobileSectionLink = sectionLink.cloneNode(true);

    sectionLink.className = "nav-link";
    mobileSectionLink.className = "page-link";

    // used for mobile only
    // add class subsections in section menu instead of subsection
    if(navSectionTitles[i] == 'Classes') {
        navSectionsMobile.appendChild(mobileSectionLink); // Classes

        let classesDiv = document.createElement("div");
        classesDiv.className = "classes-div";
        for(j = 0; j < classes.length; j++) {
            let classLink = document.createElement("a");
            classLink.textContent = classes[j].textContent;
            classLink.href = "/rules/phb/classes/" + classes[j].id;
            classLink.className = "page-link class-link";
            // grey out current subclass
            if(window.location.pathname.includes(classes[j].id)) {
                classLink.className += " active";
                // classLink.className = "page-link class-link active";
            }
            classesDiv.appendChild(classLink);
        }
        navSectionsMobile.appendChild(classesDiv);
    }
    if(navSectionTitles[i].toLowerCase() === currSection.id) {
        sectionLink.classList.add("active");
        currSectionNav = sectionLink;
        currSectionNav_mobile = mobileSectionLink;

        // gray out current section name on mobile
        // but only if it's not a subsection of classes
        if(currSection.id !== "classes" || window.location.pathname.endsWith("/classes/"))
            mobileSectionLink.classList.add("active");
    }
    navSections.appendChild(sectionLink);
    if(navSectionTitles[i] != 'Classes')
        navSectionsMobile.appendChild(mobileSectionLink);
}

// subsections
let navSubsectionTitles;
if(currSection.id == "classes") {
    navSubsectionTitles = classes;
} else if(currSection.id == "feats" || currSection.id == "bestiary") {
    navSubsectionTitles = document.querySelectorAll(".anchor a");
} else if(currSection.id == "backgrounds" || currSection.id == "equipment") {
    navSubsectionTitles = document.querySelectorAll("main h2");
    removeMobileSubsectionNav();
    // TODO include sub-lists of h3's in the right navbar
    // TODO add alphabet scrollspy within background sections
} else {
    navSubsectionTitles = document.querySelectorAll("h3");
    removeMobileSubsectionNav();
}

// add current subsection titles
let subsectionNavbar = document.createElement("nav");
subsectionNavbar.id = "navbar-subsections";
subsectionNavbar.className = "pagenav section navbar navbar-light";
let subsectionSublist = document.createElement("nav");
subsectionSublist.id = "nav-subsections";
subsectionSublist.className = "nav nav-pills flex-column";
let subsectionsMobile = subsectionSublist.cloneNode(true);
subsectionsMobile.className = "nav nav-pills";
let currSubsectionLink;
for(let i = 0; i < navSubsectionTitles.length; i++) {
    let navLink = document.createElement("a");
    navLink.textContent = navSubsectionTitles[i].textContent;
    navLink.href = (currSection.id == "classes" ? `/rules/phb/${currSection.id}/` : "#") + navSubsectionTitles[i].id;

    let navLinkMobile = navLink.cloneNode(true);
    navLink.className = "nav-link ms-3 my-1";
    if(currSection.id == "classes")
        navLink.className += " class-link";
    navLinkMobile.className = "nav-link";

    if(window.location.pathname.includes(navSubsectionTitles[i].id)) {
        currSubsectionLink = navLink;
    }

    // add "new" or "change" pill to classes in menu
    if(currSection.id == "classes" && navSubsectionTitles[i].class !== "") {
        navLink.classList.add(navSubsectionTitles[i].class);
        // keep class section active when you visit a class page
        currSectionNav.classList += " active";
    }
    subsectionSublist.appendChild(navLink);
    subsectionsMobile.appendChild(navLinkMobile);
}
subsectionNavbar.appendChild(subsectionSublist);
if(currSection.id == "classes") {
    subsectionNavbar.style.cssText = "padding:0;"
    if(currSubsectionLink != null)
        currSubsectionLink.classList += " active";
}
if(currSection.id == "feats" || currSection.id == "bestiary") {
    const navRight = document.querySelector(".widescreen #navbar-right");
    navRight.appendChild(subsectionNavbar);
} else if (currSectionNav != null && !window.location.pathname.endsWith("/classes/")) {
    currSectionNav.after(subsectionNavbar);
}

let navSubsectionsMobile = document.querySelector(".mobile #navbar-subsections-mobile");
// let subsectionsClone = subsectionSublist.cloneNode(true);
// subsectionsClone.className = "nav nav-pills";
navSubsectionsMobile.appendChild(subsectionsMobile);

// remove subsection mobile nav except where relevant
if(currSection.id != "feats" && currSection.id != "bestiary") {
    removeMobileSubsectionNav();
}

if(currSection.id != "classes") {
    var scrollSpy = new bootstrap.ScrollSpy(document.body, {
        target: '#navbar-subsections'
    });
}
var scrollSpy = new bootstrap.ScrollSpy(document.body, {
    target: '#navbar-right'
  });
var scrollSpy = new bootstrap.ScrollSpy(document.body, {
    target: '#navbar-subsections-mobile',
    offset: 15
  });