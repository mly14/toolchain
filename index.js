var screen = 0;
var x;
var y;
var speed = 1;
var score = 0;
//create a variable for the color picker
var colorPicker;
// Random Ball Placement
var xBall = Math.floor(Math.random() * 300) + 50;
var yBall = 50;
var xSpeed = (2, 7);
var ySpeed = (-7, -2);
var score = 0;
let sound;

function preload() {
  soundFormats("mp3", "wav");
  game_over_sound = loadSound("./assets/game_over.mp3");
  bounce_sound = loadSound("./assets/bounce.wav");
}

function fixedCanvas(width, height) {
  resizeCanvas(width, height);
  const style = canvas.style;
  const amt = "90%";
  if (innerWidth / innerHeight > width / height) {
    style.width = "auto";
    style.height = amt;
  } else {
    style.height = "auto";
    style.width = amt;
  }
  style.top = style.left = style.bottom = style.right = "0";
  style.position = "absolute";
  style.margin = "auto";
}

// Create a new canvas to the browser size
function setup() {
  createCanvas(windowWidth, windowHeight);
  fixedCanvas(400, 400);
}

function draw() {
  // Display the contents of the current screen
  if (screen == 0) {
    startScreen();
    sound = true;
  } else if (screen == 1) {
    gameOn();
    // if the screen variable was changed to 2, show the game over screen
  } else if (screen == 2) {
    gameOver();
  }
}

function mousePressed() {
  if (screen == 0) {
    screen = 1;
  } else if (screen == 1) {
    if (mouseX > x && mouseX < x + 50 && mouseY > y && mouseY < y + 50) {
      if (colorPicker == 0) {
        screen = 2;
      } else {
        score += 1;
        speed += 0.05;
      }
    }
  } else if (screen == 2) {
    screen = 0;
    xBall = Math.floor(Math.random() * 300) + 50;
    yBall = 50;
    xSpeed = (2, 7);
    ySpeed = (-7, -2);
    score = 0;
  }
}

function startScreen() {
  background("#e4f1f7");
  fill("black");
  textSize(32);
  textAlign(CENTER);
  textLeading(45);
  text("Bounce Game!!", width / 2, height / 2);
  textSize(18);
  text("click to start", width / 2, height / 2 + 20);
  reset();
}

function gameOn() {
  background(0);

  // Paddle
  fill("#ffffff");
  rect(mouseX, 375, 90, 15);

  //Functions
  move();
  display();
  bounce();
  resetBall();
  paddle();

  //Score
  fill("white");
  textSize(24);
  text("Score: " + score, 100, 25);

  // Ball Functions
  function move() {
    xBall += xSpeed;
    yBall += ySpeed;
  }

  function bounce() {
    if (xBall < 10 || xBall > 400 - 10) {
      xSpeed *= -1;
      bounce_sound.play();
    }
    if (yBall < 10 || yBall > 400 - 10) {
      ySpeed *= -1;
      bounce_sound.play();
    }
  }

  // Reset Ball
  function resetBall() {
    if (yBall >= 400 || yBall > 400 - 10) {
      ySpeed = 0;
      yBall = 400;
      xSpeed = 0;
      screen = 2;
    }
  }

  function display() {
    fill("#f7dd8f");
    ellipse(xBall, yBall, 20, 20);
  }

  // Bounce off Paddle
  function paddle() {
    if (xBall > mouseX && xBall < mouseX + 90 && yBall + 10 >= 375) {
      xSpeed *= -1;
      ySpeed *= -1;
      score++;
      bounce_sound.play();
    }
  }
}

function gameOver() {
  if (sound == true) {
    game_over_sound.play();
    sound = false;
  }
  background("#fce6e6");
  fill("black");
  textAlign(CENTER);
  textSize(32);
  textLeading(45);
  text("Game over :(", width / 2, height / 2);
  textSize(18);
  text("SCORE = " + score, width / 2, height / 2 + 20);
  text("click to play again", width / 2, height / 2 + 40);
}

function reset() {
  score = 0;
  speed = 1;
}
