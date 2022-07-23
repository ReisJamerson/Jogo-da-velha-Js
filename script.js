const cellsElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningmassagetextElement = document.querySelector(
  "[data-winning-massage-text]"
);
const winningMasseger = document.querySelector("[data-winning-massage]");
const restartButton = document.querySelector("[data-Restart-Button]");

let iscircleTurn;

const WinningCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const StartGame = () => {
  iscircleTurn = false;

  for (const cell of cellsElements) {
    cell.classList.remove("circle");
    cell.classList.remove("x");
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  }

  SetBoardHoverClass();
  winningMasseger.classList.remove("Show-Winning-message");
};

const EndGame = (isdraw) => {
  if (isdraw) {
    winningmassagetextElement.innerText = `Empate!`;
  } else {
    winningmassagetextElement.innerText = iscircleTurn
      ? "O Venceu!"
      : "X Venceu!";
  }

  winningMasseger.classList.add("Show-Winning-message");
};

const ChekforWin = (currentPlayer) => {
  return WinningCombination.some((combination) => {
    return combination.every((index) => {
      return cellsElements[index].classList.contains(currentPlayer);
    });
  });
};

const CheckforDraw = () => {
  return [...cellsElements].every((cell) => {
    return cell.classList.contains("x") || cell.classList.contains("circle");
  });
};

const placeMark = (cell, classToAdd) => {
  cell.classList.add(classToAdd);
};

const SetBoardHoverClass = () => {
  board.classList.remove("circle");
  board.classList.remove("x");

  if (iscircleTurn) {
    board.classList.add("circle");
  } else {
    board.classList.add("x");
  }
};

const SwapTurns = () => {
  iscircleTurn = !iscircleTurn;

  SetBoardHoverClass();
};

const handleClick = (e) => {
  // Colocar a marca (x ou Circulo)
  const cell = e.target;
  const classToAdd = iscircleTurn ? "circle" : "x";

  placeMark(cell, classToAdd);

  // Verificar Vitoria
  const isWin = ChekforWin(classToAdd);

  // Verificar Empate
  const isdraw = CheckforDraw();
  if (isWin) {
    EndGame(false);
  } else if (isdraw) {
    EndGame(true);
  } else {
    // Mudar Simbolo
    SwapTurns();
  }
};

StartGame();

restartButton.addEventListener("click", StartGame);
