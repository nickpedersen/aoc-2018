const fs = require("fs");

const input = fs.readFileSync("./input.txt");

const parsedInput = input.toString().split("\n");

// Function to return an object with the count of each letter in a string
const countLetters = inputString =>
  inputString
    .split("")
    .reduce(
      (counts, letter) =>
        Object.assign({}, counts, { [letter]: (counts[letter] || 0) + 1 }),
      {}
    );

const letterCounts = parsedInput.map(countLetters);

// Find the number of boxes with a letter appearing twice and thrice
const boxesWithDoubleLetters = letterCounts.filter(
  box => Object.values(box).filter(v => v === 2).length > 0
);
const boxesWithTripleLetters = letterCounts.filter(
  box => Object.values(box).filter(v => v === 3).length > 0
);
const checksum = boxesWithDoubleLetters.length * boxesWithTripleLetters.length;

console.log(checksum);
