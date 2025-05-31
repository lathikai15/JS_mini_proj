const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessage = document.getElementById('winningMessage');
const messageText = document.getElementById('messageText');
const restartBtn = document.getElementById('restartBtn');

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

let isCircleTurn;

startGame();

restartBtn.addEventListener('click', startGame);

function startGame() {
  isCircleTurn = false;
  cells.forEach(cell => {
    cell.classList.remove('x', 'o');
    cell.innerText = '';
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
  board.classList.remove('x', 'o');
  winningMessage.classList.add('d-none');
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = isCircleTurn ? 'o' : 'x';
  placeMark(cell, currentClass);

  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    isCircleTurn = !isCircleTurn;
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
  cell.innerText = currentClass.toUpperCase();
}

function endGame(draw) {
  messageText.innerText = draw ? "It's a Draw!" : `${isCircleTurn ? "O" : "X"} Wins!`;
  winningMessage.classList.remove('d-none');
}

function isDraw() {
  return [...cells].every(cell =>
    cell.classList.contains('x') || cell.classList.contains('o')
  );
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination =>
    combination.every(index => cells[index].classList.contains(currentClass))
  );
}
