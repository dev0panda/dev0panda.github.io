canvas = document.getElementById('minesweeperScreen')
canvas.width = 500;
canvas.height = 500;
ctx = canvas.getContext('2d')

document.body.oncontextmenu = function() {return false;}

clear = function () {
ctx.clearRect(0, 0, canvas.width, canvas.height)
ctx.fillStyle = "#121212"
ctx.fillRect(0, 0, canvas.width, canvas.height)
}

const minesweeperDimensions = [10, 10]
const size = 20
const spacing = 2
const start = [100,100]
let drawingBombs = false
//just as a note, it would be better to have the start, spacing, size, etc. variables be defined here for all functions rather than for each function. oh well.



clicking = false
alreadyclicked = false
lost = false
mousepos = [0,0]
pressingLocation = [-100,-100]
numBombs = 15
flags = []

document.onmousedown = function (e) {
    pressingLocation = [-100, -100]
    if (!lost) {
    clicking = true
    mousepos = [e.pageX, e.pageY]
    let i = getMinesweeperIndices(mousepos)
    if (i[0]>=0 && i[0]<minesweeperDimensions[1] && i[1]>=0 && i[1]<minesweeperDimensions[1]) pressingLocation = mousepos
    }
}
document.onmouseup = function (e) {
    clicking = false
    if (e.button==0) {
    let updating = true
    let ind = getMinesweeperIndices(pressingLocation)
    for (let i = 0; i<flags.length ;i++) {
    if (flags[i].x==ind[0] && flags[i].y==ind[1]) updating = false
    }
    if (updating) updateMinesweeperGrid(ind)
    
    }
    if (e.button==2) {
        ind = getMinesweeperIndices(pressingLocation)
        if (minesweeperGrid[ind[0]][ind[1]]!=2) {
        let removed = false
        for (let i=0; i<flags.length; i++) {
            if (flags[i].x==ind[0] && flags[i].y==ind[1]) {flags.splice(i, 1); removed = true}
        }
        if (!removed) flags.push({"x": ind[0], "y": ind[1]})
        }
    }
    pressingLocation = [-100, -100]
}
document.onmousemove = function (e) {
    mousepos = [e.pageX, e.pageY]
}

function createMinesweeperGrid(dimensions) {
    g = []
    l = dimensions[0]*dimensions[1]
    b = numBombs
    for (let i=0; i<dimensions[0]; i++) {
        d = []
        for (let j=0; j<dimensions[1]; j++) {
            if (Math.random()>b/l && b<=l) {
                d.push(0)
            } else {
                if (b>0) {
                d.push(1)
                b-=1
                }
            }

            l-=1

        }
        g.push(d)
    }
    return g
}
minesweeperGrid = createMinesweeperGrid(minesweeperDimensions)
numberDisplay = []

function updateMinesweeperGrid(indices, grid=minesweeperGrid, initial=true) {
    
    if (grid[indices[0]][indices[1]]==1) {
        if (initial) {
            if (alreadyclicked) {lost = true} else {
                grid[indices[0]][indices[1]]=0
                alreadyclicked = true
            }
        } 
    } else {
    grid[indices[0]][indices[1]]=2
    let nb = getNearbyBombs(indices)
        if (nb!=0) {numberDisplay.push([indices, nb])} else {
        for (let i=-1; i<=1; i++) {
            for (let j=-1; j<=1; j++) {
                if ( grid[indices[0]+i]!=undefined) {
                if (grid[indices[0]+i][indices[1]+j]!=undefined) {
                if (grid[indices[0]+i][indices[1]+j]!=2) {
                    updateMinesweeperGrid([indices[0]+i,indices[1]+j], grid, false)
                }

                }
                }
            }
        }
    }
    }
    alreadyclicked = true
}
function getNearbyBombs(indices) {
    count = 0
    for (let i=-1; i<=1; i++) {
        for (let j=-1; j<=1; j++) {
            if (minesweeperGrid[indices[0]+i]!=undefined) {
            
                if (minesweeperGrid[indices[0]+i][indices[1]+j]!=undefined) {
                    count+=(minesweeperGrid[indices[0]+i][indices[1]+j]==1)*1
                }
                
            }
            
        }
    }
    return count
}

function drawMinesweeperGrid(dimensions=minesweeperDimensions) {
    for (let i=0; i<dimensions[1]; i++) {
        for (let j = 0; j<dimensions[0]; j++) {
            switch (minesweeperGrid[i][j]) {
                case 0:
                    drawOutwardTile(start, size, spacing, i, j)
                    break;
                case 1:
                    drawOutwardTile(start, size, spacing, i, j)
                    if (drawingBombs) drawBomb(start, size, spacing, i, j)
                    break;
                case 2:
                    drawClearedTile(start, size, spacing, i, j)
                    break;
            }
            
        }
    }
}

function getMinesweeperIndices(position) {
    return [Math.floor((position[0]-start[0]-4)/22),Math.floor((position[1]-start[1]-4)/22)]
}

function drawOutwardTile(start, size, spacing, j, i) {
    ctx.fillStyle="#FFF"
    ctx.fillRect(start[0]+j*(size+spacing), start[1]+i*(size+spacing), size, size)
    ctx.fillStyle="#CCC"
    ctx.fillRect(start[0]+j*(size+spacing)+3, start[1]+i*(size+spacing)+3, size-3, size-3)
    ctx.fillStyle="#888"
    ctx.fillRect(start[0]+j*(size+spacing)+size-2, start[1]+i*(size+spacing)+2, 2, size-2)
    ctx.fillStyle="#888"
    ctx.fillRect(start[0]+j*(size+spacing)+2, start[1]+i*(size+spacing)+size-2, size-2, 2)
}
function drawBomb(start, size, spacing, j, i) {
    ctx.strokeStyle = "#000"
    ctx.lineWidth = 5
    ctx.beginPath()
    ctx.moveTo(start[0]+j*(size+spacing)+2, start[1]+i*(size+spacing)+2)
    ctx.lineTo(start[0]+j*(size+spacing)+size-2, start[1]+i*(size+spacing)+size-2)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(start[0]+j*(size+spacing)+size-2, start[1]+i*(size+spacing)+2)
    ctx.lineTo(start[0]+j*(size+spacing)+2, start[1]+i*(size+spacing)+size-2)
    ctx.stroke()
}

function drawFlag(start, size, spacing, j, i) {
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#000"
    ctx.beginPath()
    ctx.moveTo(start[0]+j*(size+spacing)+size*0.4, start[1]+i*(size+spacing)+size)
    ctx.lineTo(start[0]+j*(size+spacing)+size*0.4, start[1]+i*(size+spacing))
    ctx.moveTo(start[0]+j*(size+spacing)+size*0.4+2, start[1]+i*(size+spacing))
    ctx.lineTo(start[0]+j*(size+spacing)+size*0.8+2, start[1]+i*(size+spacing)+6)
    ctx.lineTo(start[0]+j*(size+spacing)+size*0.4+2, start[1]+i*(size+spacing)+12)
    ctx.lineTo(start[0]+j*(size+spacing)+size*0.4+2, start[1]+i*(size+spacing))
    ctx.stroke()
    ctx.fillStyle="#F00"
    ctx.fill()
}

function drawPressedTile(start, size, spacing, j, i) {
    ctx.fillStyle="#444"
    ctx.fillRect(start[0]+j*(size+spacing), start[1]+i*(size+spacing), size, size)
    ctx.fillStyle="#888"
    ctx.fillRect(start[0]+j*(size+spacing)+3, start[1]+i*(size+spacing)+3, size-3, size-3)
    ctx.fillStyle="#CCC"
    ctx.fillRect(start[0]+j*(size+spacing)+size-2, start[1]+i*(size+spacing)+2, 2, size-2)
    ctx.fillStyle="#CCC"
    ctx.fillRect(start[0]+j*(size+spacing)+2, start[1]+i*(size+spacing)+size-2, size-2, 2)
}

function drawClearedTile(start, size, spacing, j, i) {
    ctx.fillStyle="#444"
    ctx.fillRect(start[0]+j*(size+spacing)-2, start[1]+i*(size+spacing)-2, size+4, size+4)
    ctx.fillStyle="#AAA"
    ctx.fillRect(start[0]+j*(size+spacing)+1, start[1]+i*(size+spacing)+1, size-2, size-2)
}

function drawNumbers() {
    for (let i = 0; i<numberDisplay.length; i++) {
        switch (numberDisplay[i][1]) {
            case 0:
            return
            case 1:
            ctx.fillStyle = "#00F"
            break;
            case 2:
            ctx.fillStyle = "#0F0"
            break;
            case 3:
            ctx.fillStyle = "#F00"
            break;
            case 4:
            ctx.fillStyle = "#F0F"
            break;
            case 5:
            ctx.fillStyle = "#FF0"
            break;
            case 6:
            ctx.fillStyle = "#FFF"
            break;
            case 7:
            ctx.fillStyle = "#000"
            break;
        }
        ctx.font="25px Calibri";
        ctx.fillText(numberDisplay[i][1], start[0]+numberDisplay[i][0][0]*(size+spacing)+size*0.2,start[1]+numberDisplay[i][0][1]*(size+spacing)+size-2)
        //ctx.moveTo(start[0]+numberDisplay[i][0][0]*(size+spacing)+2, start[1]+numberDisplay[i][0][1]*(size+spacing)+2)
        //ctx.lineTo(start[0]+numberDisplay[i][0][0]*(size+spacing)+size-2, start[1]+numberDisplay[i][0][1]*(size+spacing)+size-2)
        //ctx.stroke()
    }
}


function restoreGame() {
    lost = false
    minesweeperGrid = createMinesweeperGrid(minesweeperDimensions)
    flags = []
    numberDisplay = []
    drawingBombs = false
}

requestAnimationFrame(loop)

function loop() {
clear() 

if (lost) drawingBombs = true

drawMinesweeperGrid()

drawPressedTile(start, 20, 2, getMinesweeperIndices(pressingLocation)[0],getMinesweeperIndices(pressingLocation)[1])
drawNumbers()

for (let i = 0; i<flags.length ;i++) {
    drawFlag(start, size, spacing, flags[i].x, flags[i].y)
}

requestAnimationFrame(loop)
}