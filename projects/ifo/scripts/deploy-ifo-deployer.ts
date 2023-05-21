import { ethers, network, run } from "hardhat";
import config from "../config";

const main = async () => {
  const { name } = network;

  console.log(`Deploying to: ${name}...`);
  const IFODeployer = await ethers.getContractFactory("IFODeployer");
  const ifoDeployer = await IFODeployer.deploy(config.BeraSleepProfile[name]);
  console.log("IFODeployer deployed to:", ifoDeployer.address);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
