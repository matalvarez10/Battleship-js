import "./styles.css";

import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";
import "@fortawesome/fontawesome-free/js/brands";

import { gameboard } from "./gameboardFactory";
import {ship} from "./shipFactory"
import { player } from "./playerFactory";

const rotateButton = document.getElementById("rotate-btn");
export let rotateSwitch = true;
export let currentPlayer = 0;

//helper function
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  /* 
1* 5 carrier C
1* 4 battleship B 
1*3 destroyer D
1*3 submarine 3 S
1*2 patrol boat P
*/

// Creating ships and inserting them in an array

export const allShipsPlayer =[
    ship("Carrier",5,"C"),
    ship("Battleship",4,"B"),
    ship("Destroyer",3,"D"),
    ship("Submarine",3,"S"),
    ship("Patrol Boat",2,"P")
];

export const allShipsCPU =[
    ship("Carrier",5,"C"),
    ship("Battleship",4,"B"),
    ship("Destroyer",3,"D"),
    ship("Submarine",3,"S"),
    ship("Patrol Boat",2,"P")
];
// INITIAL PLAYER => HUMAN PLAYER

// creating players
export const players = [
    player("player1"),
    player("CPU")
];


//creating boards
const gameboardPlayer = gameboard(players[0].getName(),allShipsPlayer,0);
const gameboardCPU = gameboard(players[1].getName(),allShipsCPU,0);


const allCPU = document.querySelectorAll(".CPU");
while(gameboardCPU.allPieces() === false){
 let numeroAleatorio = getRandomInt(99);
 allCPU[getRandomInt(99)].click();
 if(numeroAleatorio<50){
    rotateSwitch = true
 }
 else{
    rotateSwitch = false
 }
}
rotateSwitch = true;

rotateButton.addEventListener('click',()=>{
    rotateSwitch = !rotateSwitch;

})


