function distance(p1, p2) {
    return Math.sqrt((p1[0]-p2[0])**2+(p1[1]-p2[1])**2)
}
function normalize(v) {
    d = (distance(v, [0,0]) == 0) ? 1 : distance(v, [0,0])
    return [v[0]/d, v[1]/d]
}
function returnRGBA(c, a=1) {
    return `rgba(${c[0]},${c[1]},${c[2]},${a})`
}

function drawCircle(ctx, x, y, r, col) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fillStyle = col
    ctx.fill();
}
function drawRectangle(context, x, y, width, height, color) {
    context.beginPath();
    context.rect(x, y, width, height);
    context.fillStyle = color;
    context.fill();
}
function drawLine(context, position1, position2, color="rgba(223, 223, 223, 0.6)", size=1 ) {
context.strokeStyle = color;
context.lineWidth = size;
context.beginPath();
context.moveTo(position1[0], position1[1]);
context.lineTo(position2[0], position2[1]);
context.stroke();
};



//these collision detection functions weren't written by me, so I'll need to remake them myself at some point
function lineCircle( x1,  y1,  x2,  y2,  cx,  cy,  r) {

    // is either end INSIDE the circle?
    // if so, return true immediately
    let inside1 = pointCircle(x1,y1, cx,cy,r);
    let  inside2 = pointCircle(x2,y2, cx,cy,r);
    if (inside1 || inside2) return true;

    // get length of the line
    let distX = x1 - x2;
    let distY = y1 - y2;
    let len = Math.sqrt( (distX*distX) + (distY*distY) );

    // get dot product of the line and circle
    let dot = ( ((cx-x1)*(x2-x1)) + ((cy-y1)*(y2-y1)) ) / Math.pow(len,2);

    // find the closest point on the line
    let closestX = x1 + (dot * (x2-x1));
    let closestY = y1 + (dot * (y2-y1));

    // is this point actually on the line segment?
    // if so keep going, but if not, return false
    let onSegment = linePoint(x1,y1,x2,y2, closestX,closestY);
    if (!onSegment) { return false}//drawCircle(closestX, closestY, 2, "#FF0"); return false; }


    // get distance to closest point
    distX = closestX - cx;
    distY = closestY - cy;
    let distance = Math.sqrt( (distX*distX) + (distY*distY) );

    if (distance <= r) {
    return true;
    }
    return false;
    }
function pointCircle( px,  py,  cx,  cy,  r) {

// get distance between the point and circle's center
// using the Pythagorean Theorem
let distX = px - cx;
let distY = py - cy;
let distance = Math.sqrt( (distX*distX) + (distY*distY) );

// if the distance is less than the circle's
// radius the point is inside!
if (distance <= r) {
return true;
}
return false;
}

function linePoint( x1,  y1,  x2,  y2,  px,  py) {

    // get distance from the point to the two ends of the line
    let d1 = distance([px,py], [x1,y1]);
    let d2 = distance([px,py], [x2,y2]);

    // get the length of the line
    let lineLen = distance([x1,y1], [x2,y2]);

    // since floats are so minutely accurate, add
    // a little buffer zone that will give collision
    let buffer = 0.2;    // higher # = less accurate

    // if the two distances are equal to the line's
    // length, the point is on the line!
    // note we use the buffer here to give a range,
    // rather than one #
    if (d1+d2 >= lineLen-buffer && d1+d2 <= lineLen+buffer) {
    return true;
    }
return false;
}
function  circleRect( cx,  cy,  radius,  rx,  ry,  rw,  rh) {

// temporary variables to set edges for testing
testX = cx;
testY = cy;

// which edge is closest?
if (cx < rx)         testX = rx;      // test left edge
else if (cx > rx+rw) testX = rx+rw;   // right edge
if (cy < ry)         testY = ry;      // top edge
else if (cy > ry+rh) testY = ry+rh;   // bottom edge

// get distance from closest edges
distX = cx-testX;
distY = cy-testY;
dist = Math.sqrt( (distX*distX) + (distY*distY) );

// if the distance is less than the radius, collision!
if (dist <= radius) {
return true;
}
return false;
}
