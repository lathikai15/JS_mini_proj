// Game setup
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreElement = document.getElementById("score");
const startBtn = document.getElementById("startBtn");
const gameOverMessage = document.getElementById("gameOverMessage");
const finalScoreElement = document.getElementById("finalScore");
const restartBtn = document.getElementById("restartBtn");

const snakeSize = 10;
let snake;
let food;
let direction;
let score;
let gameInterval;

// Directions
const UP = { x: 0, y: -snakeSize };
const DOWN = { x: 0, y: snakeSize };
const LEFT = { x: -snakeSize, y: 0 };
const RIGHT = { x: snakeSize, y: 0 };

// Main game loop
function startGame() {
    score = 0;
    snake = [{ x: 150, y: 150 }];
    direction = RIGHT;
    generateFood();
    scoreElement.textContent = score;
    gameInterval = setInterval(gameLoop, 200);  // Increased to 200ms (slower speed)
    startBtn.classList.add("d-none");
    gameOverMessage.classList.add("d-none");
    window.addEventListener("keydown", changeDirection);
  }
  

// Main game loop
function gameLoop() {
  moveSnake();
  if (checkCollision()) {
    endGame();
  } else {
    if (eatFood()) {
      score++;
      scoreElement.textContent = score;
      generateFood();
    }
    drawGame();
  }
}

// Draw the game on the canvas
function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw snake
  ctx.fillStyle = "#28a745";
  snake.forEach((segment) => {
    ctx.fillRect(segment.x, segment.y, snakeSize, snakeSize);
  });

  // Draw food
  ctx.fillStyle = "#dc3545";
  ctx.fillRect(food.x, food.y, snakeSize, snakeSize);
}

// Move the snake
function moveSnake() {
  const newHead = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
  snake.unshift(newHead);
  snake.pop();
}

// Change snake direction
function changeDirection(event) {
  if (event.key === "ArrowUp" && direction !== DOWN) {
    direction = UP;
  } else if (event.key === "ArrowDown" && direction !== UP) {
    direction = DOWN;
  } else if (event.key === "ArrowLeft" && direction !== RIGHT) {
    direction = LEFT;
  } else if (event.key === "ArrowRight" && direction !== LEFT) {
    direction = RIGHT;
  }
}

// Generate food at random position
function generateFood() {
  food = {
    x: Math.floor(Math.random() * (canvas.width / snakeSize)) * snakeSize,
    y: Math.floor(Math.random() * (canvas.height / snakeSize)) * snakeSize,
  };
}

// Check if the snake eats food
function eatFood() {
  return snake[0].x === food.x && snake[0].y === food.y;
}

// Check if the snake collides with itself or the wall
function checkCollision() {
  // Wall collision
  if (
    snake[0].x < 0 ||
    snake[0].x >= canvas.width ||
    snake[0].y < 0 ||
    snake[0].y >= canvas.height
  ) {
    return true;
  }
  // Self collision
  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
      return true;
    }
  }
  return false;
}

// End the game
function endGame() {
  clearInterval(gameInterval);
  finalScoreElement.textContent = score;
  gameOverMessage.classList.remove("d-none");
  startBtn.classList.remove("d-none");
}

// Restart the game
restartBtn.addEventListener("click", () => {
  startGame();
});

// Start the game on click of Start button
startBtn.addEventListener("click", startGame);
