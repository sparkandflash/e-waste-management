require("@nomiclabs/hardhat-waffle");
const fs = require('fs');
// const infuraId = fs.readFileSync(".infuraid").toString().trim() || "";
const MUMBAI_PRIVATE_KEY = "";
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337
    },
    
   /* mumbai: {
      // Infura
      url: `https://polygon-mumbai.g.alchemy.com/v2/i3d8BCEojCnlceh0jLjlyIEC2r8OdTjK`,
    // url: "https://rpc-mumbai.matic.today",
      accounts: [`${MUMBAI_PRIVATE_KEY}`]
    },*/
    rinkeby: {
      url: "https://speedy-nodes-nyc.moralis.io/255baec1b14ec7a2a5f7f063/eth/rinkeby", //Infura url with projectId
      accounts: [``] // add the account that will deploy the contract (private key)
     },
    /*
    matic: {
      // Infura
      // url: `https://polygon-mainnet.infura.io/v3/${infuraId}`,
      url: "https://rpc-mainnet.maticvigil.com",
      accounts: [process.env.privateKey]
    }
    */
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};

