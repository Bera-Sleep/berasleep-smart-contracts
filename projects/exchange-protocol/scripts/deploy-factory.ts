import { ethers, network, run } from "hardhat";
import config from "../config";

const main = async () => {
  const { name } = network;
  const [deployer] = await ethers.getSigners();
  const admin = deployer.address;

  const BeraSleepFactoryContract = await ethers.getContractFactory("BeraSleepFactory");

  const beraSleepFactory = await BeraSleepFactoryContract.deploy(
    admin,
  );

  console.log("BeraSleepFactoryContract: ", beraSleepFactory.address);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("error", error);
    process.exit(1);
  });
