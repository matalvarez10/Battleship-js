import { gameboard1 } from ".";
import { currentShip } from "./gameboardFactory";
import { rotateSwitch } from ".";

export function shipHover() {
  let tmpLength = this.getAttribute("data-number");
  let auxBoard = gameboard1.getBoard();
  let suma = 1;
  let limit = parseInt(tmpLength) + currentShip;
  if(!rotateSwitch){
    suma = 10;
    limit = parseInt(tmpLength)+(currentShip*suma);
  }
  console.log(limit);
  for (let i = parseInt(tmpLength); i < limit; i=i+suma) { 
    let x = Math.floor(i / 10);
    let y = i % 10;
    if (auxBoard[x][y] === "x") {
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
  let limit = parseInt(tmpLength) + currentShip;
  if(!rotateSwitch){
    suma = 10;
    limit = parseInt(tmpLength)+(currentShip*suma);
  }
  for (let i = parseInt(tmpLength); i < limit; i=i+suma) { 
    let x = Math.floor(i / 10);
    let y = i % 10;
    if (auxBoard[x][y] === "x") {
      return;
    }
    let auxSquare = document.querySelector(`[data-number="${i}"]`);
    auxSquare.style.backgroundColor = "white";
    if ((i % 10 == 9 && rotateSwitch) || (i>=90 && !rotateSwitch) ) {
      return;
    }
  }
}
