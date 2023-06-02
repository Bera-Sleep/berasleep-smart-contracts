import { ethers, network, run } from "hardhat";

const main = async () => {
  const CrossFamingVaultContract = await ethers.getContractFactory("CrossFarmingVault");
  const [deployer] = await ethers.getSigners();
  const admin = deployer.address;

  const crossFamingVault = await CrossFamingVaultContract.deploy();

  console.log("CrossFamingVault address", crossFamingVault.address);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("error", error);
    process.exit(1);
  });
