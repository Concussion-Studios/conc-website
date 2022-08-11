var imgSlideEl = document.getElementsByClassName("imgSlide");

for (var i = 0; i < imgSlideEl.length; i++) {
    var imgSlideChildren = imgSlideEl[i].children;
    imgSlideEl[i].addEventListener("click", ()=> { cycleImg(imgSlideChildren, 1); } );
    imgSlideEl[i].addEventListener("contextmenu", ()=> { cycleImg(imgSlideChildren, -1); } );

    var dots = getSiSC(imgSlideChildren, true)[0];

    /* TODO: Implement dots better. They are currently only indicators of which image it is on. */

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

function displayImg(cchildren, index) {
    children = getSiSC(cchildren);
    for (i = 0; i < children.length; i++) {
        children[i].style.display = "none";
    }
    children[index].style.display = "revert";
}

function createDots() {
    /* TODO: Add dot creation code here*/
}

function cycleImg(cchildren, amount) {
    var index;

    children = getSiSC(cchildren);


    for (i = 0; i < children.length; i++) {
        if (children[i].style.display == "revert") { // this image is being displayed
            index = i;

            break;
        }
    }

    // Clamping
    if (amount < 0) {
        amount = 3 + amount;
    }
    index = (index + amount) % children.length;
    console.log("Image Slider Index(After Clamping): " + index);

    displayImg(children, index);  
}

function autoCycleImgs(cchildren, time) {
    children = getSiSC(cchildren);
    cycleImg(children, 1);

    setTimeout(()=> { autoCycleImgs(children, time) }, time);
}