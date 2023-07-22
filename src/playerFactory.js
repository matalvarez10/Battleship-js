import { currentPlayer } from ".";
import { getRandomNumberInRangeWithExclusions } from "./helperFunctions";
import { players } from ".";
let valuesToExclude = [];


export const player = (nombre)=>{
    const getName = () => nombre;
    const clickHit = (gridReference, gameboardRef,allShips,nombreBoard) =>{
        const coordinates = gridReference.getAttribute('data-number');
        const x = Math.floor(coordinates / 10);
        const y = coordinates % 10;
        if(validMove(x,y,gameboardRef) === true){

            if(nombre == "CPU"){
                valuesToExclude.push((x*10) + y);
                
            }
            if (["C", "B", "D", "S", "P"].includes(gameboardRef[x][y])){
                const shipHit = allShips.filter(element => element.getId() === gameboardRef[x][y]);
                shipHit[0].hit();
                if(checkGameOver(allShips)){
                    const winnerText = document.getElementById('winner');
                    const modalElement = document.getElementById('modal');
                    const backdropElement = document.querySelector('.backdrop');
                    modalElement.style.display = "flex";
                    backdropElement.style.display = "block";
                    winnerText.innerText = `THE WINNER IS ${nombre}`;
                }
                gameboardRef[x][y] = "XX";
                gridReference.innerText = "💥";
            }else{
                gameboardRef[x][y] = "MM";
                gridReference.innerText = "❌"
            }
            if(nombre != "CPU"){
                const playerGrid = document.getElementById(nombre);
                const allCPU = document.querySelectorAll(`.${nombre}`);
                let randomNum = getRandomNumberInRangeWithExclusions(valuesToExclude);  
                playerGrid.style.pointerEvents = "none";
                setTimeout(() => {
                    playerGrid.style.pointerEvents = "auto";
                    allCPU[randomNum].click();       
                  }, "1000");
            }     
            const currentTurn = document.getElementById('current-turn');
            currentTurn.innerText = `${players[1-currentPlayer].getName()} Turn`;
            currentPlayer = 1 - currentPlayer;
        };
    }
    const validMove = (cordX,cordY,gameboardRef) =>{
        if(gameboardRef[cordX][cordY] !== "MM" && 
            gameboardRef[cordX][cordY] !== "XX"){
            return true
        }
    }
    function checkGameOver(allShips){
        return allShips.every(element => element.isSunk());
    }
  
    return {getName,clickHit,validMove};
}