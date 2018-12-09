// Note: this is sloooooow. It can be drastically sped up by replacing the input with the result string from part one.
const fs = require("fs");

const input = fs.readFileSync("./input.txt");

const parsedInput = input
  .toString()
  .split("")
  .map(letter => ({
    letter: letter.toUpperCase(),
    isUpper: letter.toUpperCase() === letter
  }));

// Function to perform one interation
const removePairs = input => {
  let ixToRemove = [];
  input.forEach((current, ix) => {
    const previous = ix > 0 && input[ix - 1];
    if (
      previous && // Previous exists
      previous.letter === current.letter && // Letters match
      previous.isUpper !== current.isUpper && // Cases differ
      ixToRemove.indexOf(ix - 1) === -1 // The previous hasn't already been marked to remove
    ) {
      ixToRemove = [...ixToRemove, ix - 1, ix];
    }
  });
  return input.filter((_, ix) => ixToRemove.indexOf(ix) === -1);
};

// Map through the alphabet and work out the result if they're filtered out first
const resultsAfterRemoving = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'].map(letter => {
  // Keep performing iterations until the length stops changing
  let currentState = [];
  let newState = parsedInput.filter(p => p.letter !== letter);
  while (newState.length !== currentState.length) {
    currentState = newState;
    newState = removePairs(currentState);
  }
  return newState.length;
});

// Find the smallest length value
const answer = Math.min(...resultsAfterRemoving);

console.log(answer);
