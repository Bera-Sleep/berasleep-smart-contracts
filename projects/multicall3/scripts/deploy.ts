import { ethers, network, run } from "hardhat";
import config from "../config";

const main = async () => {
  const Multicall3 = await ethers.getContractFactory("Multicall3");

  const multicall3 = await Multicall3.deploy();

  console.log("Multicall3: ", multicall3.address);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("error", error);
    process.exit(1);
  });
