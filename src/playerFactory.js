import { currentPlayer } from ".";
import { getRandomNumberInRangeWithExclusions } from "./helperFunctions";
let valuesToExclude = [];


export const player = (nombre)=>{
    const getName = () => nombre;
    const clickHit = (gridReference, gameboardRef) =>{
        const coordinates = gridReference.getAttribute('data-number');
        const x = Math.floor(coordinates / 10);
        const y = coordinates % 10;
        if(validMove(x,y,gameboardRef) === true){
            if(nombre == "CPU"){
                valuesToExclude.push((x*10) + y);
                
            }
            if (["C", "B", "D", "S", "P"].includes(gameboardRef[x][y])){
                gameboardRef[x][y] = "XX";
                gridReference.style.backgroundColor = "red";
                /* console.log("boat hit") */
            }else{
                /* console.log("missed"); */
                gameboardRef[x][y] = "MM";
                gridReference.style.backgroundColor = "gray";
            }
            currentPlayer = 1 - currentPlayer;
            if(nombre != "CPU"){
                const allCPU = document.querySelectorAll(".player1");
                let randomNum = getRandomNumberInRangeWithExclusions(valuesToExclude);
                allCPU[randomNum].click();
            }
        };
    }
    const validMove = (cordX,cordY,gameboardRef) =>{
        console.log(gameboardRef);
        if(gameboardRef[cordX][cordY] !== "MM" && 
            gameboardRef[cordX][cordY] !== "XX"){
            return true
        }
        else{
            console.log("invalid movement");
        }
    }
    return {getName,clickHit,validMove};
}