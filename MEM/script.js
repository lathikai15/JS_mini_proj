// script.js

const gameBoard = document.getElementById('game-board');
const message = document.getElementById('message');

const cards = [
  'A', 'A', 'B', 'B', 'C', 'C', 'D', 'D',
  'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'
];

// Shuffle cards
function shuffleCards(cards) {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
}

// Create game board
function createBoard() {
  shuffleCards(cards);

  cards.forEach(card => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.card = card;
    cardElement.textContent = ''; // Initially empty
    gameBoard.appendChild(cardElement);
  });
}

// Game variables
let flippedCards = [];
let matchedCards = [];
let lockBoard = false;

// Flip card function
function flipCard() {
  if (lockBoard || flippedCards.includes(this)) return;

  this.classList.add('flipped');
  this.textContent = this.dataset.card;
  flippedCards.push(this);

  // Check for match
  if (flippedCards.length === 2) {
    lockBoard = true;
    if (flippedCards[0].dataset.card === flippedCards[1].dataset.card) {
      flippedCards.forEach(card => card.classList.add('matched'));
      matchedCards.push(...flippedCards);
      flippedCards = [];
      lockBoard = false;
      if (matchedCards.length === cards.length) {
        message.textContent = 'You won! 🎉';
      }
    } else {
      setTimeout(() => {
        flippedCards.forEach(card => {
          card.classList.remove('flipped');
          card.textContent = '';
        });
        flippedCards = [];
        lockBoard = false;
      }, 1000);
    }
  }
}

// Set up the game
createBoard();
gameBoard.addEventListener('click', function(event) {
  if (event.target.classList.contains('card')) {
    flipCard.call(event.target);
  }
});
