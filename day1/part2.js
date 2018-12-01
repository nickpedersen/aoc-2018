const fs = require("fs");

const input = fs.readFileSync("./input.txt");

const parsedInput = input
  .toString()
  .split("\n")
  .map(Number);

let foundFrequences = [];
let matchingFrequency = null;
let index = 0;
let total = 0;

while (!matchingFrequency) {
  const freqChange = parsedInput[index % parsedInput.length];
  total += freqChange;

  if (foundFrequences.indexOf(total) !== -1) {
    matchingFrequency = total;
  } else {
    foundFrequences.push(total);
  }

  index += 1;
}

console.log(matchingFrequency);
