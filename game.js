var cv = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.height = 700;  
        this.canvas.width = 700;
        this.ctx = this.canvas.getContext("2d");   
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(gameloop, 20);
        this.box = [0, 0, 1000, 1000]
        //this is good since it lines up pixels with lines
        //this.ctx.translate(0.5, 0.5)
    },
    clear : function() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "#102040";
        this.ctx.fillRect(this.box[0], this.box[1], this.box[2], this.box[3]);      
    }
}


startcoords = [20, 20]
c = cv.ctx
wid = 20
hig = 20
spacing = 1
size = 5

cv.start()  

keysPressed = []

c = cv.ctx
click = [-1, -1]
let screen = [];

var TilesWid = 100;
var TilesHig = 100;
w = TilesWid
h = TilesHig
tiles = [w*40+40, w*40+41, w*40+42, w*41+42, w*39+41]

function displayscreen(update) {
    remove = []
    add = []
    for (i=0; i<TilesWid; i++) {
        for (j=0; j<TilesHig; j++) {
            pos = i*TilesHig+j
            if (update) {
            nearby = 0
                if (tiles.includes(pos-1)) {
                    nearby +=1
                }
                if (tiles.includes(pos+1)) {
                    nearby +=1
                }
                if (tiles.includes(pos-TilesWid)) {
                    nearby +=1
                }
                if (tiles.includes(pos+TilesWid)) {
                    nearby +=1
                }
                if (tiles.includes(pos-TilesWid-1)) {
                    nearby +=1
                }
                if (tiles.includes(pos+TilesWid+1)) {
                    nearby +=1
                }
                if (tiles.includes(pos-TilesWid+1)) {
                    nearby +=1
                }
                if (tiles.includes(pos+TilesWid-1)) {
                    nearby +=1
                }
            if (tiles.includes(pos)) {
                //this is a cool ruleset:          
					//if (nearby < 2 || nearby > 3 && nearby<7) 
					if (nearby < 2 || nearby > 3) {
                    remove.push(pos)
                }
            } else {
					//this is a cool ruleset:
                //if (nearby == 3 || nearby>=7)
					 if (nearby == 3) {
                    add.push(pos)
                }
            }
        }
            if (tiles.includes(pos)) {c.fillStyle = "#FFFFFF"}
            else {c.fillStyle = "#243260"}
            c.fillRect(startcoords[0]+i*(size+spacing), startcoords[1]+j*(size+spacing), size, size)
				
				//add check for click here
				if (click[0]<=startcoords[0]+i*(size+spacing)+size && click[0]>startcoords[0]+i*(size+spacing) &&
				click[1]<=startcoords[1]+j*(size+spacing)+size && click[1]>startcoords[1]+j*(size+spacing)) {
				if (tiles.includes(pos)) {remove.push(pos)} else {add.push(pos)}
				click = [-1, -1]
				}
				
            //console.log(i*(size+spacing), j*(size+spacing))
        }
    }
    for (i=0; i<remove.length; i++) {
    tiles.splice(tiles.indexOf(remove[i]), 1)
    }
    for (i=0; i<add.length; i++) {
    tiles.push(add[i])
    }
}

displayscreen(0);




//function to set keyvariables
function keytypeD(e) {
    switch (e.key) {
        case "ArrowLeft":
        if (!(keysPressed.indexOf("Left") in keysPressed)) {
        keysPressed.push("Left")}
        break;
        case "ArrowRight":
        if (!(keysPressed.indexOf("Right") in keysPressed)) {
        keysPressed.push("Right")}
        break;
        case "ArrowUp":
        if (!(keysPressed.indexOf("Up") in keysPressed)) {
        keysPressed.push("Up")}
        break;
        case "ArrowDown":
        if (!(keysPressed.indexOf("Down") in keysPressed)) {
        keysPressed.push("Down")}
        break;
        case " ":
        if (!(keysPressed.indexOf("Space") in keysPressed)) {
        keysPressed.push("Space")}
        break;
    }
}
//function to remove keyvariables
function keytypeU(e) {
    switch (e.key) {
        case "ArrowLeft":
        if (keysPressed.indexOf("Left") in keysPressed) {
        keysPressed.splice(keysPressed.indexOf("Left"), 1)}
        break;
        case "ArrowRight":
        if (keysPressed.indexOf("Right") in keysPressed) {
        keysPressed.splice(keysPressed.indexOf("Right"), 1)}
        break;
        case "ArrowUp":
        if (keysPressed.indexOf("Up") in keysPressed) {
        keysPressed.splice(keysPressed.indexOf("Up"), 1)}
        break;
        case "ArrowDown":
        if (keysPressed.indexOf("Down") in keysPressed) {
        keysPressed.splice(keysPressed.indexOf("Down"), 1)}
        break;
		  case " ":
		  if (keysPressed.indexOf("Space") in keysPressed) {
        keysPressed.splice(keysPressed.indexOf("Space"), 1)}
        break;

    }
}
document.getElementById("input1").onclick = function() {
for (var i = 0; i < TilesWid*TilesHig/10; i++) {
tiles.push(Math.floor(Math.random()*TilesWid*TilesHig))}
}
  
document.getElementById("input2").onclick = function() {tiles = []}
pause = 0;
t=1
timing = 2
clock = true
document.getElementById("input3").onclick = function() {pause = 1; console.log(pause)}
  


function paused() {
  if (clock) {clock = false; t= (t%2) ? t : t+1} else {clock = true}
}
  
function gameloop() {
	if (keysPressed.includes("Space") || pause) {paused(); pause = 0;}
    
    //clear screen
    
    //determine which keys are pressed when
    document.body.onkeydown = function(event) {keytypeD(event)}
    document.body.onkeyup = function(event) {keytypeU(event)}
	 document.body.onclick = function(event) {click = [event.pageX-size-spacing, event.pageY-size-spacing]}
	 
	 cv.clear();
    //display to screen
    if (!(t%timing)) { displayscreen(1)} else {displayscreen(0)}
    if (clock) {t+=1}
}
