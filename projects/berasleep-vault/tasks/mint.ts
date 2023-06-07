import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";

task("mint", "Mint token to specific address")
  .addParam("address", "Receiver address")
  .addParam("amount", "Amount")
  .setAction(async (taskArgs: any, hre: HardhatRuntimeEnvironment) => {
    const address = (taskArgs.address || "").trim();
    const amount = (taskArgs.amount || "").trim();
    const account = await hre.ethers.getSigners();
    const isAddress = hre.ethers.utils.isAddress(address);
    if (isAddress) {
      try {
        const contract = await hre.ethers.getContractAt(
          "BeraSleepToken",
          "0xC938173CccA0f3C917A0dC799B3dbEF89626fE2B",
          account[0]
        );
        const result = await contract.connect(account[0]).mint(address, amount);
        console.log("Transaction done with txh = ", result);
      } catch (error) {
        console.log(error);
      }
    }
  });
