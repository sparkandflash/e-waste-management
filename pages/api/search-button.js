


export default async function handler(req, res) {
    const Result_NFTs = [""]
    console.log(req)
    try {
        const options = { q: req.name, chain: "rinkeby", filter: "name" };
        const NFTs = await Web3Api.token.searchNFTs(options);
        console.log(NFTs);
        res = NFTs;
}

catch (err)
{console.log(err)}
}


