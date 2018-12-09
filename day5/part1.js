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

// Keep performing iterations until the length stops changing
let currentState = [];
let newState = parsedInput;
while (newState.length !== currentState.length) {
  currentState = newState;
  newState = removePairs(currentState);
}

// Format as a string again
const answer = newState.length;

console.log(answer);
