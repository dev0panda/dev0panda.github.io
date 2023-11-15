

var cv = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.height = 800;  
        this.canvas.width = 600;
        this.ctx = this.canvas.getContext("2d");   
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(gameloop, 100);
        this.box = [0, 0, 500, 500]
        //this is good since it lines up pixels with lines
        this.ctx.translate(0.5, 0.5)
    },
    clear : function() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "#102040";
        this.ctx.fillRect(this.box[0], this.box[1], this.box[2], this.box[3]);      
    }
}



cv.start()  

keysPressed = []

points = [[0, 0, 0, 10, 10, 10, 10, 0, 0, 0], [20, 40, 20, 60, 40, 60, 40, 40, 20, 40]]




//heeeey maybe it's time for a 3d renderer here

function generatePoints(l1, l2) {
    for (var i = 0; i<l1; i++) {
        p1 = []
        for (var j = 0; j<l2; j++) {
        //this generates competely random, but connected points:
        /*x1 =Math.random()*cv.box[2]
        y1 =Math.random()*cv.box[3]
        p1.push(Math.random()*cv.box[2], Math.random()*cv.box[3], x1, y1)
        p1.push(x1, y1, Math.random()*cv.box[2], Math.random()*cv.box[3])*/

        //this generates something cool maybe:
        p1.push(i/l1*cv.box[2], j/l2*cv.box[3], j/l1*cv.box[2], i/l2*cv.box[3])

        
        }
        points.push(p1)
    }
}


//I'm so much better at coding now; let's make this good.

//now you can enter an array of lines
function displayLines(linearray) {
    //linearray should be in the form [x1, y1, x2, y2, x3, y3...]
    cv.ctx.strokeStyle = "#FFFFFF"
    for (var i = 0; i<linearray.length/2; i++) {
    cv.ctx.beginPath();
    cv.ctx.moveTo(linearray[i*2], linearray[i*2+1]);
    cv.ctx.lineTo(linearray[i*2+2], linearray[i*2+3]);
    cv.ctx.stroke();
    }   
}

function mLines(linearrayarray) {
    for (var i = 0; i<linearrayarray.length; i++) {
        displayLines(linearrayarray[i])
    }
}

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



function gameloop() {
    //clear screen
    cv.clear()

    //determine which keys are pressed when
    document.body.onkeydown = function(event) {keytypeD(event)}
    document.body.onkeyup = function(event) {keytypeU(event)}

    //display to screen
    mLines(points)
}
