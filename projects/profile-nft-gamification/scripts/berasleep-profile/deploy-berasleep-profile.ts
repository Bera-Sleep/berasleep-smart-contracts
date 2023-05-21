import { ethers, network } from "hardhat";
import { parseEther } from "ethers/lib/utils";
import config from "../../config";

const currentNetwork = network.name;

const main = async () => {
  console.log("Deploying to network:", currentNetwork);

  const _numberBeraSleepToRegister = parseEther("1"); // 1 CAKE
  const _numberBeraSleepToReactivate = parseEther("2"); // 2 CAKE
  const _numberBeraSleepToUpdate = parseEther("2"); // 2 CAKE

  const BeraSleepProfile = await ethers.getContractFactory("BeraSleepProfile");

  const beraSleepProfile = await BeraSleepProfile.deploy(
    config.BeraSleepToken[currentNetwork],
    _numberBeraSleepToReactivate,
    _numberBeraSleepToRegister,
    _numberBeraSleepToUpdate
  );

  console.log("BeraSleepProfile deployed to:", beraSleepProfile.address);

  await beraSleepProfile.addTeam(
    "Syrup Storm",
    "ipfs://QmamkDch4WBYGbchd6NV7MzPvG1NgWqWHNnYogdzreNtBn/syrup-storm.json"
  );
  await beraSleepProfile.addTeam(
    "Fearsome Flippers",
    "ipfs://QmamkDch4WBYGbchd6NV7MzPvG1NgWqWHNnYogdzreNtBn/fearsome-flippers.json"
  );
  await beraSleepProfile.addTeam(
    "Chaotic Cakers",
    "ipfs://QmamkDch4WBYGbchd6NV7MzPvG1NgWqWHNnYogdzreNtBn/chaotic-cakers.json"
  );
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
