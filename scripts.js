/* 
    Code written by: ryker
*/

/* ---- Slideshow code ---- */

var slideshowEls = document.body.getElementsByClassName("slideshow");
var childrenEls = slideshowEls[0].children;
var slideshowIndex = 0;

function slideshowThink() {
    setTimeout( ()=> {slideshowIncr();}, 2500);
}

function slideshowIncr() {
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

slideshowThink();

/* ---- Animated icon code ---- */

var iconEl = document.getElementById("icon");

iconEl.addEventListener("mouseover", iconHover);

function iconHover() {
    iconEl.src = "img/logos/conchighspin.gif";
}

iconEl.addEventListener("mouseout", iconOut);

function iconOut() {
    iconEl.src = "img/logos/Logo.png";
}