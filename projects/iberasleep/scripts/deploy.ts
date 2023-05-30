import { ethers, network, run } from "hardhat";
import config from "../config";

const main = async () => {
  const { name } = network;
  const IBeraSleepContract = await ethers.getContractFactory("IBeraSleep");

  const iBeraSleep = await IBeraSleepContract.deploy(
    config.BeraSleepPool[name],
    config.Admin[name],
    config.ceiling[name]
  );

  console.log("iBeraSleep: ", iBeraSleep.address);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("error", error);
    process.exit(1);
  });
