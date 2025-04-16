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
  background(255);
  
  // Title and parameters display
  textSize(18);
  fill(0);
  text("Reverse Osmosis Visualization", 20, 30);
  textSize(16);
  text(`Feed Pressure: ${g.feedPressure.toFixed(1)} bar`, 20, 60);
  text(`Salt Concentration: ${g.saltConc.toFixed(2)}%`, 20, 85);
  text(`Feed Temp: ${g.feedTemp} °C`, 20, 110);

  // Draw pipe first so it appears behind everything
  drawPipeAndPump(100, 250);
  // Draw tank last so it appears on top
  drawSaltTank(100, 250);
}

function drawSaltTank(x, y) {
  // Tank outline
  stroke(0);
  strokeWeight(2);
  noFill();
  rect(x, y, 100, 150, 15);
  
  // Fill with solid light blue solution (removed transparency)
  fill(220, 230, 255);  // Removed the alpha value to make it solid
  noStroke();
  rect(x, y, 100, 150, 15);
  
  // Add text
  fill(0);
  textSize(20);
  textAlign(CENTER);
  text("Salt", x + 50, y + 60);
  text("Solution", x + 50, y + 85);
  
  textAlign(LEFT);
}

function drawPipeAndPump(tankX, tankY) {
  // Calculate pipe start position
  let pipeStartX = tankX + 100;
  let pipeY = tankY + 75;
  
  // Draw pressure gauge base (behind pipe)
  let gaugeX = tankX + 260;  // Positioned right after pump
  fill(150);  // Same gray as pump
  noStroke();
  rect(gaugeX + 7, pipeY - 25, 10, 20);  // Small rectangle poking up behind pipe
  
  // Add thin centered rectangle behind gauge
  rect(gaugeX - 2, pipeY - 10, 29, 10);  // Slightly wider and thinner rectangle
  
  // Draw circle above the T structure
  circle(gaugeX + 12, pipeY - 28, 30);  // Centered above the T structure

  fill(255);  // White color
circle(gaugeX + 12, pipeY - 28, 22);  // Same center, slightly smaller diameter

// Add red dot at bottom of gauge and needle
fill(255, 0, 0);  // Red color
circle(gaugeX + 12, pipeY - 22, 4);  // Small red circle near bottom

// Add gauge needle from red dot at 45 degrees left
stroke(255, 0, 0);  // Red color
strokeWeight(1);  // Thin line
let needleLength = 9;  // Shorter needle
let endX = gaugeX + 12 - (needleLength * Math.cos(Math.PI/4));  // 45 degrees left
let endY = pipeY - 22 - (needleLength * Math.sin(Math.PI/4));
line(gaugeX + 12, pipeY - 22, endX, endY);  // Line at 45 degrees

// Reset stroke for pipe
noStroke();
  
  // Draw horizontal pipe
  stroke(100);
  strokeWeight(8);
  line(pipeStartX, pipeY, pipeStartX + 350, pipeY);
  
  // Draw pump
  let pumpX = tankX + 150;
  
  // T-valve (drawn first so it appears behind)
  stroke(0);
  strokeWeight(2);
  fill(0);
  rect(pumpX + 25, pipeY - 35, 10, 25);
  rect(pumpX + 15, pipeY - 35, 30, 8);
  
  // Pump body as wider rounded rectangle
  fill(150);
  stroke(0);
  strokeWeight(2);
  rect(pumpX - 5, pipeY - 20, 70, 40, 5);
  
  // Add "Pump" label
  noStroke();
  fill(0);
  textSize(16);
  textAlign(CENTER);
  text("Pump", pumpX + 30, pipeY - 45);
  
  textAlign(LEFT);

  // Add white rounded rectangle to right of gauge
  stroke(0);  // Black outline
  strokeWeight(1);
  fill(255);  // White fill
  rect(gaugeX + 75, pipeY - 35, 250, 70, 8);  // Centered vertically on pipe
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