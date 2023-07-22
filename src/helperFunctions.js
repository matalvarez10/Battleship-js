export function getRandomNumberInRangeWithExclusions(valuesToExclude) {
  const min = 0;
  const max = 99;
  const validNumbers = new Set(
    Array.from({ length: max - min + 1 }, (_, i) => i + min)
  );
  valuesToExclude.forEach((excludedNumber) => {
    if (validNumbers.has(excludedNumber)) {
      validNumbers.delete(excludedNumber);
    }
  });
  const validNumbersArray = Array.from(validNumbers);
  const randomIndex = Math.floor(Math.random() * validNumbersArray.length);

  return validNumbersArray[randomIndex];
}
