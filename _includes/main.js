
const navSectionTitles = [
    "Introduction", 
    "Classes",
    "Equipment",
    "Feats",
    "Backgrounds",
    "Appendix"
]

// add section titles
const navMenu = document.querySelector(".pagenav ul");
let currSection = document.querySelector(".center-title");
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

let navSubsectionTitles = document.querySelectorAll("h3");
let subsectionSublist = document.createElement("ul");
subsectionSublist.id = "subnav";
for(let i = 0; i < navSubsectionTitles.length; i++) {
    let navLink = document.createElement("a");
    navLink.textContent = navSubsectionTitles[i].textContent + "\n";
    navLink.href = "#" + navSubsectionTitles[i].id;

    let navItem = document.createElement("li");
    navItem.appendChild(navLink);
    subsectionSublist.appendChild(navItem);
    currSectionNav.append(subsectionSublist);
}