var wm, fillColour, bgColour, rowHeight;
var animInterval = null;
var longPressTimer = null;
var longPressActive = false;

var presets = {
	'Classic':   ['#000000', '#ffffff'],
	'Inverted':  ['#ffffff', '#000000'],
	'Red/Black': ['#cc0000', '#000000'],
	'Blue/Gold': ['#1a4a8a', '#d4a017'],
	'Forest':    ['#1b5e20', '#f5f5f5']
};

var config = {
	rows:       enforceOdd(parseInt(getParameter('rows')) || 13),
	fillColour: '#' + expandHex(getParameter('fillColour') || '000000'),
	bgColour:   '#' + expandHex(getParameter('bgColour')   || 'ffffff')
};

draw();

var canvas = document.getElementById("walterMaker");
canvas.addEventListener("click", draw, false);
canvas.addEventListener("contextmenu", showMenu, false);
canvas.addEventListener("touchstart", function(e) {
	longPressActive = false;
	var touch = e.touches[0];
	longPressTimer = setTimeout(function() {
		longPressActive = true;
		showMenuAt(touch.clientX, touch.clientY);
	}, 600);
}, false);
canvas.addEventListener("touchend", function(e) {
	clearTimeout(longPressTimer);
	if (longPressActive) {
		e.preventDefault();
		longPressActive = false;
	}
}, false);
canvas.addEventListener("touchmove", function() {
	clearTimeout(longPressTimer);
	longPressActive = false;
}, false);

document.getElementById("wm-menu").addEventListener("submit", function(e) {
	e.preventDefault();
	applyConfig();
}, false);
document.getElementById("wm-preset").addEventListener("change", applyPreset, false);
document.getElementById("wm-animate").addEventListener("click", toggleAnimation, false);
document.getElementById("wm-save").addEventListener("click", saveImage, false);
document.addEventListener("keydown", function(e) {
	if (e.key === "Escape") hideMenu();
}, false);

function enforceOdd(n) {
	return n % 2 === 0 ? n + 1 : n;
}

function expandHex(h) {
	return h.length === 3 ? h[0]+h[0]+h[1]+h[1]+h[2]+h[2] : h;
}

function showMenu(e) {
	e.preventDefault();
	showMenuAt(e.clientX, e.clientY);
}

function showMenuAt(x, y) {
	var menu = document.getElementById("wm-menu");
	document.getElementById("wm-rows").value = config.rows;
	document.getElementById("wm-fill").value = config.fillColour;
	document.getElementById("wm-bg").value = config.bgColour;
	document.getElementById("wm-preset").value = "";
	document.getElementById("wm-animate").textContent = animInterval ? "Stop animation" : "Start animation";
	menu.style.left = Math.min(x, window.innerWidth - 220) + "px";
	menu.style.top = Math.min(y, window.innerHeight - 270) + "px";
	menu.style.display = "block";
	setTimeout(function() {
		document.addEventListener("click", dismissHandler, false);
		document.addEventListener("touchstart", dismissHandler, false);
	}, 0);
}

function dismissHandler(e) {
	if (!document.getElementById("wm-menu").contains(e.target)) {
		hideMenu();
	}
}

function hideMenu() {
	document.getElementById("wm-menu").style.display = "none";
	document.removeEventListener("click", dismissHandler, false);
	document.removeEventListener("touchstart", dismissHandler, false);
}

function applyPreset() {
	var key = document.getElementById("wm-preset").value;
	if (!key || !presets[key]) return;
	config.fillColour = presets[key][0];
	config.bgColour = presets[key][1];
	document.getElementById("wm-fill").value = config.fillColour;
	document.getElementById("wm-bg").value = config.bgColour;
	updateURL();
	hideMenu();
	draw();
}

function applyConfig() {
	config.rows = enforceOdd(parseInt(document.getElementById("wm-rows").value) || 13);
	config.fillColour = document.getElementById("wm-fill").value;
	config.bgColour = document.getElementById("wm-bg").value;
	updateURL();
	hideMenu();
	draw();
}

function updateURL() {
	var params = new URLSearchParams(location.search);
	params.set('rows', config.rows);
	params.set('fillColour', config.fillColour.slice(1));
	params.set('bgColour', config.bgColour.slice(1));
	history.replaceState(null, '', '?' + params.toString());
}

function toggleAnimation() {
	if (animInterval) {
		clearInterval(animInterval);
		animInterval = null;
	} else {
		animInterval = setInterval(draw, 2000);
	}
	hideMenu();
}

function saveImage() {
	var a = document.createElement("a");
	a.download = "walterMaker.png";
	a.href = canvas.toDataURL("image/png");
	a.click();
	hideMenu();
}

function draw() {
	var rowCount = config.rows;
	fillColour = config.fillColour;
	bgColour = config.bgColour;

	var width = canvas.width =
		(getParameter('width') ? getParameter('width') : (window.innerWidth)*2);
	var height = canvas.height =
		(getParameter('height') ? getParameter('height') : (Math.floor((window.innerHeight)/rowCount)*rowCount)*2);

	wm = canvas.getContext("2d");

	canvas.style.width = width/2 + "px";
	canvas.style.height = (Math.floor((height)/rowCount)*rowCount)/2 + "px";

	rowHeight = height / rowCount;
	var rowLocation = 0;

	var koruSize = rowHeight * 0.95;
	var koruPad = rowHeight - koruSize;

	for (var i = 0; i <= rowCount * 2; i++) {
		wm.fillStyle = i%2===0 ? bgColour : fillColour;
		wm.fillRect(0, rowLocation, width, rowLocation+(rowHeight/2));
		rowLocation = rowLocation + (rowHeight/2);
	}
	rowLocation = 0;

	for (i=0; i<=rowCount; i++) {
		if (i>=2 && i < rowCount-1) {
			drawKoru(koruSize, koruPad, (width/2)+Math.floor(Math.random()*(width/8))+(width/7), rowLocation, Math.floor(Math.random()*3), 1);
			drawKoru(koruSize, koruPad, (width/2)-Math.floor(Math.random()*(width/8))-(width/6), rowLocation-(rowHeight/2), Math.floor(Math.random()*3), 0);
		}
		rowLocation = rowLocation + rowHeight;
	}
}

function drawKoru(koruSize, koruPad, x, y, style, colour) {

	var koruWidth = 0;

	switch (style) {
		case 0:
			koruWidth = (koruSize) + koruPad;
			x = x - (koruWidth/2);

			wm.fillStyle = colour%2===0 ? fillColour : bgColour;
			wm.fillRect(x+(koruSize/2), y+rowHeight/2-1, koruWidth, (rowHeight/2)+2);

			wm.beginPath();
			wm.fillStyle = colour%2===0 ? bgColour : fillColour;
			wm.arc(x+koruSize/2, y+koruPad+koruSize/2, koruSize/2, 0, 2*Math.PI, false);
			wm.arc(x+koruSize+koruPad+koruSize/2, y+koruPad+koruSize/2, koruSize/2, 0, 2*Math.PI, false);
			wm.fill();
			wm.closePath();
			break;

		case 1:
			koruWidth = (koruSize*2) + (koruPad*2);
			x = x - (koruWidth/2);

			wm.fillStyle = colour%2===0 ? fillColour : bgColour;
			wm.fillRect(x+(koruSize/2), y+rowHeight/2-1, koruWidth, (rowHeight/2)+2);

			wm.beginPath();
			wm.fillStyle = colour%2===0 ? bgColour : fillColour;
			wm.arc(x+koruSize/2, y+koruPad+koruSize/2, koruSize/2, 0, 2*Math.PI, false);
			wm.arc(x+koruSize+koruPad+koruSize/2, y+koruPad+koruSize/2, koruSize/2, 0, 2*Math.PI, false);
			wm.arc(x+(koruSize*2)+(koruPad*2)+koruSize/2, y+koruPad+koruSize/2, koruSize/2, 0, 2*Math.PI, false);
			wm.fill();
			wm.closePath();
			break;

		case 2:
			var koruBreak = (koruSize*2) + koruPad + Math.floor(Math.random()*(koruSize));
			koruWidth = (koruSize*2) + koruPad + koruBreak;
			x = x - (koruWidth/2);

			wm.fillStyle = colour%2===0 ? fillColour : bgColour;
			wm.fillRect(x+(koruSize/2), y+rowHeight/2-1, koruWidth, (rowHeight/2)+2);

			wm.fillStyle = colour%2===0 ? bgColour : fillColour;
			wm.fillRect(x+(koruSize/2)+rowHeight, y+rowHeight/2, koruWidth-(rowHeight*2), rowHeight/2);

			wm.beginPath();
			wm.fillStyle = colour%2===0 ? bgColour : fillColour;
			wm.arc(x+koruSize/2, y+koruPad+koruSize/2, koruSize/2, 0, 2*Math.PI, false);
			wm.arc(x+koruSize+koruPad+koruSize/2, y+koruPad+koruSize/2, koruSize/2, 0, 2*Math.PI, false);
			wm.arc(x+(koruSize*1.5)+(koruPad*1)+koruBreak, y+koruPad+koruSize/2, koruSize/2, 0, 2*Math.PI, false);
			wm.arc(x+(koruSize*2.5)+(koruPad*2)+koruBreak, y+koruPad+koruSize/2, koruSize/2, 0, 2*Math.PI, false);
			wm.fill();
			wm.closePath();
			break;
	}
}

function getParameter(name) {
	return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||false
}
