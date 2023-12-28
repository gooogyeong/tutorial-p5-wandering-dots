const NUM_CIRCLES = 16;
const FLOAT_SPEED = 1;
const TRANSITION_SPEED = 0.05;
const CIRCLE_SIZE_DIVISIOR = 25;

let circles = [];
let float = true;
let circleSize;

function setup() {
  createCanvas(windowWidth, windowHeight); // equivalent to 100vw, 100vh 
  noStroke(); // remove border from circles
  
  circleSize = width / CIRCLE_SIZE_DIVISIOR;
  
  for (let i = 0; i < NUM_CIRCLES; i++) {
    const circle = {
      x: random(circleSize / 2, width - circleSize / 2),
      y: random(circleSize / 2, height - circleSize / 2),
      speedX: random(-FLOAT_SPEED, FLOAT_SPEED),
      speedY: random(-FLOAT_SPEED, FLOAT_SPEED),
      targetX: null,
      targetY: null
    }
    circles.push(circle)
  }
}

function draw() {
  // paints the background; clears background each frame
  background(30);
  
  for (let i = 0; i < circles.length; i++) {
    const circle = circles[i]
    
    if (float) {
      // update circle's position based on its speed
      circle.x += circle.speedX;
      circle.y += circle.speedY;
      
      // check for collisions with the edges and reverse direction
      if (circle.x < 0 + circleSize / 2 || circle.x > width - circleSize / 2) {
       circle.speedX = circle.speedX * -1
      }
      if (circle.y < 0 + circleSize / 2 || circle.y > height - circleSize / 2) {
       circle.speedY = circle.speedY * -1
      }
    } else {
      let spacing = width / NUM_CIRCLES;
      
      circle.targetX = i * spacing + circleSize * 0.75;
      circle.targetY = height / 2
      
      // animate the transition to the target positions
      circle.x = lerp(circle.x, circle.targetX, TRANSITION_SPEED)
      circle.y = lerp(circle.y, circle.targetY, TRANSITION_SPEED)
    }
    
    // draw a circle at the updated position
    ellipse(circle.x, circle.y, circleSize, circleSize)
  }
}

// p5 fires this functimon everytime we scroll
function mouseWheel() {
  float = false
}

// p5 fires this function on every click
function mouseClicked () {
  float = !float
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}