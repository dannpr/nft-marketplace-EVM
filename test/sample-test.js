describe("NFTMarket", function () {
  it("Should create and execute market sales", async function () {

    const NFTMarketplace = await ethers.getContractFactory("NFTMarketplace")
    const nftMarketplace = await NFTMarketplace.deploy()
    await nftMarketplace.deployed()

    let listingPrice = await nftMarketplace.getListingPrice()
    listingPrice = listingPrice.toString()

    const auctionPrice = ethers.utils.parseUnits('1', 'ether')

    await nftMarketplace.createToken("ipfs://bafkreifnjows2gck3yjiucc5ve4rbulj42enewdgpp34hm7gg53yqlvoli/", auctionPrice, { value: listingPrice })
    await nftMarketplace.createToken("ipfs://bafybeiel5jjvtxelqbkiswbr6df7xolerrcke7zx5awocqs6bizdbiqwdi/", auctionPrice, { value: listingPrice })

    const [_, buyerAddress] = await ethers.getSigners()

    await nftMarketplace.connect(buyerAddress).createMarketSale(1, { value: auctionPrice })

    await nftMarketplace.connect(buyerAddress).resellToken(1, auctionPrice, { value: listingPrice })

    items = await nftMarketplace.fetchMarketItems()
    items = await Promise.all(items.map(async i => {
      const tokenUri = await nftMarketplace.tokenURI(i.tokenId)
      let item = {
        price: i.price.toString(),
        tokenId: i.tokenId.toString(),
        seller: i.seller,
        owner: i.owner,
        tokenUri
      }
      return item
    }))
    console.log('items: ', items)
  })
})