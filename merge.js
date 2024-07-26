
const canvas = document.getElementById("algorithmCanvas");
canvas.width = 1500;
canvas.height = 500;
const ctx = canvas.getContext("2d");


//BANGER IDEA:

//use a color palette to color based on the size of the integer, then use that to draw with different colors
const returnRGBA = (c, a) => {
    return `rgba(${c[0]},${c[1]},${c[2]},${a})`
}

const colorPalette = (v) => (returnRGBA([
    
    Math.floor(255*(  0.5+0.5*Math.cos(v)              )),
    Math.floor(255*(  0.5+0.5*Math.cos(v+Math.PI*2/3)  )),
    Math.floor(255*(  0.5+0.5*Math.cos(v+Math.PI*4/3)  ))
    
]
,1));

//merge sort
//this is probably my first time using proper comments and formatting in a while

//list to be sorted

let dt1 = 50;
let dt2 = 200;
let maxDisplayY = 20;
let maxDisplayT = 20;
let colorStartingPoint = 2;
let round = 0;

function runAlgorithm() {
    round+=1
colorStartingPoint = 2*Math.PI*Math.random();
ctx.clearRect(0,0,canvas.width,canvas.height);
maxDisplayY = 20;
maxDisplayT = 0;
let a = [];

//adding elements
let numListElements = Math.floor(Math.random()*35);
for (let i = 0; i<numListElements; i++) {
    a.push(Math.floor(Math.random()*100));
}

mergeSort(a, 750, 20, 20)

}


//auxillary function
const swap = (a, b) => {
    let temp = b;
    b = a;
    a = temp;
}

//sorting algorithm


//process is as follows:

//splitting step-
// [X] (this causes redundancy) -> ###if there are two or less elements in a list, return the list, sorting by swapping if needed###

//if there is more than one element in the list, split it into two smaller lists of equal size, or with a difference of 1 in # of elements


const displayArray = (arr, x, y) => {
    ctx.fillStyle="#000";
    ctx.fillRect(x-10*(arr.length)-3, y, 20*(arr.length)+2, 20);

    
    ctx.font = "12px arial"

    
    for (let i = 0; i<arr.length; i++) {
        ctx.fillStyle=colorPalette(0.75*Math.PI*Math.pow(arr[i], 1.1)/100+colorStartingPoint)
        ctx.fillRect(x-10*(arr.length)+20*i-1, y+2, 18, 16);
        //ctx.fillStyle =colorPalette(0.75*Math.PI*Math.pow(arr[i], 1.1)/100+colorStartingPoint+3.14)
        ctx.fillStyle="#000";
        ctx.fillText(arr[i], x-10*(arr.length-0.25)+20*i, y+15);
    }
}

const merge = (nonDecreasingListA, nonDecreasingListB, x, y, t) => {
    let i = 0;
    let j = 0;
    let r = [];
    while (i<nonDecreasingListA.length && j<nonDecreasingListB.length) {
        if (nonDecreasingListA[i]<nonDecreasingListB[j]) {
            r.push(nonDecreasingListA[i]);
            i+=1;
        } else {
            r.push(nonDecreasingListB[j]);
            j+=1;
        }
    }
    r = (i>=nonDecreasingListA.length) ? r.concat(nonDecreasingListB.splice(j)) : r.concat(nonDecreasingListA.splice(i));

    let dR = r.slice();
    let currentRound = round;
    setTimeout(function() {
        if (round==currentRound) {
        displayArray(dR, x, maxDisplayY*2+10-y);
        }
    }, maxDisplayT*3-t)
    
    return r;
}
    
//merging step-

//(after all elements in each sublist are composed of one element)

//compare the first element of the first list with the first element of the second list; construct a new list by repeatedly pushing
//the smallest element into a new list, then return that list

const mergeSort = (l, x, y, t) => {
    let len = l.length;


    if (y>maxDisplayY) maxDisplayY = y;
    if (t>maxDisplayT) maxDisplayT = t;
    let dL = l.slice();
    let currentRound = round;
    setTimeout(function() {
        if (round==currentRound) {
        displayArray(dL, x, y);
        }
    }, t)

    
    if (len<=1) return l;
        return merge(mergeSort(l.slice(0, Math.floor(len/2)), x-10*(len-0.5), y+25, t+dt1), mergeSort(l.slice(Math.floor(len/2),len), x+10*(len-0.5), y+25, t+dt1), x, y, t+dt2);

}

runAlgorithm()