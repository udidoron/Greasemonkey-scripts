// ==UserScript==
// @name        XKCD- Show comic descriptions under the comic
// @namespace   Udi
// @description What the title says; because the other script doesn't work for some reason.
// @include     http://xkcd.com/*
// @include     https://xkcd.com/*
// @include     http://www.xkcd.com/*
// @include     https://www.xkcd.com/*
// @version     1
// @grant       none
// ==/UserScript==


//tested on latest Firefox; for Chrome, switch 'textContent' to 'innerText'
//requirements: document.querySelector, event.keyCode in addEventListener, textContent - not much more
(function() {
  
  function addAltTextDisplay() {
    //getting relevant DOM references
    var comicElem = document.getElementById('comic');
    var comicImageElem = document.querySelector("#comic img");
    var divElem = document.createElement("div");

    //styling div element
    divElem.style.backgroundColor="blue";
    divElem.style.color="white";
    divElem.textContent = comicImageElem.getAttribute("title");

    //appending to DOM
    comicElem.appendChild(divElem);    
  }
  
  
  function addArrowNavigation() {
    var numReg = /(http|https):\/\/(www.)?xkcd.com\/\d+/; //regex for XKCD link with number (i.e. not behind last/first)
    //getting the links themselves
    var nextLink = document.querySelector("[accesskey='n']").href,
        prevLink = document.querySelector("[accesskey='p']").href;
    
    //boolean indicators for whether we can go backwards or forwards
    var canGoBack = false, canGoForward = false;
    //setting those indicators 
    if (numReg.test(nextLink)) canGoForward = true;
    if (numReg.test(prevLink)) canGoBack = true;
    
    //attaching the event listener (since there's more than one XKCD comic, we'll need to attach it anyway)
    document.addEventListener("keypress", function(e) {
       if (e.keyCode === 37 && canGoBack) { //37 = left = backwards
          location.href = prevLink;
       }
       if (e.keyCode === 39 && canGoForward) { //39 = right = forward
          location.href = nextLink;
       }
    });
    
  }
  
  addAltTextDisplay();
  addArrowNavigation();

})();