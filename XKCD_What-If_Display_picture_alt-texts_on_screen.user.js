// ==UserScript==
// @name        XKCD What-If: Display picture alt-texts on screen
// @namespace   Udi
// @description Displays alt-text of the pictures near the pictures, in XKCD's What-If section.
// @include     http://what-if.xkcd.com/*
// @include     https://what-if.xkcd.com/*
// @version     1
// @grant       none
// ==/UserScript==

var pics = document.getElementsByClassName("illustration");
for (var i=0; i<pics.length; i++) { 
     var text = document.createElement("div");
     text.style.backgroundColor = "lightblue";
     text.style.color="black";
     text.style.textAlign="center";
     text.innerHTML = pics[i].title;
     pics[i].parentNode.insertBefore(text, pics[i].nextElementSibling);
}

