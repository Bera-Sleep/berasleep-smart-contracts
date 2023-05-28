import { ethers, network, run } from "hardhat";
import config from "../config";

const main = async () => {
  const MasterChefV2Contract = await ethers.getContractFactory("MasterChefV2");
  const { name } = network;

  const [deployer] = await ethers.getSigners();
  const burnAdmin = deployer.address;

  console.log("Deployer address", deployer.address);

  const masterchefV2 = await MasterChefV2Contract.deploy(
    config.MasterChefV2[name],
    config.BeraSleep[name],
    config.MasterPID[name],
    burnAdmin
  );
  console.log("MasterChefV2 deployed to ", masterchefV2.address);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("error", error);
    process.exit(1);
  });
