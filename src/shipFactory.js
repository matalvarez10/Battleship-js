export const ship = (lenght,id)=>{
    const getLenght = () => lenght;
    const getId = () => id;
    const hit = () =>{
        lenght--;
    }
    const isSunk = () => lenght === 0 ? true : false;
    return {getLenght,getId,hit,isSunk};
}