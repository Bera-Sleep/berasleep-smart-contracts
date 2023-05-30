import { ethers, network, run } from "hardhat";
import config from "../config";

const main = async () => {
  const { name } = network;
  const [deployer] = await ethers.getSigners();
  const treasury = deployer.address;
  const admin = deployer.address;

  const BeraSleepFlexiblePoolContract = await ethers.getContractFactory("BeraSleepFlexiblePool");

  const beraSleepFlexiblePool = await BeraSleepFlexiblePoolContract.deploy(
    config.BeraSleep[name],
    config.BeraSleepPool[name],
    admin,
    treasury
  );

  console.log("BeraSleepFlexiblePool: ", beraSleepFlexiblePool.address);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("error", error);
    process.exit(1);
  });
