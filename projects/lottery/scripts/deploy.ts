import { ethers, network } from "hardhat";
import config from "../config";

const main = async (withVRFOnTestnet = false) => {
  let randomNumberGeneratorContract;
  const currentNetwork = network.name;
  const beraSleepToken = config.BeraSleepToken[currentNetwork];
  const BeraSleepLottery = await ethers.getContractFactory("BeraSleepLottery");
  console.log("Deploy to ", currentNetwork);
  if (withVRFOnTestnet) {
    const RandomNumberGenerator = await ethers.getContractFactory("RandomNumberGenerator");

    const randomNumberGenerator = await RandomNumberGenerator.deploy(
      config.VRFCoordinator[currentNetwork],
      config.LinkToken[currentNetwork]
    );
    console.log("RandomNumberGenerator deployed to:", randomNumberGenerator.address);
    randomNumberGeneratorContract = randomNumberGenerator;
    // Set fee
    await randomNumberGenerator.setFee(config.FeeInLink[currentNetwork]);
    // Set key hash
    await randomNumberGenerator.setKeyHash(config.KeyHash[currentNetwork]);
  } else {
    console.log("RandomNumberGenerator without VRF is deployed..");
    const RandomNumberGenerator = await ethers.getContractFactory("MockRandomNumberGenerator");
    const randomNumberGenerator = await RandomNumberGenerator.deploy();
    console.log("RandomNumberGenerator deployed to:", randomNumberGenerator.address);
    randomNumberGeneratorContract = randomNumberGenerator;
  }
  const pancakeSwapLottery = await BeraSleepLottery.deploy(beraSleepToken, randomNumberGeneratorContract.address);
  console.log("BeraSleepLottery deployed to:", pancakeSwapLottery.address);

  // Set lottery address
  await randomNumberGeneratorContract.setLotteryAddress(pancakeSwapLottery.address);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("error", error);
    process.exit(1);
  });
