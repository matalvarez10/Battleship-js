import { rotateSwitch } from ".";
import { currentPlayer } from ".";
import { players } from ".";
import { getRandomInt } from ".";


export const gameboard = (nombre,allShips,shipsPlaced) => {  
  let mainBoard = [];
  let containerElement = document.getElementById("game-container");
  let displayBoard = document.createElement("div");
  let displayBoatName = document.querySelector('#boat-name');
  displayBoard.classList.add("game-board");
  displayBoard.setAttribute('id',`${nombre}`);
  let counter = 0;

/*   // random play if cpu
  if(currentPlayer == 1){
    console.log("cpu turn");
  } */
  for (let i = 0; i < 10; i++) {
    mainBoard[i] = [];
    for (let j = 0; j < 10; j++) {
      mainBoard[i][j] = counter;
      let tmpSquare = document.createElement("div");
      tmpSquare.classList.add("grid-square");
      tmpSquare.classList.add(nombre);
      tmpSquare.setAttribute("data-number", counter);
      tmpSquare.addEventListener("mouseover", shipHover);
      tmpSquare.addEventListener("mouseout", shipLeave);
      tmpSquare.addEventListener("click", writeBoard);
      displayBoard.append(tmpSquare);
      counter++;
    }
  }
  containerElement.append(displayBoard);

  function writeBoard() {
    let index = parseInt(this.getAttribute("data-number"));
    let i = Math.floor(index / 10);
    let j = index % 10;
    let suma = 1;
    let limit = j + allShips[shipsPlaced].getLenght();
    if (!rotateSwitch) {
      suma = 10;
      limit = index + allShips[shipsPlaced].getLenght() * suma;
    }
    if (checkBoard(index) === true) {
      if(shipsPlaced<4){
        displayBoatName.innerText= allShips[shipsPlaced + 1].getName();
      }
      
      for (let y = rotateSwitch ? j : index; y < limit; y = y + suma) {
        if (rotateSwitch) {
          mainBoard[i][y] = allShips[shipsPlaced].getId();
          if (i == 0) {
            let auxSquare = document.querySelector(`[data-number="${y}"].${nombre}`);;
            auxSquare.style.backgroundColor = "black";
          } else {
            let auxSquare = document.querySelector(`[data-number="${i}${y}"].${nombre}`);
            auxSquare.style.backgroundColor = "black";
          }
        } else {
          mainBoard[Math.floor(y / 10)][j] = allShips[shipsPlaced].getId();
          if (Math.floor(y / 10) == 0) {
            let auxSquare = document.querySelector(`[data-number="${j}"].${nombre}`);
            auxSquare.style.backgroundColor = "black";
          } else {
            let auxSquare = document.querySelector(
              `[data-number="${Math.floor(y / 10)}${j}"].${nombre}`
            );
            auxSquare.style.backgroundColor = "black";
          }
        }
      }
      shipsPlaced++;
      if (allPieces()) {
        let allGrids = document.querySelectorAll(`.${nombre}`);
        if(nombre !== "CPU"){
          const renderGrid = document.getElementById(`CPU`);
          renderGrid.removeAttribute('id');
        }

        allGrids.forEach((element) => {
          displayBoatName.innerText = "Carrier";
          element.removeEventListener("click", writeBoard);
          element.removeEventListener("mouseover", shipHover);
          element.removeEventListener("mouseout", shipLeave);
          element.addEventListener("click",(e)=>{
            if(players[currentPlayer].getName() !== nombre){
              players[currentPlayer].clickHit(e.target,mainBoard,allShips,nombre);
            }
            else{
              console.log("movimiento no valido");
            }
          })
        });
      }
    }
  }
  function checkBoard(index) {
    let i = Math.floor(index / 10);
    let j = index % 10;
    if (!rotateSwitch) {
      [j, i] = [i, j];
    }
    for (let y = i - 1; y <= i + 1; y++) {
      if (y < 0 || y > 9) continue;
      for (let k = j - 1; k < j + allShips[shipsPlaced].getLenght() + 1; k++) {
        if (j + allShips[shipsPlaced].getLenght() > 10) {
          return false;
        }
        if (k < 0 || k > 9) continue;
        if (rotateSwitch) {
          if (["C", "B", "D", "S", "P"].includes(mainBoard[y][k])) {
            return false;
          }
        } else {
          if (["C", "B", "D", "S", "P"].includes(mainBoard[k][y])) {
            return false;
          }
        }
      }
    }
    return true;
  }

  function shipHover() {
    let tmpLength = this.getAttribute("data-number");
    let suma = 1;
    let limit = parseInt(tmpLength) + allShips[shipsPlaced].getLenght();
    if (!rotateSwitch) {
      suma = 10;
      limit = parseInt(tmpLength) + allShips[shipsPlaced].getLenght() * suma;
    }
    for (let i = parseInt(tmpLength); i < limit; i = i + suma) {
      let x = Math.floor(i / 10);
      let y = i % 10;
      if (["C", "B", "D", "S", "P"].includes(mainBoard[x][y])) {
        return;
      }
      //hover effect
      let auxSquare = document.querySelector(`[data-number="${i}"].${nombre}`);
      auxSquare.style.backgroundColor = "lime";
      if ((i % 10 == 9 && rotateSwitch) || (i >= 90 && !rotateSwitch)) {
        return;
      }
    }
  }

  function shipLeave() {
    let tmpLength = this.getAttribute("data-number");
    let suma = 1;
    let limit = parseInt(tmpLength) + allShips[shipsPlaced].getLenght();
    if (!rotateSwitch) {
      suma = 10;
      limit = parseInt(tmpLength) + allShips[shipsPlaced].getLenght() * suma;
    }
    for (let i = parseInt(tmpLength); i < limit; i = i + suma) {
      let x = Math.floor(i / 10);
      let y = i % 10;
      if (["C", "B", "D", "S", "P"].includes(mainBoard[x][y])) {
        return;
      }
      let auxSquare = document.querySelector(`[data-number="${i}"].${nombre}`);
      auxSquare.style.backgroundColor = "white";
      if ((i % 10 == 9 && rotateSwitch) || (i >= 90 && !rotateSwitch)) {
        return;
      }
    }
  }

  const allPieces = () => shipsPlaced >= 5 ? true : false;
  const getBoard = () => mainBoard;
  const getName = () => nombre;
  return { getBoard, getName , allPieces };
};
