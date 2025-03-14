// Play Game Function
function playGame(gameName) {
  alert(`Starting ${gameName}...`);
  // Add logic to launch the game here
}

// Highlight the Middle Banner
const slides = document.querySelectorAll('.banner-slide');
const bannerContainer = document.querySelector('.banner-container');

function highlightMiddleSlide() {
  // Remove the 'active' class from all slides
  slides.forEach((slide) => {
    slide.classList.remove('active');
  });

  // Find the middle slide and add the 'active' class
  const middleIndex = Math.floor(slides.length / 2);
  slides[middleIndex].classList.add('active');
}

// Update the middle slide every 5 seconds
setInterval(highlightMiddleSlide, 5000);

// Initial highlight
highlightMiddleSlide();

// Tic Tac Toe Game Logic (Player vs AI)
let currentPlayer = 'X'; // Player is X, AI is O
let board = ['', '', '', '', '', '', '', '', ''];
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset');

// Winning Patterns
const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Handle Cell Clicks
cells.forEach(cell => {
  cell.addEventListener('click', () => {
    const index = cell.getAttribute('data-index');
    if (board[index] === '' && !checkWin(board) && currentPlayer === 'X') {
      // Player's move
      board[index] = currentPlayer;
      cell.textContent = currentPlayer;
      if (checkWin(board)) {
        statusText.textContent = 'You win!';
      } else if (board.every(cell => cell !== '')) {
        statusText.textContent = "It's a draw!";
      } else {
        currentPlayer = 'O';
        statusText.textContent = "AI's turn";
        setTimeout(aiMove, 500); // AI makes a move after a short delay
      }
    }
  });
});

// AI's Move
function aiMove() {
  let bestMove = getBestMove(board);
  if (bestMove !== -1) {
    board[bestMove] = 'O';
    cells[bestMove].textContent = 'O';
    if (checkWin(board)) {
      statusText.textContent = 'AI wins!';
    } else if (board.every(cell => cell !== '')) {
      statusText.textContent = "It's a draw!";
    } else {
      currentPlayer = 'X';
      statusText.textContent = "Your turn";
    }
  }
}

// Get the Best Move for AI
function getBestMove(board) {
  // Try to win
  for (let i = 0; i < board.length; i++) {
    if (board[i] === '') {
      board[i] = 'O';
      if (checkWin(board)) {
        board[i] = '';
        return i;
      }
      board[i] = '';
    }
  }

  // Block the player from winning
  for (let i = 0; i < board.length; i++) {
    if (board[i] === '') {
      board[i] = 'X';
      if (checkWin(board)) {
        board[i] = '';
        return i;
      }
      board[i] = '';
    }
  }

  // Make a random move
  const availableMoves = board.map((cell, index) => cell === '' ? index : -1).filter(index => index !== -1);
  if (availableMoves.length > 0) {
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  }

  return -1; // No moves left
}

// Reset the Game
resetButton.addEventListener('click', resetGame);

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  cells.forEach(cell => cell.textContent = '');
  currentPlayer = 'X';
  statusText.textContent = "Your turn";
}

// Check for a Win
function checkWin(board) {
  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return board[a] !== '' && board[a] === board[b] && board[a] === board[c];
  });
}