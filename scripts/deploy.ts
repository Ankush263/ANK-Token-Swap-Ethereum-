import { ethers } from "hardhat";

async function main() {

  const ANKToken = await ethers.getContractFactory("TokenSwap");
  const ankToken = await ANKToken.deploy();

  await ankToken.deployed();

  console.log(`ANKToken deployed to ${ankToken.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
