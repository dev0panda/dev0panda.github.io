

var cv = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.height = 2000;  
        this.canvas.width = 2000;
        this.ctx = this.canvas.getContext("2d");   
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(gameloop, 20);
        this.box = [0, 0, 2000, 2000]   
        //this is good since it lines up pixels with lines
        //this.ctx.translate(0.5, 0.5)
    },
    clear : function() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "#102040";
        this.ctx.fillRect(this.box[0], this.box[1], this.box[2], this.box[3]);      
    }
}


startcoords = [0, 0]
c = cv.ctx
wid = 20
hig = 20
spacing = 1
size = 10

cv.start()  

keysPressed = []

c = cv.ctx

let screen = [];

var TilesWid = 150;
var TilesHig = 150;
w = TilesWid
h = TilesHig
tiles = [w*80+40, w*80+41, w*80+42, w*81+42, w*79+41]

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
                if (nearby < 2 || nearby > 3) {
                    remove.push(pos)
                }
            } else {
                if (nearby == 3) {
                    add.push(pos)
                }
            }
        }
            if (tiles.includes(pos)) {c.fillStyle = "#FFFFFF"}
            else {c.fillStyle = "#243260"}
            c.fillRect(startcoords[0]+i*(size+spacing), startcoords[1]+j*(size+spacing), size, size)
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

    }
}


t=1
timing = 5
function gameloop() {
    if (!(t%timing)) {
    //clear screen
    cv.clear()

    //determine which keys are pressed when
    document.body.onkeydown = function(event) {keytypeD(event)}
    document.body.onkeyup = function(event) {keytypeU(event)}

    //display to screen
    displayscreen(1)}
    t+=1
}
