
//needs a graph drawer, graph datatype, easy modification, and display of path taken
mousepos = [0,0]
clickpos = [0,0]
clicking = false
selectedNode = 0
center = [400, 400]

document.onmousemove = function (e) {
  mousepos = [e.pageX, e.pageY]
}

document.onmousedown = function (e) {
  mousepos = [e.pageX, e.pageY]
  clicking = true
  clickpos = mousepos

  selectedNode = nodeSelectOnClick(drawnGraphSet[0], mousepos)
  if (selectedNode=="not close enough") clicking = false
}
document.onmouseup = function (e) {
  clicking = false
}
fps = 100;
var cv = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.height = 800;
        this.canvas.width = 800;
        this.ctx = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.t = 0;
        this.twait = 0;
        this.wdt = 0;
        this.hgt = 0;
        this.interval = setInterval(drawloop, 1000/fps);
    },
    clear : function() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "#101010";
        this.ctx.fillRect(0, 0, 800, 800);      
    }
};

cv.start();


graphExample = [5, //number of vertices
                [ [0, 3], [2, 3], [1, 2], [2, 4] ] //edges
               ];


function fillVertexSet(setLength) {
  let v = [];
  for (let i = 0; i < setLength; i++) {
    v.push(i);
  };
  return v;
}; //converts a number of vertices to an array of vertices where the value of each element is its index

class Node { 
  constructor(position, graphIndex) {
    this.position = position;
    this.index = graphIndex;
  }
}; //has a position and index

class Line {
  constructor(position1, position2, graphIndices) {
    this.position1 = position1
    this.position2 = position2
    this.indices = graphIndices
  }
}; //has 2 positions and an index


drawnGraphSet = [];
function setDrawnGraph(graph, usePositions=false, positions=[]) {
  thisGraphSet = []
  v = fillVertexSet(graph[0]);
  e = graph[1];
  let vPositions = []
  let ePositions = []
  
  for (let i=0; i<graph[0]; i++) {
    if (usePositions) {
      vPositions.push(new Node( [positions[i][0], positions[i][1]], i ))
    } else {
      if (vPositions.length==0) { c = [center[0]+40-Math.random()*80, center[0]+40-Math.random()*80]}
      else {c = [c[0]+120-Math.random()*240, c[1]+120-Math.random()*240]}
      vPositions.push(new Node( c, i ))
    }
  }
  
  
  for (let i=0; i<e.length; i++) {
    ePositions.push(new Line(vPositions[e[i][0]].position, vPositions[e[i][1]].position, e[i] ))
  }
  
  drawnGraphSet.push({v:vPositions, e:ePositions})
}; //converts any graph to a graph which can be drawn to the screen with randomly chosen node positions

function drawLine(position1, position2, color="#BBB") {
  cv.ctx.strokeStyle = color;
  cv.ctx.lineWidth = 2;
  cv.ctx.beginPath();
  cv.ctx.moveTo(position1[0], position1[1]);
  cv.ctx.lineTo(position2[0], position2[1]);
  cv.ctx.stroke();
}; //draws a line on the canvas

function drawCircle(position, radius, color="#FFF") {
  cv.ctx.beginPath();
  cv.ctx.arc(position[0], position[1], radius, 0, 2 * Math.PI);
  cv.ctx.fillStyle = color;
  cv.ctx.fill();
  cv.ctx.lineWidth = 2;
  cv.ctx.strokeStyle = "#888";
  cv.ctx.stroke();
} //draws a circle on the canvas

function drawGraph(drawableGraph) {

  for (let i=0; i<drawableGraph.e.length; i++) {
  drawLine(drawableGraph.e[i].position1, drawableGraph.e[i].position2)
  }
  for (let i=0; i<drawableGraph.v.length; i++) {
    drawCircle(drawableGraph.v[i].position, 8)
  }
} //draws a graph on the canvas


function createRandomGraph(n) {
  //use n as max number of vertices
  r = [n, []]
  for (let i = 0; i<n; i++) {
    for (let j = 0; j<n; j++) {
      if (Math.random()>0.93 && i!=j) r[1].push([i, j])
    }
  }
  return r
}

function updateNodePosition(nodeindex, graph, movement) {
  graph.v[nodeindex].position = [graph.v[nodeindex].position[0]+movement[0], graph.v[nodeindex].position[1]+movement[1]]
  newposition = graph.v[nodeindex].position
  //console.log(graph.v[nodeindex].position)
  for (let i=0; i<graph.e.length; i++) {
    ind = graph.e[i].indices.indexOf(nodeindex)
    if (ind!=-1) {
      if (ind==0) graph.e[i].position1 = newposition
      if (ind==1) graph.e[i].position2 = newposition
    }
  }
}

function distance(p1, p2) {
    return Math.sqrt((p1[0]-p2[0])*(p1[0]-p2[0])+(p1[1]-p2[1])*(p1[1]-p2[1]))
}

function nodeSelectOnClick(graph, position) {
  d = 10000
  si = 0
  for (let i=0; i<graph.v.length; i++) {
    if (distance(position, graph.v[i].position)<d) {
      d=distance(position, graph.v[i].position)
      si = i
    }
  }
  if (d<80) return si;
  return "not close enough"
}


rando = createRandomGraph(20)

setDrawnGraph(rando)

speeds = []
for (let i=0; i<drawnGraphSet[0].v.length; i++) {
    speeds.push([0,0])
}




function drawloop() {
    cv.clear();
    if (clicking) {updateNodePosition(selectedNode, drawnGraphSet[0], [mousepos[0]-drawnGraphSet[0].v[selectedNode].position[0],
      mousepos[1]-drawnGraphSet[0].v[selectedNode].position[1]])
    }

    for (let n=0; n<5; n++) {
for( let i=0; i<drawnGraphSet[0].v.length; i++) {
    ve = [0, 0]
    for (let j=0; j<drawnGraphSet[0].v.length; j++) {
    if (i!=j) {
    dx = drawnGraphSet[0].v[i].position[0]-drawnGraphSet[0].v[j].position[0]
    dy = drawnGraphSet[0].v[i].position[1]-drawnGraphSet[0].v[j].position[1]
    d = distance([drawnGraphSet[0].v[i].position[0], drawnGraphSet[0].v[i].position[1]],[drawnGraphSet[0].v[j].position[0],drawnGraphSet[0].v[j].position[1]])
        
ve = [ve[0]-100*(1-2*d)*dx/(d*d*d*d+0.5), ve[1]-100*(1-2*d)*dy/(d*d*d*d+0.5)]
    
    }
    }
    d = 100*distance([drawnGraphSet[0].v[i].position[0], drawnGraphSet[0].v[i].position[1]],center)
    ud = (d>2000)

    speeds[i] = [speeds[i][0]+ve[0]-10*ud*(drawnGraphSet[0].v[i].position[0]-center[0]+0.01)/(d+0.01),
 speeds[i][1]+ve[1]-10*ud*(drawnGraphSet[0].v[i].position[1]-center[1]+0.01)/(d+0.01)]
    speeds[i][0]*=0.9+0.11*Math.random()
    speeds[i][1]*=0.9+0.11*Math.random()
    
}
}
    drawGraph(drawnGraphSet[0])
    for (let i=0; i<drawnGraphSet[0].v.length ;i++) {
    updateNodePosition(i, drawnGraphSet[0], speeds[i])
    }
};

