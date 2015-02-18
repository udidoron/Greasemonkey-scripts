// ==UserScript==
// @name        XKCD What-If: Display picture alt-texts on screen
// @namespace   Udi
// @description Displays alt-text of the pictures near the pictures, in XKCD's What-If section.
// @include     http://what-if.xkcd.com/*
// @include     https://what-if.xkcd.com/*
// @version     1
// @grant       none
// ==/UserScript==

function addAltTexts() {
     var pics = document.getElementsByClassName("illustration");
     for (var i=0; i<pics.length; i++) { 
          var text = document.createElement("div");
          text.style.backgroundColor = "lightblue";
          text.style.color="black";
          text.style.textAlign="center";
          text.innerHTML = pics[i].title;
          pics[i].parentNode.insertBefore(text, pics[i].nextElementSibling);
     }

}

function addKeyboardNavigation() {
     var currentPage = document.location.pathname.replace("/", "").replace("/", ""); //a bit ugly, but works
     var lastPage = (document.getElementsByClassName("nav-next").length === 0);
     var firstPage = (currentPage == "1");
     if (!firstPage && !lastPage) {
          currentPage = parseInt(currentPage);
     }
     
     document.addEventListener("keypress", function(event) {
          //'left' key code = 37, 'right' key code = 39
          if (event.keyCode === 37 && !firstPage) {
               //finding last site
               var prevBtn = document.getElementsByClassName("nav-prev")[0];
               var prevUrl = prevBtn.children[0].href;
               var indexReg = /\d+/i;
               var gotoUrl = "http://what-if.xkcd.com/"+parseInt(indexReg.exec(prevUrl));
               document.location=gotoUrl;
          }
          else if (event.keyCode === 39 && !lastPage) {
               if (currentPage == "1") {
                   document.location="http://what-if.xkcd.com/2"; //to fix stupid bug at 1:02 AM, which only appears for first page, dunno why  
               }
               else {
                   document.location="http://what-if.xkcd.com/"+String(currentPage+1);    
               }
               
          }
     });
}

addAltTexts();
addKeyboardNavigation();

