import { shipHover, shipLeave } from "./helperFunctions";
import { rotateSwitch } from ".";
import { allShips } from ".";
/* export const allShips[shipsPlaced].getLenght() = 5; */
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
    let limit = j + allShips[shipsPlaced].getLenght();
    if(!rotateSwitch){
      suma = 10;
      limit = index + (allShips[shipsPlaced].getLenght()*suma);
    }
    if (checkBoard(index) === true) {
      for (let y = rotateSwitch ? j : index ; y < limit ; y=y + suma) {
        if(rotateSwitch){
          mainBoard[i][y] = allShips[shipsPlaced].getId();
          if (i == 0) {
            let auxSquare = document.querySelector(`[data-number="${y}"]`);
            auxSquare.style.backgroundColor = "black";
          } else {
            let auxSquare = document.querySelector(`[data-number="${i}${y}"]`);
            auxSquare.style.backgroundColor = "black";
          }
        }
        else{
          mainBoard[Math.floor(y / 10)][j] = allShips[shipsPlaced].getId();
          if (Math.floor(y / 10) == 0) {
            let auxSquare = document.querySelector(`[data-number="${j}"]`);
            auxSquare.style.backgroundColor = "black";
          } else {
            let auxSquare = document.querySelector(`[data-number="${Math.floor(y / 10)}${j}"]`);
            auxSquare.style.backgroundColor = "black";
          }
          
        }

      }
      if(shipsPlaced<4){
        shipsPlaced++;
      }
      else{
        let allGrids = document.querySelectorAll(".grid-square");
        allGrids.forEach((element)=>{
          element.removeEventListener("click", writeBoard);
          element.removeEventListener("mouseover", shipHover);
          element.removeEventListener("mouseout", shipLeave);
        })
      }
    }
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
      for (let k = j - 1; k < j + allShips[shipsPlaced].getLenght() + 1; k++) {
        if (j + allShips[shipsPlaced].getLenght() > 10) {
          return false;
        }
        if (k < 0 || k > 9) continue;
        if(rotateSwitch){
          if (["C", "B", "D", "S", "P"].includes(mainBoard[y][k])) {
            return false;
          }
        }
        else{
          if (["C", "B", "D", "S", "P"].includes(mainBoard[k][y])) {
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
