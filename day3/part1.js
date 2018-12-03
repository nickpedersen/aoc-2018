const fs = require("fs");

const input = fs.readFileSync("./input.txt");

const parsedInput = input
  .toString()
  .split("\n")
  .map(line => {
    const [claimId, _atSymbol, coords, size] = line.split(" ");
    return {
      claimId,
      left: Number(coords.split(",")[0]),
      top: Number(coords.split(",")[1].replace(":", "")),
      width: Number(size.split("x")[0]),
      height: Number(size.split("x")[1])
    };
  });

// `squares` will be a hash with keys `${x}, ${y}` where the values represent the number of claims
const squares = {};
parsedInput.forEach(claim => {
  const w = [...Array(claim.width).keys()].map(i => i + claim.left);
  const h = [...Array(claim.height).keys()].map(i => i + claim.top);
  w.forEach(x => {
    h.forEach(y => {
      squares[`${x}, ${y}`] = (squares[`${x}, ${y}`] || 0) + 1;
    });
  });
});

const duplicateSquares = Object.values(squares).filter(s => s > 1).length;

console.log(duplicateSquares);
