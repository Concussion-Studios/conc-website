/* 
    Code written by: ryker
*/

var slideshowEls = document.body.getElementsByClassName("slideshow");
var childrenEls = slideshowEls[0].children;
var slideshowIndex = 0;

function slideshowThink() {
    setTimeout( ()=> {slideshowIncr();}, 2000);
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