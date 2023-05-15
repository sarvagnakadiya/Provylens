const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("provylensFactory contract", function () {
  let factory;
  let owner;
  let addr1;

  beforeEach(async function () {
    const ProvylensFactory = await ethers.getContractFactory(
      "provylensFactory"
    );
    [owner, addr1] = await ethers.getSigners();
    factory = await ProvylensFactory.connect(owner).deploy();
  });

  it("should deploy user details and provylens contracts and map to the sender's address", async function () {
    await factory.deployMyContract();
    const userDetailsAddress = await factory.getUserDetailsContract(
      addr1.address
    );
    const provylensAddress = await factory.getDeployedContract(addr1.address);
    const UserDetails = await ethers.getContractFactory("userDetails");
    const Provylens = await ethers.getContractFactory("provylens");
    const userDetailsInstance = await UserDetails.attach(userDetailsAddress);
    const provylensInstance = await Provylens.attach(provylensAddress);
    expect(userDetailsInstance.address).to.not.equal(
      ethers.constants.AddressZero
    );
    expect(provylensInstance.address).to.not.equal(
      ethers.constants.AddressZero
    );
    expect(await userDetailsInstance.owner()).to.equal(addr1.address);
    expect(await provylensInstance.owner()).to.equal(addr1.address);
  });
});
