export function getRandomNumberInRangeWithExclusions(valuesToExclude) {
    const min = 0;
    const max = 99;
    
    // Create a set of all valid numbers within the range (0 to 99)
    const validNumbers = new Set(Array.from({ length: max - min + 1 }, (_, i) => i + min));
    
    // Remove excluded values from the set
    valuesToExclude.forEach((excludedNumber) => {
      if (validNumbers.has(excludedNumber)) {
        validNumbers.delete(excludedNumber);
      }
    });
  
    // Convert the set to an array to be able to get a random element
    const validNumbersArray = Array.from(validNumbers);
  
    // Generate a random index to get a random number from the valid numbers array
    const randomIndex = Math.floor(Math.random() * validNumbersArray.length);
  
    return validNumbersArray[randomIndex];
  }