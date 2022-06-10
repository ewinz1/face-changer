// canvas details + 2d context
let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 800;

// Global Variables:

// 1. shapes

// rectangles
let eyerect1 = {
    x: 100,
    y: 200,
    w: 200,
    h: 100,
    color: "pink",
}

let eyerect2 = {
    x: 500,
    y: 200,
    w: 200,
    h: 100,
    color: "pink",
}

// circle 

let mouthcirc1 = {
    x: 400,
    y: 500,
    r: 70,
    color: "yellow",
}

let pupil1 = {
    x: 200,
    y: 250,
    r: 40,
    color: "pink",
}

let pupil2 = {
    x: 600,
    y: 250,
    r: 40,
    color: "pink",
}

// distance variable
let d;

// mouse variables 
let mouseX, mouseY;

// shape states
let circ1state = 1;
let rectstate1 = 1;
let rectstate2 = 1;

// Main Mouse events
document.addEventListener("mousedown", mousedownHandler);
document.addEventListener("mouseup", mouseupHandler);
document.addEventListener("mousemove", mousemoveHandler);

let mouseIsPressed = false;

function mousedownHandler () {
    mouseIsPressed = true;
}

function mouseupHandler () {
    mouseIsPressed = false;
}

function mousemoveHandler (event) {
    // get rectangle info about canvas location
    let cnvRect = cnv.getBoundingClientRect();

    // Calc mouse coordinates using mouse event and canvas location info
    mouseX = event.clientX - cnvRect.left;
    mouseY = event.clientY - cnvRect.top;
  
}

// draw game

requestAnimationFrame(drawShapes);

function drawShapes () {

    // background
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, cnv.width, cnv.height);

    // Rectangle 1
    ctx.fillStyle = eyerect1.color;
    ctx.fillRect(eyerect1.x, eyerect1.y, eyerect1.w, eyerect1.h);

    // Rectangle 2
    ctx.fillStyle = eyerect2.color;
    ctx.fillRect(eyerect2.x, eyerect2.y, eyerect2.w, eyerect2.h);

    // Circle
    ctx.fillStyle = mouthcirc1.color;
    ctx.beginPath();
    ctx.arc(mouthcirc1.x, mouthcirc1.y, mouthcirc1.r, 0, 2*Math.PI);
    ctx.fill();

    // pupil 1
    ctx.fillStyle = pupil1.color;
    ctx.beginPath();
    ctx.arc(pupil1.x, pupil1.y, pupil1.r, 0, 2*Math.PI);
    ctx.fill();

    // pupil 2
    ctx.fillStyle = pupil2.color;
    ctx.beginPath();
    ctx.arc(pupil2.x, pupil2.y, pupil2.r, 0, 2*Math.PI);
    ctx.fill();

     // mouse detection in rectangles

     // rectangle 1
     if (eyerect1.x <= mouseX && mouseX <= eyerect1.x + eyerect1.w &&
        eyerect1.y <= mouseY && mouseY < eyerect1.y + eyerect1.h) {
        rectstate1 = 2;
        // collision detected!
        eyerect1.color = "red";
    } else {
        rectstate1 = 1;
        // no collision
        eyerect1.color = "pink";
    }

    // rectangle 2
    if (eyerect2.x <= mouseX && mouseX <= eyerect2.x + eyerect2.w &&
        eyerect2.y <= mouseY && mouseY < eyerect2.y + eyerect2.h) {
        rectstate2 = 2;
        // collision detected!
        eyerect2.color = "red";

    } else {
        rectstate2 = 1;
        // no collision
        eyerect2.color = "pink";
    }

    // click detection in rectangles

    if (mouseIsPressed && rectstate1 === 2) {
        pupil1.color = "blue";
    
    } else if (mouseIsPressed && rectstate2 === 2) {
        pupil2.color = "blue";
    }

    // mouse detection in circle

    let d = Math.sqrt((mouseX - mouthcirc1.x)**2 + (mouseY - mouthcirc1.y)**2)

    if (d < mouthcirc1.r) {
        circ1state = 2;
    } else {
        mouthcirc1.color = "yellow";
        circ1state = 1;
    }

    // click detection in circle

    if (circ1state = 2 && d < mouthcirc1.r) {
        ctx.fillStyle = "blue";
        ctx.fillRect(350.5, 450.5, 100, 100);
    }

    requestAnimationFrame(drawShapes);
}