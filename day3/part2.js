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
  })
	.map(line =>
    Object.assign({}, line, {
      right: line.left + line.width,
      bottom: line.top + line.height
    })
	);
	
// Test each claim against all others
let unmatchedClaim = null;
parsedInput.forEach(claim => {
  const collidingClaims = parsedInput.filter(testClaim => {
    // We return true if there is a collision
    // A test claim interferes with this claim if they cross in both the horizontal and vertical planes
		const leftItem = claim.left < testClaim.left ? claim : testClaim;
		const rightItem = claim.left < testClaim.left ? testClaim : claim;
		const horizontalCheck = leftItem.right > rightItem.left;

    const topItem = claim.top < testClaim.top ? claim : testClaim;
		const bottomItem = claim.top < testClaim.top ? testClaim : claim;
		const verticalCheck = topItem.bottom > bottomItem.top;

    return horizontalCheck && verticalCheck;
	});
	
	// A single collision indicates it only collided when tested against itself, which means it's the claim we're looking for
  if (collidingClaims.length === 1) {
    unmatchedClaim = claim;
  }
});

console.log(unmatchedClaim.claimId);
