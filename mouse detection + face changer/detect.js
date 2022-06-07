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

    // circle management

    if (mouseIsPressed && circ1state === 1) {
        circ1state = 2;

    } else if (mouseIsPressed && circ1state === 2){
        circ1state = 1;
    }

    // rectangle management

    if (mouseIsPressed && rectstate1 === 1) {
        rectstate1 = 2;

    } else if (mouseIsPressed && rectstate1 === 2) {
        rectstate1 = 1;
    }

    if (mouseIsPressed && rectstate2 === 1) {
        rectstate2 = 2;

    } else if (mouseIsPressed && rectstate2 === 2) {
        rectstate2 = 1;
    }

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
    ctx.fillStyle = "lightgreen";
    ctx.beginPath();
    ctx.arc(mouthcirc1.x, mouthcirc1.y, mouthcirc1.r, 0, 2*Math.PI);
    ctx.fill();

     // mouse detection in rectangles

     // rectangle 1
     if (eyerect1.x <= mouseX && mouseX <= eyerect1.x + eyerect1.w &&
        eyerect1.y <= mouseY && mouseY < eyerect1.y + eyerect1.h) {

        rectstate1 = 2;

        // collision detected!
        ctx.fillStyle = "red"
        ctx.fillRect(eyerect1.x, eyerect1.y, eyerect1.w, eyerect1.h);


    } else {
        
        rectstate1 = 1;

        // no collision
        ctx.fillStyle = eyerect1.color;
        ctx.fillRect(eyerect1.x, eyerect1.y, eyerect1.w, eyerect1.h);
    }

    // rectangle 2
    if (eyerect2.x <= mouseX && mouseX <= eyerect2.x + eyerect2.w &&
        eyerect2.y <= mouseY && mouseY < eyerect2.y + eyerect2.h) {

        rectstate2 = 2;

        // collision detected!
        ctx.fillStyle = "red"
        ctx.fillRect(eyerect2.x, eyerect2.y, eyerect2.w, eyerect2.h);

    } else {

        rectstate2 = 1;

        // no collision
        ctx.fillStyle = eyerect2.color;
        ctx.fillRect(eyerect2.x, eyerect2.y, eyerect2.w, eyerect2.h);
    }

    // click detection in rectangles

    if (mouseIsPressed && rectstate1 === 2) {
        ctx.fillStyle = "blue";
        ctx.beginPath();
        ctx.arc(200, 250, 40, 0, 2*Math.PI);
        ctx.fill();

    } else if (mouseIsPressed && rectstate2 === 2) {
        ctx.fillStyle = "blue";
        ctx.beginPath();
        ctx.arc(600, 250, 40, 0, 2*Math.PI);
        ctx.fill();
    }


    // mouse detection in circle

    var x1 = mouthcirc1.x;
    var y1 = mouthcirc1.y;
    let d = Math.sqrt((mouseX - x1)**2 + (mouseY - y1)**2)

    if (d < mouthcirc1.r) {
        ctx.fillStyle = "green";
        ctx.beginPath();
        ctx.arc(mouthcirc1.x, mouthcirc1.y, mouthcirc1.r, 0, 2*Math.PI);
        ctx.fill();
    } else {
        ctx.fillStyle = "yellow";
        ctx.beginPath();
        ctx.arc(mouthcirc1.x, mouthcirc1.y, mouthcirc1.r, 0, 2*Math.PI);
        ctx.fill();
    }

    // click detection in circle

    if (circ1state === 2 && d < mouthcirc1.r) {
        ctx.fillStyle = "blue";
        ctx.fillRect(350.5, 450.5, 100, 100);
        console.log("this is broken");

    } else {
        ctx.fillStyle = "lightgreen";
        ctx.beginPath();
        ctx.arc(mouthcirc1.x, mouthcirc1.y, mouthcirc1.r, 0, 2*Math.PI);
        ctx.fill();


    }
    // else {
    //     ctx.fillStyle = "lightblue";
    //     ctx.beginPath();
    //     ctx.arc(mouthcirc1.x, mouthcirc1.y, mouthcirc1.r, 0, 2*Math.PI);
    //     ctx.fill();
    // }

    requestAnimationFrame(drawShapes);
}