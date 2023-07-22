export const ship = (nombre, lenght, id) => {
  const getLenght = () => lenght;
  const getId = () => id;
  const getName = () => nombre;
  const hit = () => {
    lenght--;
  };
  const isSunk = () => (lenght === 0 ? true : false);
  return { getLenght, getId, hit, isSunk, getName };
};
