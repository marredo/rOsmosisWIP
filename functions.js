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
let containerDims = [800, 600]

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

function windowResized() {
  resizeCanvas(graphicsWrapper.offsetWidth, graphicsWrapper.offsetHeight);
}

function relativeSize() {
  return graphicsWrapper.offsetWidth / containerDims[0];
}

function handleScaling() {
  window.width = containerDims[0];
  window.height = containerDims[1];
  window.mouseX = mX;
  window.mouseY = mY;
  scale(relativeSize());
}

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
  graphicsWrapper.style.maxWidth = `calc(calc(100vh - 190px) * ${containerDims[0]} / ${containerDims[1]})`;
  graphicsWrapper.style.height = `calc(calc(100vw - 40px) * ${containerDims[1]} / ${containerDims[0]})`;
  graphicsWrapper.style.maxHeight = `calc(100vh - 190px)`;
  windowResized();
}