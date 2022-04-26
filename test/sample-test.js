const { expect } = require("chai");
const { ethers } = require("hardhat");
const assert = require('assert');

describe("NFTMarket", function () {

  it("Should should and execute market sales", async function () {

    const Market = await ethers.getContractFactory("NFTMarket")
    const market = await Market.deploy()
    await market.deployed()
    const marketAddress = market.address

    const NFT = await ethers.getContractFactory("NFT")
    const nft = await NFT.deploy(marketAddress)
    await nft.deployed()
    const nftContractAddress = nft.address


    console.log('nft contract :' ,nftContractAddress)

    let listingPrice = await market.getListingPrice()
    listingPrice = listingPrice.toString()
    console.log('listing Price : ',listingPrice)
    const auctionPrice = ethers.utils.parseUnits('100','ether')
    console.log('Auction price :' ,auctionPrice)

    await nft.createToken("ipfs://QmbHtYYNXmwn3ugbJAyfLakooHJxKVXRQqYbETgAVp8BDv")
    await nft.createToken("ipfs://QmbHtYYNXmwn3ugbJAyfLakooHJxKVXRQqYbETgAVp8BDv")

    await market.createMarketItem(nftContractAddress, 1, auctionPrice, {value : listingPrice})
    await market.createMarketItem(nftContractAddress, 2, auctionPrice, {value : listingPrice})

    const [_, buyerAddress] = await ethers.getSigners()

    await market.connect(buyerAddress).createMarketSale(nftContractAddress, 1, { value :auctionPrice })

    let items = await market.fetchMarketItems()

    items = await Promise.all(items.map(async i => {
      const tokenUri = await nft.tokenURI(i.tokenId)
      let item =  {
        price: i.price.toString(),
        tokenId: i.tokenId.toString(),
        seller: i.seller,
        owner: i.owner,
        tokenUri
      }
    }))
    console.log('items:', items)

    return items;

  });
});
