/* import moralis */
const Moralis = require("moralis/node");
const serverUrl = "https://bqcf0oov4qhb.usemoralis.com:2053/server";
const appId = "APpSTgc0Q9a4CIsoNIl4Ti6depA4qfCFnRI7Dv4N";
const moralisSecret = "Z6zhn8diSjTcLCVV8zgCiRUyzHR2O5Ql7VTyOZpSPA8ZphIgyBWJTP6Ukwwwx7lj";

const web3API = async () => {
  await Moralis.start({ serverUrl, appId, moralisSecret });

  const options = { chain: "mumbai", address: "0x...", token_address: "0x811FC4BD2F94AFe0A15D22D483Df7720334a4884" };
const polygonNFTs = await Moralis.Web3API.account.getNFTsForContract(options);
};

web3API();
