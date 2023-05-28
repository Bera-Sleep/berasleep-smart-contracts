import { ethers, network, run } from "hardhat";
import config from "../config";

const main = async () => {
  const { name } = network;
  const [deployer] = await ethers.getSigners();
  const admin = deployer.address;
  const treasury = deployer.address;
  const operator = deployer.address;

  const BeraSleepPoolContract = await ethers.getContractFactory("BeraSleepPool");

  const beraSleepPool = await BeraSleepPoolContract.deploy(
    config.BeraSleep[name],
    config.MasterChefV2[name],
    admin,
    treasury,
    operator,
    config.pid[name]
  );

  console.log("BeraSleepPool: ", beraSleepPool.address);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("error", error);
    process.exit(1);
  });
