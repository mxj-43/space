let stars = []; // Array to store star positions and sizes
let planets = []; // Array to store planet positions, sizes, and speeds
let rocketX = -100; // Initial x position of the rocket
let ufoX = 0; // Initial x position of the UFO
let ufoY = 100; // Initial y position of the UFO
let ufoDirection = 1; // Direction of the UFO's vertical movement
let moonAngle = 0; // Angle for moon rotation

function setup() {
  createCanvas(windowWidth, windowHeight); // Create a canvas that fills the window
  background(0); // Set the background to black
  noStroke(); // Disable outlines for the stars

  // Initialize stars with random positions and sizes
  for (let i = 0; i < 100; i++) {
    stars.push({
      x: random(width), // Random x position
      y: random(height), // Random y position
      size: random(1, 4), // Random size for the star
      speedX: random(-1, 1), // Random horizontal speed
      speedY: random(-1, 1) // Random vertical speed
    });
  }

  // Initialize planets with random positions, sizes, and speeds
  for (let i = 0; i < 5; i++) { // Add 5 planets
    planets.push({
      x: random(width), // Random x position
      y: random(height), // Random y position
      size: random(30, 60), // Random size for the planet
      speedX: random(-2, 2), // Random horizontal speed
      speedY: random(-2, 2), // Random vertical speed
      color: color(random(100, 255), random(100, 255), random(100, 255)) // Random color
    });
  }
}

function draw() {
  background(0); // Clear the frame with a black background

  // Draw and update stars
  fill(255); // Set the fill color to white
  for (let star of stars) {
    ellipse(star.x, star.y, star.size, star.size); // Draw the star
    star.x += star.speedX; // Update x position
    star.y += star.speedY; // Update y position

    // Wrap stars around the edges of the canvas
    if (star.x < 0) star.x = width;
    if (star.x > width) star.x = 0;
    if (star.y < 0) star.y = height;
    if (star.y > height) star.y = 0;
  }

  // Draw and update planets
  for (let planet of planets) {
    fill(planet.color); // Set the fill color to the planet's color
    ellipse(planet.x, planet.y, planet.size, planet.size); // Draw the planet
    planet.x += planet.speedX; // Update x position
    planet.y += planet.speedY; // Update y position

    // Wrap planets around the edges of the canvas
    if (planet.x < 0) planet.x = width;
    if (planet.x > width) planet.x = 0;
    if (planet.y < 0) planet.y = height;
    if (planet.y > height) planet.y = 0;
  }

  // Draw Jupiter in the bottom-left corner (adjusted position)
  noStroke(); // Remove the outline for Jupiter
  fill(210, 105, 30); // Reddish-brown color for Jupiter
  ellipse(200, height - 150, 200, 200); // Jupiter's position and size

  // Draw Jupiter's rings (adjusted position)
  noFill();
  stroke(200, 200, 200, 150); // Light gray color with transparency for the rings
  strokeWeight(2);
  ellipse(200, height - 150, 250, 70); // Outer ring
  ellipse(200, height - 150, 230, 60); // Inner ring

  // Draw the moon in the lower-left corner (adjusted position)
  push(); // Save the current transformation state
  translate(width - 250, 200); // Move to the moon's new position (slightly to the left)
  rotate(moonAngle); // Rotate the moon
  noStroke();
  fill(220, 220, 220); // Light gray color for the moon
  ellipse(0, 0, 180, 180); // Draw the moon at the origin

  // Add darker circles and ovals inside the moon
  fill(180, 180, 180); // Darker gray color
  ellipse(-20, -10, 30, 30); // Small circle
  ellipse(20, 10, 40, 20); // Oval
  ellipse(0, 30, 35, 35); // Another small circle
  ellipse(-10, -30, 20, 15); // Small oval

  // Add darker circles and ovals near the edges of the moon
  ellipse(-40, 10, 20, 20); // Small circle on the left edge
  ellipse(40, -10, 25, 15); // Oval on the right edge
  ellipse(0, -30, 22, 16); // Oval on the top edge
  ellipse(-20, 50, 15, 10); // Small oval on the bottom-left edge
  ellipse(20, 50, 18, 18); // Small circle on the bottom-right edge
  pop(); // Restore the previous transformation state

  // Update the moon's rotation angle
  moonAngle += 0.01; // Adjust the speed of rotation

  // Draw the rocket
  drawRocket(rocketX, height / 2);

  // Update the rocket's position
  rocketX += 8; // Increased speed (was 5 before)
  if (rocketX > width + 100) {
    rocketX = -100; // Reset the rocket's position when it goes off-screen
  }

  // Draw the UFO
  drawUFO(ufoX, ufoY);

  // Update the UFO's position for zig-zag movement
  ufoX += 4; // Move the UFO to the right
  ufoY += ufoDirection * 3; // Zig-zag movement (up and down)

  // Reverse direction when hitting vertical bounds
  if (ufoY > height - 50 || ufoY < 50) {
    ufoDirection *= -1; // Reverse vertical direction
  }

  // Reset the UFO's position when it moves off-screen
  if (ufoX > width + 100) {
    ufoX = -100; // Reset to the left of the screen
    ufoY = random(50, height - 50); // Start at a random vertical position
  }
}

function drawRocket(x, y) {
  // Set the outline color to black
  stroke(0); // Black outline
  strokeWeight(2); // Set the outline thickness

  // Draw the rocket body
  fill(200); // Light grey color for the rocket body
  rect(x, y - 20, 60, 40); // Rocket body

  // Draw the rocket nose (dark grey tip)
  fill(100); // Dark grey color for the rocket tip
  triangle(x + 60, y - 20, x + 60, y + 20, x + 80, y); // Rocket nose

  // Draw the square door
  fill(50); // Darker grey color for the door
  rect(x + 15, y - 10, 15, 20); // Small square door

  // Draw the fire behind the rocket
  fill(255, 100, 0); // Orange fire
  ellipse(x - 10, y, 20, random(30, 50)); // Flickering fire effect
  fill(255, 200, 0); // Yellow fire
  ellipse(x - 20, y, 10, random(20, 40)); // Flickering fire effect
}

function drawUFO(x, y) {
  // Set the outline color to black
  stroke(0); // Black outline
  strokeWeight(2); // Set the outline thickness

  // Draw the UFO body
  fill(128, 0, 128); // Purple color for the UFO body
  ellipse(x, y, 100, 50); // UFO body

  // Draw the UFO dome
  fill(255, 182, 193); // Pink color for the dome
  ellipse(x, y - 15, 60, 40); // Dome positioned on top of the body

  // Draw the antenna base
  fill(128, 0, 128); // Purple color for the antenna base
  ellipse(x, y - 40, 10, 10); // Small circle for the antenna base

  // Draw the antenna stick
  stroke(255, 182, 193); // Pink color for the antenna stick
  strokeWeight(2);
  line(x, y - 40, x, y - 60); // Line for the antenna stick

  // Draw the antenna tip
  noStroke(); // Remove outline for the antenna tip
  fill(255, 182, 193); // Pink color for the antenna tip
  ellipse(x, y - 60, 8, 8); // Small circle for the antenna tip
}










