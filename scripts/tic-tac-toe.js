// Tic Tac Toe Game Logic (Player vs AI)
let currentPlayer = 'X'; // Player is X, AI is O
let board = ['', '', '', '', '', '', '', '', ''];
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset');
const endGameButton = document.getElementById('end-game');
const playerScoreElement = document.getElementById('player-score');
const difficultySelect = document.getElementById('difficulty');

let playerScore = 0;
let difficulty = 'easy'; // Default difficulty

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
    if (board[index] === '' && !checkWin(board)) {
      // Player's move
      board[index] = currentPlayer;
      cell.textContent = currentPlayer;
      cell.classList.add(currentPlayer.toLowerCase()); // Add class for X or O
      if (checkWin(board)) {
        updateScore();
        statusText.textContent = 'You win!';
        drawWinLine(getWinningPattern(board));
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
  let bestMove;
  switch (difficulty) {
    case 'easy':
      bestMove = getRandomMove();
      break;
    case 'medium':
      bestMove = getMediumMove();
      break;
    case 'hard':
      bestMove = getHardMove();
      break;
    case 'extreme':
      bestMove = getBestMove();
      break;
  }

  if (bestMove !== -1) {
    board[bestMove] = 'O';
    cells[bestMove].textContent = 'O';
    cells[bestMove].classList.add('o'); // Add class for O
    if (checkWin(board)) {
      statusText.textContent = 'AI wins!';
      drawWinLine(getWinningPattern(board));
    } else if (board.every(cell => cell !== '')) {
      statusText.textContent = "It's a draw!";
    } else {
      currentPlayer = 'X';
      statusText.textContent = "Your turn";
    }
  }
}

// Get a Random Move (Easy)
function getRandomMove() {
  const availableMoves = board.map((cell, index) => cell === '' ? index : -1).filter(index => index !== -1);
  if (availableMoves.length > 0) {
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  }
  return -1; // No moves left
}

// Get a Medium Move (Tries to block the player)
function getMediumMove() {
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
  return getRandomMove();
}

// Get a Hard Move (Tries to win and block the player)
function getHardMove() {
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

  // Make a strategic move (center or corners)
  const centerAndCorners = [0, 2, 4, 6, 8];
  const availableMoves = centerAndCorners.filter(index => board[index] === '');
  if (availableMoves.length > 0) {
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  }

  // Make a random move
  return getRandomMove();
}

// Get the Best Move (Extreme - Unbeatable)
function getBestMove() {
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

  // Make a strategic move (center or corners)
  const centerAndCorners = [0, 2, 4, 6, 8];
  const availableMoves = centerAndCorners.filter(index => board[index] === '');
  if (availableMoves.length > 0) {
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  }

  // Make a random move
  return getRandomMove();
}

// Check for a Win
function checkWin(board) {
  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return board[a] !== '' && board[a] === board[b] && board[a] === board[c];
  });
}

// Get the Winning Pattern
function getWinningPattern(board) {
  return winPatterns.find(pattern => {
    const [a, b, c] = pattern;
    return board[a] !== '' && board[a] === board[b] && board[a] === board[c];
  });
}

// Draw the Win Line
function drawWinLine(pattern) {
  const [a, b, c] = pattern;
  const cellA = cells[a].getBoundingClientRect();
  const cellC = cells[c].getBoundingClientRect();

  const winLine = document.createElement('div');
  winLine.classList.add('win-line');

  if (a === 0 && c === 2) { // Top row
    winLine.style.width = `${cellC.right - cellA.left}px`;
    winLine.style.top = `${cellA.top + cellA.height / 2}px`;
    winLine.style.left = `${cellA.left}px`;
  } else if (a === 0 && c === 8) { // Diagonal (top-left to bottom-right)
    winLine.style.width = `${Math.hypot(cellC.right - cellA.left, cellC.bottom - cellA.top)}px`;
    winLine.style.top = `${cellA.top}px`;
    winLine.style.left = `${cellA.left}px`;
    winLine.style.transform = `rotate(45deg)`;
  } else if (a === 2 && c === 6) { // Diagonal (top-right to bottom-left)
    winLine.style.width = `${Math.hypot(cellC.left - cellA.right, cellC.bottom - cellA.top)}px`;
    winLine.style.top = `${cellA.top}px`;
    winLine.style.left = `${cellA.right}px`;
    winLine.style.transform = `rotate(-45deg)`;
  } else { // Columns or middle row
    winLine.style.width = `${cellC.bottom - cellA.top}px`;
    winLine.style.top = `${cellA.top}px`;
    winLine.style.left = `${cellA.left + cellA.width / 2}px`;
    winLine.style.transform = `rotate(90deg)`;
  }

  document.querySelector('.game-board').appendChild(winLine);
}

// Update Player Score
function updateScore() {
  switch (difficulty) {
    case 'easy':
      playerScore += 1;
      break;
    case 'medium':
      playerScore += 2;
      break;
    case 'hard':
      playerScore += 3;
      break;
    case 'extreme':
      playerScore += 4;
      break;
  }
  playerScoreElement.textContent = playerScore;
}

// Reset the Game
resetButton.addEventListener('click', resetGame);

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('x', 'o');
  });
  currentPlayer = 'X';
  statusText.textContent = "Your turn";
  document.querySelectorAll('.win-line').forEach(line => line.remove());
}

// End the Game and Convert Score to Coins
endGameButton.addEventListener('click', () => {
  const coins = playerScore * 10; // 1 point = 10 coins
  localStorage.setItem('coins', coins); // Store coins in local storage
  window.location.href = 'index.html'; // Redirect to the main page
});

// Set Difficulty
difficultySelect.addEventListener('change', (event) => {
  difficulty = event.target.value;
  resetGame(); // Reset the game when difficulty changes
});

// Initial Setup
resetGame();