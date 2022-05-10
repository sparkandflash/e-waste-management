import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import {  Text, Stack, Heading, useToast, Box, Image } from "@chakra-ui/react";
import axios from 'axios'
import Web3Modal from 'web3modal'
import Header from '../components/Header';
import {
  marketplaceAddress
} from '../config'

import NFTMarketplace from '../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json'

export default function CreatorDashboard() {
  const addToast = useToast();
  const [nfts, setNfts] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  
  async function loadNFTs() {
    try{
    const web3Modal = new Web3Modal({
      network: 'mainnet',
      cacheProvider: true,
    })
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    const contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)
    const data = await contract.fetchItemsListed()

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
      }
      return item
    }))

    setNfts(items)
    setLoadingState('loaded')
  }
  catch (err) {
    addToast({
      title: "Alert!.",
      description: "you are on wrong network, please connect to rinkeby",
      status: "warning",
      duration: 9000,
      isClosable: true,
    })
  }
  }
  useEffect(() => {
    loadNFTs()
  }, [])
  if (loadingState === 'loaded' && !nfts.length) return (<div><Header /><h1>No Items listed</h1></div>)

  return (
    <div>
      <Header />
      <Box padding={5}>
        <Heading padding='12px' size='md' >Items listed by citizens:</Heading>
        <Box rounded={6} border='1px' borderColor='gray.300' padding='12px'>
        <Stack direction={['column', 'row']} spacing='24px'>
          {
            nfts.map((nft, i) => (
             
                  
               <Box key={i} w="250px" bg='gray.300' padding={3} m={2} rounded={6}  >
                  <Image rounded={5} boxSize='250px'
                    objectFit='cover' src={nft.image} />
                  <Text color='black.500' padding={3}>Price - {nft.price} eth </Text>
                  <Text isTruncated color='black.500' >seller - {nft.seller}  </Text>
                  <Text isTruncated color='black.500' >owner- {nft.owner}  </Text>
                </Box>
              
            
                

           
            ))
          }
           </Stack>
        </Box>
      </Box>
    </div>
  )
}