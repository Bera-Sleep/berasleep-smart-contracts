import { ethers, network, run } from "hardhat";

const main = async () => {
  const { name } = network;
  console.log(`Deploying to: ${name}...`);
  const CoinFactory = await ethers.getContractFactory("CoinFactory");
  const coinFactory = await CoinFactory.deploy();
  console.log("CoinFactory deployed to:", coinFactory.address);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
