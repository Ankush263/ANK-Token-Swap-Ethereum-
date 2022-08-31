// import { hre } from 'hardhat'
import ethers from "@nomiclabs/hardhat-ethers"
const hre = require("hardhat")

async function main() {

  const ANKToken = await hre.ethers.getContractFactory("TokenSwap");
  const ankToken = await ANKToken.deploy();

  await ankToken.deployed();

  console.log(`ANKToken deployed to ${ankToken.address}`);

  // console.log(ethers)
  // console.log(hre.ethers)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

