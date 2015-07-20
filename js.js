draw();
document.getElementById("walterMaker").addEventListener("click", function(){draw();}, false);

function draw() {
	
	rowCount = (getParameter('rows') ? getParameter('rows') : 13);
	fillColour = "#" + (getParameter('fillColour') ? getParameter('fillColour') : "000");
	bgColour = "#" + (getParameter('bgColour') ? getParameter('bgColour') : "fff");
	width = document.getElementById('walterMaker').width =
		(getParameter('width') ? getParameter('width') : (window.innerWidth)*2);
	height = document.getElementById('walterMaker').height =
		(getParameter('height') ? getParameter('height') : (Math.floor((window.innerHeight)/rowCount)*rowCount)*2);

	wm = document.getElementById("walterMaker").getContext("2d");
	
	document.getElementById('walterMaker').style.width = width/2 + "px";
	document.getElementById('walterMaker').style.height = (Math.floor((height)/rowCount)*rowCount)/2 + "px";

	rowHeight = height / rowCount;
	rowLocation = 0;

	koruSize = rowHeight * 0.95;
	koruPad = rowHeight - koruSize;

	for (i = 0; i <= rowCount * 2; i++) {
		
		wm.fillStyle = i%2==0 ? bgColour : fillColour;
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

	koruWidth = 0;

	switch (style) {
		case 0:
			koruWidth = (koruSize) + koruPad;
			x = x - (koruWidth/2);
			
			wm.fillStyle = colour%2==0 ? fillColour : bgColour;
			wm.fillRect(x+(koruSize/2), y+rowHeight/2-1, koruWidth, (rowHeight/2)+2);
			
			wm.beginPath();
			wm.fillStyle = colour%2==0 ? bgColour : fillColour;
			wm.arc(x+koruSize/2, y+koruPad+koruSize/2, koruSize/2, 0, 2*Math.PI, false);
			wm.arc(x+koruSize+koruPad+koruSize/2, y+koruPad+koruSize/2, koruSize/2, 0, 2*Math.PI, false);
			wm.fill();
			wm.closePath();		
			break;
			
		case 1:
			koruWidth = (koruSize*2) + (koruPad*2);
			x = x - (koruWidth/2);
			
			wm.fillStyle = colour%2==0 ? fillColour : bgColour;
			wm.fillRect(x+(koruSize/2), y+rowHeight/2-1, koruWidth, (rowHeight/2)+2);
			
			wm.beginPath();
			wm.fillStyle = colour%2==0 ? bgColour : fillColour;
			wm.arc(x+koruSize/2, y+koruPad+koruSize/2, koruSize/2, 0, 2*Math.PI, false);
			wm.arc(x+koruSize+koruPad+koruSize/2, y+koruPad+koruSize/2, koruSize/2, 0, 2*Math.PI, false);
			wm.arc(x+(koruSize*2)+(koruPad*2)+koruSize/2, y+koruPad+koruSize/2, koruSize/2, 0, 2*Math.PI, false);
			wm.fill();
			wm.closePath();	
			break;

		case 2:
			koruBreak = (koruSize*2) + koruPad + Math.floor(Math.random()*(koruSize));
			koruWidth = (koruSize*2) + koruPad + koruBreak;
			x = x - (koruWidth/2);
			
			wm.fillStyle = colour%2==0 ? fillColour : bgColour;
			wm.fillRect(x+(koruSize/2), y+rowHeight/2-1, koruWidth, (rowHeight/2)+2);
			
			wm.fillStyle = colour%2==0 ? bgColour : fillColour;
			wm.fillRect(x+(koruSize/2)+rowHeight, y+rowHeight/2, koruWidth-(rowHeight*2), rowHeight/2);
			
			wm.beginPath();
			wm.fillStyle = colour%2==0 ? bgColour : fillColour;
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
