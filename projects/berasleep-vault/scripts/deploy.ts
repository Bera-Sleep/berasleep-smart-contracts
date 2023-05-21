import { ethers, network, run } from "hardhat";

const main = async () => {
  const BeraSleepTokenContract = await ethers.getContractFactory("BeraSleepToken");
  const SyrupContract = await ethers.getContractFactory("SyrupBar");
  const currentBlock = await ethers.provider.getBlockNumber();
  const [deployer] = await ethers.getSigners();
  const admin = deployer.address;
  const treasury = deployer.address;

  const beraSleep = await BeraSleepTokenContract.deploy();
  const syrup = await SyrupContract.deploy(beraSleep.address);

  console.log("Deployer address", deployer.address);
  console.log("BeraSleepToken address: ", beraSleep.address);
  console.log("SyrupBar address: ", syrup.address);

  const MasterchefContract = await ethers.getContractFactory("MasterChef");
  const masterchef = await MasterchefContract.deploy(
    beraSleep.address,
    syrup.address,
    admin,
    ethers.BigNumber.from("1"),
    currentBlock
  );

  const BeraSleepVaultContract = await ethers.getContractFactory("BeraSleepVault");
  const beraSleepVault = await BeraSleepVaultContract.deploy(
    beraSleep.address,
    syrup.address,
    masterchef.address,
    admin,
    treasury
  );
  const VaultOwnerContract = await ethers.getContractFactory("VaultOwner");
  const vaultOwner = await VaultOwnerContract.deploy(beraSleep.address);

  console.log("MasterChefContract address: ", masterchef.address);
  console.log("BeraSleepVaultContract address: ", beraSleepVault.address);
  console.log("VaultOwner deployed to:", vaultOwner.address);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("error", error);
    process.exit(1);
  });
