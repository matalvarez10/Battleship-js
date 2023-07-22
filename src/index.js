import "./styles.css";

import { gameboard } from "./gameboardFactory";
import { ship } from "./shipFactory";
import { player } from "./playerFactory";

const rotateButton = document.getElementById("rotate-btn");
const playAgainBtn = document.getElementById("play-again");
export let rotateSwitch = true;
export let currentPlayer = 0;

//helper function
export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
// separator element
export const separator = document.createElement("div");
separator.classList.add("vertical-separator");
//game container

const gameContainer = document.getElementById("game-container");

// Creating ships and inserting them in an array

export const allShipsPlayer = [
  ship("Carrier", 5, "C"),
  ship("Battleship", 4, "B"),
  ship("Destroyer", 3, "D"),
  ship("Submarine", 3, "S"),
  ship("Patrol Boat", 2, "P"),
];

export const allShipsCPU = [
  ship("Carrier", 5, "C"),
  ship("Battleship", 4, "B"),
  ship("Destroyer", 3, "D"),
  ship("Submarine", 3, "S"),
  ship("Patrol Boat", 2, "P"),
];
// INITIAL PLAYER => HUMAN PLAYER

// creating players
export const players = [player("Player"), player("CPU")];

//creating boards
const gameboardPlayer = gameboard(players[0].getName(), allShipsPlayer, 0);
gameContainer.append(separator);
const gameboardCPU = gameboard(players[1].getName(), allShipsCPU, 0);

const allCPU = document.querySelectorAll(".CPU");
while (gameboardCPU.allPieces() === false) {
  let numeroAleatorio = getRandomInt(99);
  allCPU[getRandomInt(99)].click();
  if (numeroAleatorio < 50) {
    rotateSwitch = true;
  } else {
    rotateSwitch = false;
  }
}
rotateSwitch = true;

rotateButton.addEventListener("click", () => {
  rotateSwitch = !rotateSwitch;
});

playAgainBtn.addEventListener("click", () => {
  location.reload();
});
