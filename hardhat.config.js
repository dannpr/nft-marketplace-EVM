require("@nomiclabs/hardhat-waffle");

const testmat = "N5gZqsy9imVP8JOYdhT2BxusQMUJ8Hm0"
module.exports = {
  network : {
    hardhat : {
      chainId : 1337
    },
    mumbai : {
      // mettre le liens d'acces apres v2 en ${}
      url: `https://polygon-mumbai.g.alchemy.com/v2/${testmat}`
    }
  },
  solidity: "0.8.4",
};
