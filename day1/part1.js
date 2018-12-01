const fs = require("fs");

const input = fs.readFileSync("./input.txt");

const parsedInput = input
  .toString()
  .split("\n")
  .map(Number);

const finalFrequency = parsedInput.reduce((total, change) => total + change, 0);

console.log(finalFrequency);
