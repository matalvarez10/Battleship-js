import { shipHover, shipLeave } from "./helperFunctions";
import { rotateSwitch } from ".";
export const currentShip = 5;


export const gameboard = (nombre) => {
  let mainBoard = [];
  let displayBoard = document.getElementById("game-board");
  let counter = 0;
  for (let i = 0; i < 10; i++) {
    mainBoard[i] = [];
    for (let j = 0; j < 10; j++) {
      mainBoard[i][j] = counter;
      let tmpSquare = document.createElement("div");
      tmpSquare.classList.add("grid-square");
      tmpSquare.setAttribute("data-number", counter);
      tmpSquare.addEventListener("mouseover", shipHover);
      tmpSquare.addEventListener("mouseout", shipLeave);
      tmpSquare.addEventListener("click", writeBoard);
      displayBoard.append(tmpSquare);
      counter++;
    }
  }
  function writeBoard() {
    let index = parseInt(this.getAttribute("data-number"));
    let i = Math.floor(index / 10);
    let j = index % 10;
/*     if (checkBoard(index) === true) { */
      for (let y = j; y < j + currentShip; y++) {
        mainBoard[i][y] = "x";
        if (i == 0) {
          let auxSquare = document.querySelector(`[data-number="${y}"]`);
          auxSquare.style.backgroundColor = "black";
        } else {
          let auxSquare = document.querySelector(`[data-number="${i}${y}"]`);
          auxSquare.style.backgroundColor = "black";
        }
      }
/*     } */
    console.log(mainBoard);
  }
  function checkBoard(index) {
    let i = Math.floor(index / 10);
    let j = index % 10;
    for (let y = i - 1; y <= i + 1; y++) {
      if (y < 0 || y > 9) continue;
      for (let k = j - 1; k < j + currentShip + 1; k++) {
        if (j + currentShip > 10) {
          return false;
        }
        if (k < 0 || k > 9) continue;
        if (mainBoard[y][k] == "x") {
          return false;
        }
      }
    }
    return true;
  }
  const getBoard = () => mainBoard;
  const getName = () => nombre;
  return { getBoard, getName };
};
