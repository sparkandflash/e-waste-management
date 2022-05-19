import { Box, Image, useToast, Button, Spacer, Container, Heading, VStack, Center, Tag, Text } from '@chakra-ui/react'
import Header from '../components/Header';
import { ethers } from 'ethers';
import axios from 'axios'
import Web3Modal from 'web3modal';
import { useEffect, useState } from "react";
import { connectWallet, getCurrentWalletConnected } from "../utils/interact.js";
import { useRouter } from 'next/router'
//display profile details.

import {
  marketplaceAddress
} from '../config'

import NFTMarketplace from '../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json'


export default function MyProfile() {
  const addToast = useToast();
  const router = useRouter();
  const [nfts, setNfts] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  const [connected, setConnected] = useState("");
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [constatus, setConstatus] = useState(false);
  const [mintrole, setMintRole] = useState(true);

  async function loadNFTs() {
    const web3Modal = new Web3Modal({
      network: "mainnet",
      cacheProvider: true,
    })
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    const marketplaceContract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)
    const data = await marketplaceContract.fetchMyNFTs()

    const items = await Promise.all(data.map(async i => {
      const tokenURI = await marketplaceContract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenURI)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
        name: meta.data.name,
        description: meta.data.description,
        tokenURI
      }
      return item
    }))
    setNfts(items)
    setLoadingState('loaded')
  }
  function listNFT(nft) {
    console.log('nft:', nft)
    router.push(`/resell-nft?id=${nft.tokenId}&tokenURI=${nft.tokenURI}`)
  }
  const connectWalletPressed = async () => {
    try {
      const walletResponse = await connectWallet();
      setStatus(walletResponse.status);
      setWallet(walletResponse.address);
      setConnected(true);
    }
    catch (err) {
      setConstatus(false);
      addToast({
        title: "Alert!.",
        description: "you are on wrong network, please connect to rinkeby",
        status: "warning",
        duration: 9000,
        isClosable: true,
      })
    }
  };
  useEffect(async () => {
    const { address, status } = await getCurrentWalletConnected();
    setWallet(address)
    setStatus(status);
    window.sessionStorage.setItem('address', walletAddress);
    window.localStorage.setItem('status', constatus);
    window.localStorage.setItem('role', mintrole);
    console.log(walletAddress);

  }, []);

  useEffect(async () => {
    const { address, status } = await getCurrentWalletConnected();
    setWallet(address)
    setStatus(status);

    addWalletListener();
    loadNFTs();
  }, []);
  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("👆🏽 Write a message in the text-field above.");
        } else {
          setWallet("");
          setStatus("🦊 Connect to Metamask using the top right button.");
          window.localStorage.clear();

        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}

        </p>
      );
    }
  }
  function viewItem(nft) {

    router.push(`/itemProfile?id=${nft.tokenId}&tokenURI=${nft.tokenURI}`)
  }
  //if user is unregistered, that is, do an if else to check whther wallet address is stored in db or not






  // load data from chain/db for below variables
  let Registred = true;
  const user = {
    address: "some city/village",
    name: "some-nice-citizen",
    role: "Citizen",
    noOfowned: 2,
    itemsCreated: 3,
    itemsSold: 2,
    itemsBought: 5,
  }




  if (Registred != true) {
    router.push('/register')
  }
  if (loadingState === 'loaded' && !nfts.length) return (<h1>No NFTs owned</h1>)

  return (
    <div>
      <Header />
      {connected ?

        <Box padding={4}>
          <Box w='100%' borderRadius='lg' padding={5} borderWidth='1px'>
            <Center>
              <VStack padding={3}>
                <Image
                  borderRadius='full'
                  boxSize='150px'
                  src='https://cdn.discordapp.com/avatars/590741326786723868/bdc2ac3200d9f7b95fb7a436d6ec3330.png?size=1024' alt='Dan Abramov' />
                <Text fontSize='md'>{user.name}</Text>
                <Tag>{user.role}</Tag>


              </VStack>

            </Center>

            <Text borderRadius='lg' borderWidth='1px' padding=" 10px" fontSize='md'>wallet address: {walletAddress}<br />physical address : {user.address}</Text>
          </Box>
          <Container p={3}>
            <Center>
              <VStack>
                <Heading as='h5' size='sm'>
                  items
                </Heading>
                <Box>
                  <Text p={2}>Items owned: {nfts.length} Items created: {user.itemsCreated} Items sold: {user.itemsSold} Items bought: {nfts.length}</Text>
                </Box>
              </VStack>



            </Center>
            {
              nfts.map((nft, i) => (
                <div key={i}>
<Box bg='gray.200' w='fit-content' rounded={3} p={2}>
                  <Box key={i} w="250px" bg='gray.300' padding={3} m={2} rounded={6}>

                    <Box key={i} bg='gray.700' p={3} m={3} rounded={3}>
                      <Image key={i} rounded={5} boxSize='250px'
                        objectFit='cover' src={nft.image} />
                    </Box>
                    <Spacer key={i} />
                    <Box key={i} bg='gray.100' p={3} rounded={6}>
                      <Text key={i} color='black.500'> {nft.name}  </Text>
                      <p key={i} color='black.500'>desc- {nft.description}  </p>

                  
                      <Text key={i} isTruncated color='black.500'>owner- you  </Text>
                      <Text key={i} color='black.500' padding={1}>Price - {nft.price} eth </Text>
                    </Box>



                  </Box>
                  <Box key={i}>
                    <Button key={i} m={3} onClick={() => listNFT(nft)}>
                      resell
                    </Button>
                  
                    <Button key={i} onClick={() => viewItem(nft)}>
                      view
                    </Button>
                  </Box>
                  </Box>

                </div>

              ))
            }

            {
              // display all items owned by the user
            }
          </Container>
        </Box>
        :
        <Container p={5} h="500px" maxW="container.lg" centerContent='true'>

          <Box m="auto" shadow="lg" p={4} opacity="90%" blur="3px" bg="blue.300" rounded="10px" h="350px">

            <Box h="90px" p={3}>

              <Text color="black.500" fontSize="2xl" fontWeight="bold" align="center">
                E-waste management system using blockchain
              </Text>
              <Center h="40">
                <VStack>


                  <Button size="lg" onClick={() => connectWalletPressed()}>Connect</Button>
                </VStack>

              </Center>

              <Text color="black.300" fontSize="md" align="center">
                use your browser wallet extension to connect to the D-app
              </Text>
            </Box>



          </Box>


        </Container>



      }
    </div>
  )
}
//items before container end tag