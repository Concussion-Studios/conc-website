/* 
    Code written by: ryker
*/

var slideshowEls = document.getElementsByClassName("slideshow");
var titleEl = document.getElementById("title");

/* ---- Initial code ---- */

function init() {
    titleEl.style.opacity = 1;
    slideshowThink();
}

/* ---- Slideshow code ---- */

if (slideshowEls) {
    var childrenEls = slideshowEls[0].children;
}
var slideshowIndex = 0;

function slideshowThink() {
    childrenEls[0].style.opacity = 1;
    setTimeout( ()=> {slideshowIncr();}, 2500);
}

function slideshowIncr() {
    if (!childrenEls) {
        return;
    }

    for (i = 0; i < childrenEls.length; i++) {
        childrenEls[i].style.opacity = 0;
    }

    childrenEls[slideshowIndex].style.opacity = 1;
    slideshowIndex++;

    if (slideshowIndex >= 3) {
        slideshowIndex = 0;
    }

    slideshowThink();
}

/* ---- Animated icon code ---- */

var iconEl = document.getElementById("icon");

if (iconEl) {
    iconEl.addEventListener("mouseover", iconHover);
}

function iconHover() {
    iconEl.src = "img/logos/conchighspin.gif";
}
if (iconEl) {
    iconEl.addEventListener("mouseout", iconOut);
}

function iconOut() {
    iconEl.src = "img/logos/Logo.png";
}


init();