// script.js
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;

const statusDisplay = document.getElementById("status");
const cells = document.querySelectorAll(".cell");

const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
document.getElementById("reset").addEventListener("click", resetGame);

function handleCellClick(event) {
  const cell = event.target;
  const cellIndex = cell.getAttribute("data-index");

  if (board[cellIndex] === "" && isGameActive) {
    board[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    checkResult();
    switchPlayer();
  }
}

function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
}

function checkResult() {
  let roundWon = false;

  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusDisplay.textContent = `Player ${currentPlayer} wins!`;
    isGameActive = false;
    return;
  }

  if (!board.includes("")) {
    statusDisplay.textContent = "It's a draw!";
    isGameActive = false;
  }
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  isGameActive = true;
  statusDisplay.textContent = "Player X's turn";
  cells.forEach(cell => (cell.textContent = ""));
}
