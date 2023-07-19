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

export const allShips =[
    ship(5,"C"),
    ship(4,"B"),
    ship(3,"D"),
    ship(3,"S"),
    ship(2,"P")
];

export const gameboard1 = gameboard('matias');
rotateButton.addEventListener('click',()=>{
    rotateSwitch = !rotateSwitch;
})


/* 
1* 5 carrier C
1* 4 battleship B 
1*3 destroyer D
1*3 submarine 3 S
1*2 patrol boat P
*/