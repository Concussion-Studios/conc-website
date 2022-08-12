var imgSlideEl = document.getElementsByClassName("imgSlide");

// Image slider setup
for (var i = 0; i < imgSlideEl.length; i++) {
    var imgSlideChildren = imgSlideEl[i].children;

    var dots = getSiSC(imgSlideChildren, true)[0];

    /* TODO: Implement dots better. They are currently only indicators of which image it is on. */

    createDots(imgSlideChildren, imgSlideEl[0]); // why in the name of god does this for loop return 3 when the imgSlideEl.lenght is 1
    displayImg(imgSlideChildren, 0); // Display the first image
    autoCycleImgs(imgSlideChildren, 5000);
}

function getSiSC(children, opposite = false) { // This function helps us to get only the img elements under .imgSlide in order for us to implement the dots inside of the class itself
    var newC = [];
    for (var i = 0; i < children.length; i++) {
        if (children[i].tagName != "IMG" && !opposite)
            continue;
        if (children[i].tagName == "IMG" && opposite)
            continue;
        newC.push(children[i]);
    }
    return newC;
}

function getActiveImg(children) {
    for (i = 0; i < children.length; i++) {
        if (children[i].style.display == "revert") { // this image is being displayed
            index = i;

            return i;
        }
    }
}

function displayImg(cchildren, index) {
    children = getSiSC(cchildren);
    for (i = 0; i < children.length; i++) {
        children[i].style.display = "none";
    }
    children[index].style.display = "revert";
}

function getDotIndex(parentDiv, dot) {
    console.log(parentDiv);
    console.log(dot);
}

function createDots(children, parentDiv) {
    // Creates the 'dots' div
    var dotsDiv = document.createElement("div");
    dotsDiv.classList = "dots";

    for (var i = 0; i < children.length; i++) { // Dynamically creates dots based on how many images there are
        window["dot_" + i] = document.createElement("span");
        window["dot_" + i].classList = "dot";
        // window["dot_" + i].addEventListener("click", ()=> { displayImg(children, getDotIndex(dotsDiv, this)); });

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

    index = getActiveImg(children);

    // Clamping
    if (amount < 0) {
        amount = 3 + amount;
    }
    index = (index + amount) % children.length;
    console.log("Image Slider Index(After Clamping): " + index);

    setActiveDot(children, index);

    displayImg(children, index);  
}

function autoCycleImgs(cchildren, time) {
    children = getSiSC(cchildren);
    cycleImg(children, 1);

    setTimeout(()=> { autoCycleImgs(children, time) }, time);
}