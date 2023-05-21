import { ethers, network, run } from "hardhat";
import { parseEther } from "ethers/lib/utils";
import config from "../config";

const main = async () => {
  const { name } = network;
  console.log(`Deploying to ${name} ...`);

  const IFOV2 = await ethers.getContractFactory("IFOV2");

  if (name === "mainnet") {
    const ifoV2 = await IFOV2.deploy(
      config.LPToken[name],
      config.OfferingToken[name],
      config.BeraSleepProfile[name],
      config.StartBlock[name],
      config.EndBlock[name],
      config.AdminAddress[name]
    );

    await ifoV2.deployed();
    console.log("IFOV2 deployed to:", ifoV2.address);
  } else if (name === "testnet") {
    const MockBEP20 = await ethers.getContractFactory("MockBEP20");
    const offeringToken = await MockBEP20.deploy("Offering Coin", "OC", parseEther("10000000"));
    const lpToken = await MockBEP20.deploy("LPToken", "LPT", parseEther("10000000"));

    const ifoV2 = await IFOV2.deploy(
      lpToken.address,
      offeringToken.address,
      config.BeraSleepProfile[name],
      config.StartBlock[name],
      config.EndBlock[name],
      config.AdminAddress[name]
    );

    console.log("OC32 token deployed to:", offeringToken.address);
    console.log("LPToken deployed to:", lpToken.address);
    console.log("IFOV2 deployed to:", ifoV2.address);
  }
};
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
