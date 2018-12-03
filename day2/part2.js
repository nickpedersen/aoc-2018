const fs = require("fs");

const input = fs.readFileSync("./input.txt");

const parsedInput = input.toString().split("\n");

// There are 26 letters in each box ID, we're looking for the boxes that differ by a single letter
// Lets loop through the 26 places, removing that letter, and looking for two identical strings
const letterIndex = [...Array(26).keys()];

let matchingLetters = null;
letterIndex.forEach(ix => {
  const boxIds = parsedInput.map(
    boxId => boxId.slice(0, ix) + boxId.slice(ix + 1)
  );
  // Loop through and look for a match
  boxIds.forEach((boxId, ix) => {
    if (boxIds.indexOf(boxId) !== ix) {
      // This indicates there's a match earlier in the array!
      matchingLetters = boxId;
    }
  });
});

console.log(matchingLetters);
