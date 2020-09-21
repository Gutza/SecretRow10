const sin60 = 0.866;
const colorSets = [
  [ // zero colors (nonsensical, it produces errors)
  ],
  [ // one color (nonsensical, it's a static triangle)
    {r:248, g:240, b:200},
  ],
  [ // two colors
    {r:248, g:240, b:200},
    {r:50, g:40, b:20},
  ],
  [ // three colors
    {r: 143, g: 59, b: 27},
    {r: 64, g: 79, b: 36},
    {r: 78, g: 87, b: 114},
  ],
  [ // four colors
    {r: 143, g: 59, b: 27},
    {r: 64, g: 79, b: 36},
    {r: 78, g: 87, b: 114},
    {r: 102, g: 141, b: 60},
  ],
];
const colors = colorSets[3];
const canvasSize = {
  w: 800,
  h: 800*sin60,
};
const triangleSize = 42;

var currentFirstLine = [];
var currentLine = [];
var prevLine = [];

function setup() {
  createCanvas(canvasSize.w, canvasSize.h);
  frameRate(1);
}

function draw() {
  clear();
  if (currentFirstLine.length == 0) {
    let hexCount = Math.trunc(canvasSize.w/triangleSize/(2*sin60));
    for (let i = 0; i<hexCount; i++) {
      let currColorIndex = Math.trunc(random(colors.length));
      currentFirstLine.push(currColorIndex);
    }
  } else {
    if (colors.length>1) { // infinte loop if the palette is too small
      let changeIndex = Math.trunc(random(currentFirstLine.length));
      let prevValue = currentFirstLine[changeIndex];
      while(prevValue == currentFirstLine[changeIndex]) {
        currentFirstLine[changeIndex] = Math.trunc(random(colors.length));
      }
    }
  }

  drawLine(currentFirstLine, 0, 0);
  prevLine = currentFirstLine;
  let currentX = 0;
  let currentY = 0;
  while(prevLine.length > 1) {
    currentLine = [];
    for(let i = 0; i<prevLine.length-1; i++) {
      currentLine.push(computeIndex(prevLine[i], prevLine[i+1]));
    }
    currentX += 2*triangleSize*sin60-triangleSize*sin60;
    currentY += triangleSize*1.5;
    drawLine(currentLine, currentX, currentY);
    prevLine = currentLine;
  }

}

computeIndex = (index1, index2) => {
  return (2*colors.length-index1-index2) % colors.length;
}

drawLine = (lineColors, startX, startY) => {
  for(let i = 0; i<lineColors.length; i++) {
    let currColorIndex = lineColors[i];
    fill(colors[currColorIndex].r, colors[currColorIndex].g, colors[currColorIndex].b);
    drawHex(startX+2*sin60*triangleSize*(i+0.5), startY+triangleSize, triangleSize);
  }
}
const centerFactor = 0.9;
drawHex = (x, y, r) => {
  stroke(255, 255, 255);
  beginShape();
  vertex(x, y+r);
  vertex(x+r*sin60, y+r/2);
  vertex(x+r*sin60, y-r/2);
  vertex(x, y-r);
  vertex(x-r*sin60, y-r/2);
  vertex(x-r*sin60, y+r/2);
  endShape();
  
  noStroke();
  fill('rgba(0,0,0, 0.5)');
  beginShape();
  vertex(x, y+r);
  vertex(x+r*sin60, y+r/2);
  vertex(x+r*sin60, y-r/2);
  vertex(x, y);
  endShape();
  
  fill('rgba(0,0,0, 0.2)');
  beginShape();
  vertex(x-r*sin60, y-r/2);
  vertex(x-r*sin60, y+r/2);
  vertex(x, y+r);
  vertex(x, y);
  endShape();

  stroke('rgba(255,255,255, 0.25)');
  line(x-(r*sin60*centerFactor), y-r/2*centerFactor, x, y);
  line(x+(r*sin60*centerFactor), y-r/2*centerFactor, x, y);
  line(x, y+r*centerFactor, x, y);

}