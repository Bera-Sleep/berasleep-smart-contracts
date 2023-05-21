import { ethers, network, run } from "hardhat";

const main = async () => {
  const BeraSleepBunniesContract = await ethers.getContractFactory("BeraSleepBunnies");

  const beraSleepBunnies = await BeraSleepBunniesContract.deploy();

  console.log("BeraSleepBunniesContract address: ", beraSleepBunnies.address);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("error", error);
    process.exit(1);
  });
