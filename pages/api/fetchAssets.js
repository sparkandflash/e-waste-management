const opensea = require('opensea-js')
import { ethers } from 'ethers'

import Web3Modal from 'web3modal'


// Initialize the cors middleware

export default async function handler(req, res) {
    const OpenSeaPort = opensea.OpenSeaPort;
    const Network = opensea.Network;
    const web3Modal = new Web3Modal({
        network: 'mumbai',
        cacheProvider: true,
    })

    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)


    const seaport = new OpenSeaPort(provider, {
        networkName: Network.Main
    });



    // the rest of your code




    try {



        const assets = await seaport.getAsset({
            tokenAddress: "0x811FC4BD2F94AFe0A15D22D483Df7720334a4884", // CryptoKitties
            tokenId: null,
            schemaName: "ERC721"
        })

        const items = assets;
        console.log(items.length)
        const tokens = { 'items': items }
        res.send(tokens);

    }
    catch (ex) {
        console.log(ex);
    }
}

