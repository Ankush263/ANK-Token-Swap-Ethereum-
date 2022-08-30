import { expect } from "chai";
import { ethers } from "hardhat";

describe("TokenSwap", async () => {
  let Token: any;
  let owner: any;
  let address: any;
  let address1: any;
  let address2: any;
  let contract: any;

  beforeEach(async () => {
    Token = await ethers.getContractFactory('TokenSwap');
    [owner, address1, address2, ...address] = await ethers.getSigners();
    contract = await Token.deploy();
  })

  describe("Contract Deployment", async () => {

    it("Should set the token owner", async () => {
      expect(await contract.founder()).to.equal(owner.address);
    })

    it("Should set the total balance to the owner", async () => {
      expect(Number(await contract.balanceOf(owner.address))).to.equal(Number(await contract.totalSupply()));
    })

  })
})