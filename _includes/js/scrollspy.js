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
    sectionLink.textContent = navSectionTitles[i]
    sectionLink.href = "/rules/phb/" + navSectionTitles[i].toLowerCase();
    let mobileSectionLink = sectionLink.cloneNode(true);

    sectionLink.className = "nav-link";
    mobileSectionLink.className = "page-link";

    if(navSectionTitles[i].toLowerCase() === currSection.id) {
        sectionLink.classList.add("active");
        mobileSectionLink.classList.add("active");
        currSectionNav = sectionLink;
        currSectionNav_mobile = mobileSectionLink;
    }
    navSections.appendChild(sectionLink);
    navSectionsMobile.appendChild(mobileSectionLink);
    console.log(navSectionsMobile);
}

// subsections
let navSubsectionTitles;
if(currSection.id == "classes") {
    // navSubsectionTitles = classes;
    navSubsectionTitles = [];
    removeMobileSubsectionNav();
} else if(currSection.id == "feats" || currSection.id == "bestiary") {
    navSubsectionTitles = document.querySelectorAll(".subsection a");
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
for(let i = 0; i < navSubsectionTitles.length; i++) {
    let navLink = document.createElement("a");
    navLink.textContent = navSubsectionTitles[i].textContent;
    navLink.href = `${currSection.id == "classes" ? "/rules/phb/${currSection.id}/" : "#"}${navSubsectionTitles[i].id}`;

    let navLinkMobile = navLink.cloneNode(true);
    navLink.className = "nav-link ms-3 my-1";
    navLinkMobile.className = "nav-link";

    // add "new" or "change" pill to classes in menu
    if(currSection.id == "classes" && navSubsectionTitles[i].class !== "") {
        navLink.classList.add(navSubsectionTitles[i].class);
    }
    subsectionSublist.appendChild(navLink);
    subsectionsMobile.appendChild(navLinkMobile);
}
subsectionNavbar.appendChild(subsectionSublist);
if(currSection.id == "classes")
    subsectionNavbar.style.cssText = "padding:0;"
if(currSection.id == "feats" || currSection.id == "bestiary") {
    const navRight = document.querySelector(".widescreen #navbar-right");
    navRight.appendChild(subsectionNavbar);
    console.log(subsectionNavbar);
    console.log(navRight);
} else if (currSectionNav != null) {
    currSectionNav.after(subsectionNavbar);
}

let navSubsectionsMobile = document.querySelector(".mobile #navbar-subsections-mobile");
// let subsectionsClone = subsectionSublist.cloneNode(true);
// subsectionsClone.className = "nav nav-pills";
navSubsectionsMobile.appendChild(subsectionsMobile);

var scrollSpy = new bootstrap.ScrollSpy(document.body, {
    target: '#navbar-subsections'
  });
var scrollSpy = new bootstrap.ScrollSpy(document.body, {
    target: '#navbar-right'
  });
var scrollSpy = new bootstrap.ScrollSpy(document.body, {
    target: '#navbar-subsections-mobile',
    offset: 15
  });