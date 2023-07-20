import { currentPlayer } from ".";

export const player = (nombre)=>{
    const getName = () => nombre;
    const clickHit = (gridReference, gameboardRef) =>{
        const coordinates = gridReference.getAttribute('data-number');
        //TODO
        const x = Math.floor(coordinates / 10);
        const y = coordinates % 10;
        console.log("CALLING FROM PLAYER",gameboardRef);
        console.log("elemento grid",gridReference);
        if(validMove(x,y,gameboardRef) === true){
            if (["C", "B", "D", "S", "P"].includes(gameboardRef[x][y])){
                gameboardRef[x][y] = "XX";
                gridReference.style.backgroundColor = "red";
                console.log("boat hit")
            }else{
                console.log("missed");
                gameboardRef[x][y] = "MM";
                gridReference.style.backgroundColor = "gray";
            }
            currentPlayer = 1 - currentPlayer;
        };
    }
    const validMove = (cordX,cordY,gameboardRef) =>{
        if(gameboardRef[cordX][cordY] !== "MM"){
            return true
        }
        else{
            false
        }
    }
    return {getName,clickHit,validMove};
}