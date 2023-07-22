import { rotateSwitch } from ".";
import { currentPlayer } from ".";
import { players } from ".";
import { separator } from ".";

export const gameboard = (nombre, allShips, shipsPlaced) => {
  let mainBoard = [];
  //board titles
  let boardTitle = document.createElement("div");
  boardTitle.classList.add("board-title");
  boardTitle.innerText = `${nombre} Board`;
  //main grid square container
  let containerElement = document.getElementById("game-container");
  //main container
  let containerWrapper = document.createElement("div");
  containerWrapper.classList.add("board-container");
  /// for the cords
  let numberRow = document.createElement("div");
  numberRow.classList.add("cords-row");
  let lettersRow = document.createElement("div");
  lettersRow.classList.add("cords-row");
  // the board to click
  let displayBoard = document.createElement("div");
  // boat selector
  let displayBoatName = document.querySelector("#boat-name");
  displayBoard.classList.add("game-board");
  containerWrapper.setAttribute("id", `${nombre}`);
  //wrapper to enter letter row and the gameboard
  let letterGameboardWrapper = document.createElement("div");
  letterGameboardWrapper.classList.add("letter-wrapper");
  let counter = 0;

  for (let index = 0; index <= 9; index++) {
    const cordsElement = document.createElement("div");
    cordsElement.classList.add("grid-square-cords");

    cordsElement.innerText = index;
    numberRow.style.paddingLeft = "calc(530px / 10)";
    numberRow.append(cordsElement);
    const lettersElement = document.createElement("div");
    lettersElement.classList.add("grid-square-cords");
    lettersElement.innerText = (index + 10).toString(36).toUpperCase();
    lettersRow.style.flexDirection = "column";
    lettersRow.append(lettersElement);
  }
  containerWrapper.append(boardTitle);
  containerWrapper.append(numberRow);
  for (let i = 0; i < 10; i++) {
    mainBoard[i] = [];
    for (let j = 0; j < 10; j++) {
      mainBoard[i][j] = counter;
      let tmpSquare = document.createElement("div");
      tmpSquare.classList.add("grid-square");
      tmpSquare.classList.add(nombre);
      if (nombre === "CPU") {
        tmpSquare.style.backgroundColor = "#2B0059 ";
        tmpSquare.style.borderColor = "#6E3AFF";
      }
      tmpSquare.setAttribute("data-number", counter);
      tmpSquare.addEventListener("mouseover", shipHover);
      tmpSquare.addEventListener("mouseout", shipLeave);
      tmpSquare.addEventListener("click", writeBoard);
      displayBoard.append(tmpSquare);
      counter++;
    }
  }
  letterGameboardWrapper.append(lettersRow);
  letterGameboardWrapper.append(displayBoard);
  containerWrapper.append(letterGameboardWrapper);
  containerElement.append(containerWrapper);

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
      if (shipsPlaced < 4) {
        displayBoatName.innerText = `Place your ${allShips[
          shipsPlaced + 1
        ].getName()}!`;
      }

      for (let y = rotateSwitch ? j : index; y < limit; y = y + suma) {
        if (rotateSwitch) {
          mainBoard[i][y] = allShips[shipsPlaced].getId();
          if (i == 0) {
            let auxSquare = document.querySelector(
              `[data-number="${y}"].${nombre}`
            );
            nombre == "CPU"
              ? (auxSquare.style.backgroundColor = "#2B0059")
              : (auxSquare.style.backgroundColor = "#ff0080");
          } else {
            let auxSquare = document.querySelector(
              `[data-number="${i}${y}"].${nombre}`
            );
            nombre == "CPU"
              ? (auxSquare.style.backgroundColor = "#2B0059")
              : (auxSquare.style.backgroundColor = "#ff0080");
          }
        } else {
          mainBoard[Math.floor(y / 10)][j] = allShips[shipsPlaced].getId();
          if (Math.floor(y / 10) == 0) {
            let auxSquare = document.querySelector(
              `[data-number="${j}"].${nombre}`
            );
            nombre == "CPU"
              ? (auxSquare.style.backgroundColor = "#2B0059")
              : (auxSquare.style.backgroundColor = "#ff0080");
          } else {
            let auxSquare = document.querySelector(
              `[data-number="${Math.floor(y / 10)}${j}"].${nombre}`
            );
            nombre == "CPU"
              ? (auxSquare.style.backgroundColor = "#2B0059")
              : (auxSquare.style.backgroundColor = "#ff0080");
          }
        }
      }
      shipsPlaced++;
      if (allPieces()) {
        let allGrids = document.querySelectorAll(`.${nombre}`);
        if (nombre !== "CPU") {
          const renderGrid = document.getElementById(`CPU`);
          renderGrid.removeAttribute("id");
          const startupInfo = document.getElementById("startup-info");
          const wrapperContainer = document.getElementById("wrapper");
          startupInfo.style.maxHeight = 0;
          wrapperContainer.style.maxHeight = "1000px";
          separator.style.display = "block";
        }
        allGrids.forEach((element) => {
          displayBoatName.innerText = "Display your Carrier";
          element.removeEventListener("click", writeBoard);
          element.removeEventListener("mouseover", shipHover);
          element.removeEventListener("mouseout", shipLeave);
          element.addEventListener("click", gameplayHandler);
          element.addEventListener("mouseover", hoverIn);
          element.addEventListener("mouseout", hoverOut);
        });
      }
    }
  }
  //// para controlar el gameflow
  function gameplayHandler() {
    if (players[currentPlayer].getName() !== nombre) {
      players[currentPlayer].clickHit(this, mainBoard, allShips, nombre);
    }
  }
  function hoverIn() {
    this.style.opacity = 0.3;
  }
  function hoverOut() {
    this.style.opacity = 1;
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
      auxSquare.style.backgroundColor = "#00FF00";
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
      auxSquare.style.backgroundColor = "#000c20";
      if ((i % 10 == 9 && rotateSwitch) || (i >= 90 && !rotateSwitch)) {
        return;
      }
    }
  }

  const allPieces = () => (shipsPlaced >= 5 ? true : false);
  const getBoard = () => mainBoard;
  const getName = () => nombre;
  return { getBoard, getName, allPieces };
};
