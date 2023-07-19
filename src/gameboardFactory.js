import { shipHover, shipLeave } from "./helperFunctions";
import { rotateSwitch } from ".";
import { allShips } from ".";
export const currentShip = 5;
export let shipsPlaced = 0;


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
    let suma = 1;
    let limit = j + currentShip;
    if(!rotateSwitch){
      suma = 10;
      limit = index + (currentShip*suma);
    }
    if (checkBoard(index) === true) {
      shipsPlaced++;
      for (let y = rotateSwitch ? j : index ; y < limit ; y=y + suma) {
        if(rotateSwitch){
          mainBoard[i][y] = "x";
          if (i == 0) {
            let auxSquare = document.querySelector(`[data-number="${y}"]`);
            auxSquare.style.backgroundColor = "black";
          } else {
            let auxSquare = document.querySelector(`[data-number="${i}${y}"]`);
            auxSquare.style.backgroundColor = "black";
          }
        }
        else{
          mainBoard[Math.floor(y / 10)][j] = "x";
          if (Math.floor(y / 10) == 0) {
            let auxSquare = document.querySelector(`[data-number="${j}"]`);
            auxSquare.style.backgroundColor = "black";
          } else {
            let auxSquare = document.querySelector(`[data-number="${Math.floor(y / 10)}${j}"]`);
            auxSquare.style.backgroundColor = "black";
          }
          
        }

      }
    }
    console.log("shipsCounter",shipsPlaced);
    console.log(mainBoard);
  }
  function checkBoard(index) {
    let i = Math.floor(index / 10);
    let j = index % 10;
    if(!rotateSwitch){
      [j, i] = [i, j];
    }
    for (let y = i - 1; y <= i + 1; y++) {
      if (y < 0 || y > 9) continue;
      for (let k = j - 1; k < j + currentShip + 1; k++) {
        if (j + currentShip > 10) {
          return false;
        }
        if (k < 0 || k > 9) continue;
        if(rotateSwitch){
          if (mainBoard[y][k] == "x") {
            return false;
          }
        }
        else{
          if (mainBoard[k][y] == "x") {
            return false;
          }
        }

      }
    }
    return true;
  }
  const getBoard = () => mainBoard;
  const getName = () => nombre;
  return { getBoard, getName };
};
