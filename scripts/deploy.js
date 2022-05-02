
const hre = require("hardhat");
const fs = require('fs');

async function main() {
  const NFTmarketp = await hre.ethers.getContractFactory("NFTMarketplace");
  const nftMarketp = await NFTmarketp.deploy();
  await nftMarketp.deployed();

  console.log("NFT marketplace deployed to:", nftMarketp.address);

  // right in the file the new address
  fs.writeFileSync('./config.js', `
  export const marketAddress = "${nftMarketp.address}"
  `)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
