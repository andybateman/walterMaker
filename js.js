var wm, fillColour, bgColour, rowHeight;

var config = {
	rows: parseInt(getParameter('rows')) || 13,
	fillColour: '#' + expandHex(getParameter('fillColour') || '000000'),
	bgColour: '#' + expandHex(getParameter('bgColour') || 'ffffff')
};

draw();

document.getElementById("walterMaker").addEventListener("click", draw, false);
document.getElementById("walterMaker").addEventListener("contextmenu", showMenu, false);
document.getElementById("wm-menu").addEventListener("submit", function(e) {
	e.preventDefault();
	applyConfig();
}, false);
document.getElementById("wm-save").addEventListener("click", saveImage, false);
document.addEventListener("keydown", function(e) {
	if (e.key === "Escape") hideMenu();
}, false);

function expandHex(h) {
	return h.length === 3 ? h[0]+h[0]+h[1]+h[1]+h[2]+h[2] : h;
}

function showMenu(e) {
	e.preventDefault();
	var menu = document.getElementById("wm-menu");
	document.getElementById("wm-rows").value = config.rows;
	document.getElementById("wm-fill").value = config.fillColour;
	document.getElementById("wm-bg").value = config.bgColour;
	menu.style.left = Math.min(e.clientX, window.innerWidth - 220) + "px";
	menu.style.top = Math.min(e.clientY, window.innerHeight - 170) + "px";
	menu.style.display = "block";
	setTimeout(function() {
		document.addEventListener("click", dismissHandler, false);
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
}

function saveImage() {
	var a = document.createElement("a");
	a.download = "walterMaker.png";
	a.href = document.getElementById("walterMaker").toDataURL("image/png");
	a.click();
	hideMenu();
}

function applyConfig() {
	config.rows = parseInt(document.getElementById("wm-rows").value) || 13;
	config.fillColour = document.getElementById("wm-fill").value;
	config.bgColour = document.getElementById("wm-bg").value;
	hideMenu();
	draw();
}

function draw() {
	var rowCount = config.rows;
	fillColour = config.fillColour;
	bgColour = config.bgColour;

	var width = document.getElementById('walterMaker').width =
		(getParameter('width') ? getParameter('width') : (window.innerWidth)*2);
	var height = document.getElementById('walterMaker').height =
		(getParameter('height') ? getParameter('height') : (Math.floor((window.innerHeight)/rowCount)*rowCount)*2);

	wm = document.getElementById("walterMaker").getContext("2d");

	document.getElementById('walterMaker').style.width = width/2 + "px";
	document.getElementById('walterMaker').style.height = (Math.floor((height)/rowCount)*rowCount)/2 + "px";

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
