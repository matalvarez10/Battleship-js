import { gameboard1 } from ".";
/* import { allShips[shipsPlaced].getLenght() } from "./gameboardFactory"; */
import { rotateSwitch } from ".";
import { shipsPlaced } from "./gameboardFactory";
import { allShips } from ".";

export function shipHover() {
  let tmpLength = this.getAttribute("data-number");
  let auxBoard = gameboard1.getBoard();
  let suma = 1;
  let limit = parseInt(tmpLength) + allShips[shipsPlaced].getLenght();
  if(!rotateSwitch){
    suma = 10;
    limit = parseInt(tmpLength)+(allShips[shipsPlaced].getLenght()*suma);
  }
  for (let i = parseInt(tmpLength); i < limit; i=i+suma) { 
    let x = Math.floor(i / 10);
    let y = i % 10;
    if (["C", "B", "D", "S", "P"].includes(auxBoard[x][y])) {
      return;
    }
    //hover effect
    let auxSquare = document.querySelector(`[data-number="${i}"]`);
    auxSquare.style.backgroundColor = "lime";
    if ((i % 10 == 9 && rotateSwitch) || (i>=90 && !rotateSwitch) ) {
      return;
    }
  }
}

export function shipLeave() {
  let tmpLength = this.getAttribute("data-number");
  let auxBoard = gameboard1.getBoard();
  let suma = 1;
  let limit = parseInt(tmpLength) + allShips[shipsPlaced].getLenght();
  if(!rotateSwitch){
    suma = 10;
    limit = parseInt(tmpLength)+(allShips[shipsPlaced].getLenght()*suma);
  }
  for (let i = parseInt(tmpLength); i < limit; i=i+suma) { 
    let x = Math.floor(i / 10);
    let y = i % 10;
    if (["C", "B", "D", "S", "P"].includes(auxBoard[x][y])) {
      return;
    }
    let auxSquare = document.querySelector(`[data-number="${i}"]`);
    auxSquare.style.backgroundColor = "white";
    if ((i % 10 == 9 && rotateSwitch) || (i>=90 && !rotateSwitch) ) {
      return;
    }
  }
}
