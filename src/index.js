import "./styles.css";

import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";
import "@fortawesome/fontawesome-free/js/brands";

import { gameboard } from "./gameboardFactory";

const rotateButton = document.getElementById("rotate-btn");
export let rotateSwitch = true;

export let gameboard1 = gameboard('matias');
rotateButton.addEventListener('click',()=>{
    rotateSwitch = !rotateSwitch;
    console.log(rotateSwitch);
})

console.log(gameboard1.getBoard());