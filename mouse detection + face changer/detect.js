// canvas details + 2d context
let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 800;

// shapes
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


// mouse variables (global)
let mouseX, mouseY;


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



function collisionhandler (event) {
     // get rectangle info about canvas location
     let cnvRect = cnv.getBoundingClientRect();

     // Calc mouse coordinates using mouse event and canvas location info
     mouseX = event.clientX - cnvRect.left;
     mouseY = event.clientY - cnvRect.top;
 
     // mouse detection in rectangles
     if (eyerect1.x <= mouseX <= eyerect1.x + eyerect1.w &&
         eyerect1.y-eyerect1.h <= mouseY <= eyerect1.y) {
         console.log("hi")
 
         // collision detected!
         ctx.fillStyle = "red"
         ctx.fillRect(eyerect1.x, eyerect1.y, eyerect1.w, eyerect1.h);
 
 
     } else {
         // no collision
         ctx.fillStyle = eyerect1.color;
         ctx.fillRect(eyerect1.x, eyerect1.y, eyerect1.w, eyerect1.h);
     }

}

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
    ctx.arc(400, 500, 100, 0, 2*Math.PI);
    ctx.fill();

    // Ellipse
    ctx.fillStyle = "pink";
    ctx.beginPath();
    ctx.ellipse(400, 500, 40, 50, Math.PI/2, 0, 2*Math.PI);
    ctx.fill();

    requestAnimationFrame(drawShapes);
}