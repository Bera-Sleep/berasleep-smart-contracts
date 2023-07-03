import { ethers, network, run } from "hardhat";

const main = async () => {
  const ERC721NFTMarketV1 = await ethers.getContractFactory("ERC721NFTMarketV1");

  const admin = "0x10A0031781971bd37504354BBa49299885aD5cd4";
  const treasury = "0x10A0031781971bd37504354BBa49299885aD5cd4";
  const WBera = "0x11DC191B1D664fcE05565A456C80aE81AB4914e9";
  const minimumAskPrice = "5000000000000000"; // 0.005 WBERA
  const maximumAskPrice = "10000000000000000000000"; // 10,000 WBERA

  const contract = await ERC721NFTMarketV1.deploy(admin, treasury, WBera, minimumAskPrice, maximumAskPrice);

  console.log("ERC721NFTMarketV1 address: ", contract.address);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("error", error);
    process.exit(1);
  });
