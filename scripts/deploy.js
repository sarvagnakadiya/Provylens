const hre = require("hardhat");

async function main() {
  // Deploy the provylensFactory contract
  const provylensFactory = await hre.ethers.getContractFactory(
    "provylensFactory"
  );
  const provylensFactoryInstance = await provylensFactory.deploy();
  await provylensFactoryInstance.deployed();
  console.log(
    "provylensFactory deployed to:",
    provylensFactoryInstance.address
  );

  // Deploy the userDetailsFactory contract
  const userDetailsFactory = await hre.ethers.getContractFactory(
    "userDetailsFactory"
  );
  const userDetailsFactoryInstance = await userDetailsFactory.deploy();
  await userDetailsFactoryInstance.deployed();
  console.log(
    "userDetailsFactory deployed to:",
    userDetailsFactoryInstance.address
  );

  /* // Deploy the provylens contract
  const provylens = await hre.ethers.getContractFactory("provylens");
  const provylensInstance = await provylens.deploy();
  await provylensInstance.deployed();
  console.log("provylens address:", provylensInstance.address); */
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
