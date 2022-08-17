var imgSlideEl = document.getElementsByClassName("imgSlide");
var videoEls = document.getElementsByTagName("video");
var contentFrameEl = document.getElementById("contentFrame");

var imgSlideAllowedToCycle = true;

// Image slider setup
for (var i = 0; i < imgSlideEl.length; i++) {
    var imgSlideChildren = imgSlideEl[i].children;

    var dots = getSiSC(imgSlideChildren, true)[0];

    /* TODO: Implement dots better. They are currently only indicators of which image it is on. */

    createDots(imgSlideChildren, imgSlideEl[0]); // why in the name of god does this for loop return 3 when the imgSlideEl.lenght is 1
    displayEl(imgSlideChildren, 0); // Display the first image

    setTimeout(()=> { autoCycleImgs(imgSlideChildren, 5000) }, 5000);
}

function getSiSC(children, opposite = false) { // This function helps us to get only the img elements under .imgSlide in order for us to implement the dots inside of the class itself
    var newC = [];
    for (var i = 0; i < children.length; i++) {
        if (children[i].tagName != "IMG" && children[i].tagName != "VIDEO" && !opposite)
            continue;
        if (children[i].tagName == "IMG" && children[i].tagName == "VIDEO" && opposite)
            continue;
        newC.push(children[i]);
    }
    return newC;
}

function getActiveEl(children) {
    for (i = 0; i < children.length; i++) {
        if (children[i].style.display == "revert") { // this image is being displayed
            index = i;

            return i;
        }
    }
}

function displayEl(cchildren, index) {
    children = getSiSC(cchildren);
    for (i = 0; i < children.length; i++) {
        children[i].style.display = "none";
    }
    children[index].style.display = "revert";
}

function onDotClick(event, parentDiv, imgDiv) {
    var dot = event.target || event.srcElement;
    var dotIndex = 0;
    var parentDivChildren = parentDiv.children;
    var imgDivChildren = imgDiv.children;
    
    for (var i = 0; i < parentDivChildren.length; i++) {
        if (parentDivChildren[i] == dot) {
            break;
        } else {
            dotIndex++;
        }
    }

    displayEl(imgDivChildren, dotIndex);
    setActiveDot(parentDivChildren, dotIndex);

    imgSlideAllowedToCycle = false;
    setTimeout(()=> { continueCycling(imgDivChildren[getActiveEl(imgDivChildren)], imgDivChildren) }, 30000);
}

function createDots(children, parentDiv) {
    // Creates the 'dots' div
    var dotsDiv = document.createElement("div");
    dotsDiv.classList = "dots";

    for (var i = 0; i < children.length; i++) { // Dynamically creates dots based on how many images there are
        window["dot_" + i] = document.createElement("span");

        if (i == 0) {
            window["dot_" + i].classList = "dot active";
        } else {
            window["dot_" + i].classList = "dot";
        }

        window["dot_" + i].addEventListener("click", ()=>{ onDotClick(event, dotsDiv, parentDiv); });

        dotsDiv.appendChild(window["dot_" + i]);
    }

    parentDiv.appendChild(dotsDiv);
}

function setActiveDot(children, index) {
    for (var i = 0; i < children.length; i++) {
        window["dot_" + i].classList = "dot";
    }

    window["dot_" + index].classList = "dot active";
}

function cycleImg(cchildren, amount) {
    var index;

    children = getSiSC(cchildren);

    index = getActiveEl(children);

    // Clamping
    if (amount < 0) {
        amount += 3;
    }
    index = (index + amount) % children.length;
    console.log("Image Slider Index(After Clamping): " + index);

    setActiveDot(children, index);

    displayEl(children, index);  
}

function autoCycleImgs(cchildren, time) {
    if (!imgSlideAllowedToCycle) {
        return;
    }

    children = getSiSC(cchildren);
    cycleImg(children, 1);

    setTimeout(()=> { autoCycleImgs(children, time) }, time);
}

function continueCycling(currentElement, children) {
    if (currentElement.tagName == "VIDEO" && currentElement.paused || currentElement.tagName != "VIDEO") {
        imgSlideAllowedToCycle = true;
        autoCycleImgs(children, 5000);
    }

    setTimeout(()=> { continueCycling(currentElement, children) }, 30000);
}

function displayFrame(page) {
    contentFrameEl.setAttribute("src", ("frames/" + page + ".htm"));
    // Sidebar Activation
    var tabData = verboseDict["frames/" + page + ".htm"];
    document.getElementById("sidebartitle").innerHTML = tabData[0];
    for (var i = 1; i < tabData.length; i++) { // We start with index 1 because we already did the title thing.
        if (tabData[i] == "nH") {
            hyperlinks[i - 1].style.display = "none";
            continue;
        }
        hyperlinks[i - 1].href = tabData[i];
        hyperlinks[i - 1].style.display = "";
    }
}


// Sidebar Functions

var verboseDict = {
    "frames/conc.htm": ["Concussion Studios", "nH", "https://www.moddb.com/company/concussion-studios", "nH", "https://twitter.com/concstudios"],
    "frames/dmcr.htm": ["Deathmatch Classic: Refragged", "https://steamcommunity.com/groups/DMCRefragged", "https://www.moddb.com/mods/deathmatch-classic-refragged", "https://discord.gg/n2xpW9x", "nH"],
    "frames/lf.htm": ["Lambda Fortress", "https://steamcommunity.com/groups/lambdafortress", "nH", "https://discord.gg/2z4eTG9", "nH"],
    "frames/cf.htm": ["Classic Fortress 2", "nH", "nH", "https://discord.gg/UsuD4gH", "nH"],
    "frames/tep.htm": ["The Espionage Project", "nH", "nH", "https://discord.gg/qbGpMyY27W", "nH"]
};

var hyperlinks = document.getElementById("sidebarlinks").children;