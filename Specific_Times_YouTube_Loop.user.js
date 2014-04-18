// ==UserScript==
// @name        Specific Times YouTube Loop
// @namespace   Udi
// @description Allows you to loop between specified points in a given video.
// @include     *://*.youtube.com/watch?*v=*
// @include     *://*.youtube.com/watch?*videos=*
// @include     *://*.youtube.com/watch#!*videos=*
// @include     *://*.youtube.com/watch#!*v=*
// @include     *://*.youtube.com/watch?*NR=*
// @version     0.6
// @grant       none
// ==/UserScript==


specificLoopScript = function() {

    //Converts time from the format "mm:ss" to seconds only.
    //@param t = given time string.
    //Little input validation, so there's something left for version 2. (Joking)
    timeToSeconds = function(t) {
        var arr = t.split(":");
        var res;
        if (arr.length == 2) {
            res = parseInt(arr[0])*60+parseInt(arr[1]);
        }
        else {
            res = parseInt(arr[0])*60*60+parseInt(arr[1])*60+parseInt(arr[2]);
        }
        return (isNaN(res))?false:res;
    }
    
    atTime = function(timeA, timeB, diff) { return Math.abs(timeB-timeA) < diff; }
    
    //Performs the actual loop.
    loopIfRequired = function() {
        startTime = timeToSeconds(document.getElementById('startLoopTime').value);
        endTime = timeToSeconds(document.getElementById('endLoopTime').value);
        if (looping && atTime(ytPlayer.getCurrentTime(),(endTime == false? 0:(endTime+1)), 0.5)) { //endTime+1 - for minor correction, likewise for start time
            ytPlayer.seekTo((startTime == false? 0:(startTime+1)),true);
        }
    }
    
    //Initializes the looping component.
    function initializeLooper(addElement) {
	   if (addElement) { 
	       document.getElementById("watch7-sentiment-actions").appendChild(loopBtn); 
	       document.getElementById("watch7-sentiment-actions").appendChild(startLoopText); 
	       document.getElementById("watch7-sentiment-actions").appendChild(endLoopText); 
	   }
  	   ytPlayer = document.getElementById("movie_player");
       interval = window.setInterval(loopIfRequired, 10);
	}
	
	
    //Turns looping on or off, changing the button accordingly.
	changeLoopStatus = function() {
		if (looping) {
			document.getElementById("specificLoopButton").setAttribute("data-tooltip-text", "Enable time-specific loop");
			document.getElementById("specificLoopButton").setAttribute("data-button-toggle", "true");
			document.getElementById('loopBtnText').innerHTML = "Enable specific looping";
			document.getElementById("loopBtnText").setAttribute("class", loopOff);
			looping = false;
		} 
		else {
			document.getElementById("specificLoopButton").setAttribute("data-tooltip-text", "Disable time-specific loop");
			document.getElementById("specificLoopButton").setAttribute("data-button-toggle", "false");
			document.getElementById('loopBtnText').innerHTML = "Disable specific looping";
			document.getElementById("loopBtnText").setAttribute("class", loopOn);
			looping = true;
		}

	}

    var looping = false; //whether we're currently looping
    var startTime = 0, endTime = 0; //start and end time for the loop (in seconds)
    var loopOn = "loopOn", loopOff = "loopOff";
    
    //creating start/stop button and text boxes
   	var loopButtonClass = "yt-uix-button yt-uix-button-text yt-uix-button-size-default yt-uix-tooltip yt-uix-button-empty actionable"; // Button stuff
   	var loopBtn = document.createElement("button");
   	loopBtn.id = "slb";
   	loopBtn.setAttribute("class", loopButtonClass);
   	loopBtn.setAttribute("onclick", "changeLoopStatus(); return false;");
   	loopBtn.setAttribute("role", "button");
	loopBtn.setAttribute("data-button-toggle", "true");
	loopBtn.setAttribute("type", "button");
	loopBtn.setAttribute("data-tooltip-text", "Enable specific replay");
	loopBtn.id = "specificLoopButton";
	// creating inside of button
	a = document.createElement("span");
     a.innerHTML = '<div id="loopBtnText" class="loopOff"> Enable specific looping </div> <span class="yt-uix-button-valign"/>';
	loopBtn.appendChild(a);
	//creating text boxes
	var startLoopText = document.createElement("input");
	startLoopText.setAttribute("type", "text");
	startLoopText.setAttribute("value", "Start time goes here");
	startLoopText.id = "startLoopTime";
	startLoopText.setAttribute("class", loopButtonClass);
	startLoopText.setAttribute("role", "text");
	startLoopText.setAttribute("maxlength", "9");
	startLoopText.onclick = function() { startLoopText.setAttribute("value", ""); }
	startLoopText.setAttribute("data-tooltip-text", "Start time for specific replay");
	var endLoopText = document.createElement("input");
	endLoopText.id = "endLoopTime";
	endLoopText.setAttribute("class", loopButtonClass);
	endLoopText.setAttribute("type", "text");
	endLoopText.setAttribute("value", "End time goes here");
	endLoopText.onclick = function() { endLoopText.setAttribute("value", ""); }
	endLoopText.setAttribute("role", "text");
	endLoopText.setAttribute("maxlength", "9"); 
	endLoopText.setAttribute("data-tooltip-text", "End time for specific replay");
	
	//initializing loop buttons
	window.setTimeout(function() { initializeLooper(true); }, 2500);
	
	
    
};

document.body.appendChild(document.createElement('script')).innerHTML = "("+specificLoopScript+")()";
