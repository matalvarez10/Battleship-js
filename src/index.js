import "./styles.css";

import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";
import "@fortawesome/fontawesome-free/js/brands";

import { gameboard } from "./gameboardFactory";
import {ship} from "./shipFactory"

const rotateButton = document.getElementById("rotate-btn");
export let rotateSwitch = true;
// Creating ships and inserting them in an array

export const carrierP1 = ship(5,"C");
export const battleshipP1 = ship(4,"B");
export const destroyerP1 = ship(3,"D");
export const submarineP1 = ship(3,"S");
export const patrolBoatP1= ship(2,"P");
export const allShips =[
    carrierP1,
    battleshipP1,
    destroyerP1,
    submarineP1,
    patrolBoatP1
];
console.log(allShips[1]);


export const gameboard1 = gameboard('matias');
rotateButton.addEventListener('click',()=>{
    rotateSwitch = !rotateSwitch;
    console.log(rotateSwitch);
})

console.log(gameboard1.getBoard());

/* 
1* 5 carrier C
1* 4 battleship B 
1*3 destroyer D
1*3 submarine 3 S
1*2 patrol boat P
*/