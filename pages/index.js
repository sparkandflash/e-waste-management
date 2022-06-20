import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { Text, Stack, Heading,Grid, GridItem, useToast, Box, Button, Spacer, Image } from "@chakra-ui/react";
import axios from 'axios'
import Web3Modal from 'web3modal'
import Header from '../components/Header';
import {
  marketplaceAddress
} from '../config'

import NFTMarketplace from '../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json'

export default function Home() {
  const addToast = useToast();
  const [nfts, setNfts] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')

  async function loadNFTs() {
    try {
      const provider = new ethers.providers.JsonRpcProvider("https://rinkeby.infura.io/v3/fafcbeac5aeb44218662cb082acbdc66")
      const contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, provider)
      const data = await contract.fetchMarketItems()

      const items = await Promise.all(data.map(async i => {
        const tokenUri = await contract.tokenURI(i.tokenId)
        const meta = await axios.get(tokenUri)
        let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
        }
        return item
      }))

      setNfts(items)
      setLoadingState('loaded')
    }
    catch (err) {
      console.log(err);
      addToast({
        title: "Alert!.",
        description: "you are on wrong network, please connect to rinkeby",
        status: "warning",
        duration: 9000,
        isClosable: true,
      })
    }
  }
  async function buyNft(nft) {
    /* needs the user to sign the transaction, so will use Web3Provider and sign it */
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)

    /* user will be prompted to pay the asking proces to complete the transaction */
    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')
    const transaction = await contract.createMarketSale(nft.tokenId, {
      value: price
    })
    await transaction.wait()
    loadNFTs()
  }
  useEffect(() => {
    loadNFTs()
  }, [])
  if (loadingState === 'loaded' && !nfts.length) return (<div><Header /><h1>No Items listed</h1></div>)

  return (
    <div>
      <Header />
      <Box padding={5}>
        
        <Box rounded={6} border='1px' borderColor='gray.300' padding='15px'>
        
        <Grid templateColumns='repeat(5, 1fr)' gap={2}>
            {
              nfts.map((nft, i) => (
                <div key={i}>

                  <Box  w="fit-content" bg='gray.300' padding={3} m={1} rounded={6}>

                    <Box  w="280px" bg='gray.700' p={1} marginBottom='12px' rounded={6}>
                      <Image rounded={6} boxSize='280px'
                        objectFit='cover' src={nft.image} />
                    </Box>
                    <Spacer />
                    <Box width='280px' key={i} bg='gray.100' p={4} rounded={6}>
                      <Text  color='black.500'> {nft.name}  </Text>
                      <Text  color='black.500'> id -{nft.tokenId}  </Text>
                      <p  color='black.500'>desc- {nft.description}  </p>

                      <Text isTruncated color='black.500'>seller - {nft.seller}  </Text>
                    
                      <Text  color='black.500' padding={1}>Price - {nft.price} eth </Text>
                    </Box>
                   
                    <Box marginTop='10px' >
                    <Button  onClick={() => buyNft(nft)}>
                      buy
                    </Button>
                  </Box>


                  </Box>
                  


                </div>

              ))
            }
          </Grid>
        </Box>
      </Box>
    </div>
  )
}
