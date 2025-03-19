/* 
  Basic placeholders for a p5.js canvas and simple 
  calculation stubs for demonstration.
  Expand or replace these with actual RO logic.
*/

let g = {
  feedPressure: 10,
  saltConc: 0.5,
  feedTemp: 15
};

let graphicsWrapper = document.getElementById("graphics-wrapper");

// This is the size of the canvas. I set it to 800x600, but it could
// be any arbitrary height and width.
let containerDims = [800, 600];

function setup() {
  // Create the p5.js canvas inside #graphics-wrapper
  createCanvas(graphicsWrapper.offsetWidth, graphicsWrapper.offsetHeight).parent(graphicsWrapper);
  handleCanvasSize();
  handleMouseScaling();
}

function draw() {
  handleScaling();
  background(245);
  textSize(18);
  fill(0);
  text("Reverse Osmosis Visualization", 20, 30);

  textSize(14);
  text("Feed Pressure: " + g.feedPressure.toFixed(1) + " bar", 20, 60);
  text("Salt Concentration: " + g.saltConc.toFixed(2) + "%", 20, 80);
  text("Feed Temp: " + g.feedTemp.toFixed(0) + " °C", 20, 100);

  // Here you would draw your membrane, streams, or other visual elements
}

/* Optionally add more complex math or animations here */

// When the window is resized, this changes the canvas size
// To match the size of the graphics-wrapper element.
function windowResized() {
  resizeCanvas(graphicsWrapper.offsetWidth, graphicsWrapper.offsetHeight);
}

// This is used to calculate how large the canvas is compared to what
// you state in containerDims. For example, if the canvas is 1600x1200 px
// on the screen and canvasDims[0] is 800, then this will return 2. It is
// used to scale the canvas and mouse coordinates correctly.
function relativeSize() {
  return graphicsWrapper.offsetWidth / containerDims[0];
}

// This function scales the image to fit the graphics wrapper element.
// Don't touch this.
function handleScaling() {
  window.width = containerDims[0];
  window.height = containerDims[1];
  window.mouseX = mX;
  window.mouseY = mY;
  scale(relativeSize());
}

// If you want to use mouseX and mouseY for whatever reason,
// this function corrects for the fact that the canvas scales in size.
// Don't touch this.
function handleMouseScaling() {
  document.querySelector("canvas").addEventListener("mousemove", (e) => {
    let rect = graphicsWrapper.getBoundingClientRect();
    let mX = e.clientX - rect.left;
    let mY = e.clientY - rect.top;

    // Scale mouse coordinates to match the canvas size
    window.mX = mX / relativeSize();
    window.mY = mY / relativeSize();
  });

  window.mX = 0;
  window.mY = 0;
}

function handleCanvasSize() {
  graphicsWrapper.style.width = "calc(100vw - 40px)";
  // When you remove the "Currently work in progress" element,
  // change 190px to 135px in the two statements below.
  graphicsWrapper.style.maxWidth = `calc(calc(100vh - 190px) * ${containerDims[0]} / ${containerDims[1]})`;
  graphicsWrapper.style.height = `calc(calc(100vw - 40px) * ${containerDims[1]} / ${containerDims[0]})`;
  graphicsWrapper.style.maxHeight = `calc(100vh - 190px)`;
  windowResized();
}