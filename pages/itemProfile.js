import Header from '../components/Header';
import {
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Spacer,
    useDisclosure,
Modal,
Table,
Thead,
Tbody,
Tfoot,
Tr,
Th,
Td,
TableCaption,
TableContainer,
    ModalCloseButton, Text, Container, Box, Button, Image
} from "@chakra-ui/react";
import { ethers } from 'ethers';
import axios from 'axios'

import { useEffect,  useState } from "react";
import { useRouter } from 'next/router'
import ResellNFT from '../components/ResellNft';
import Web3Modal from 'web3modal'
import {
    marketplaceAddress
} from '../config'

import NFTMarketplace from '../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json';

export default function ItemProfile() {
    const router = useRouter();
    const [nft, setNft] = useState([])
    const { id, tokenURI } = router.query
    const { isOpen, onOpen, onClose } = useDisclosure()

    async function loadNFTs() {
       
        
        const EwasteItem = {
            price : null,
            tokenId: "",
            seller: "",
            owner: "",
            image :null,
            name: "",
            description :"",
            tokenURI
          }
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
            if(item.tokenId==id)
            {
  EwasteItem = item;
            }
            return item
          }))
         
          setNft(EwasteItem);

    }
    useEffect(() => {
        loadNFTs()
      }, [])
    function txnData() {

    }
    return (
        <div>
            <Header />
            <Container>
                
                <Box  bg='gray.200' w='fit-content' rounded={3} p={2}>
                    <Box  w="250px" bg='gray.300' padding={3} m={2} rounded={6}>

                      <Box  bg='gray.700' p={3} m={3} rounded={3}>
                        <Image rounded={5} boxSize='250px'
                          objectFit='cover' src={nft.image} />
                      </Box>
                      <Spacer />
                      <Box bg='gray.100' p={3} rounded={6}>
                        <Text color='black.500'> {nft.name}  </Text>
                        <p color='black.500'>desc- {nft.description}  </p>


                        <Text isTruncated color='black.500'>owner- {nft.owner}  </Text>
                        <Text color='black.500' padding={1}>Price - {nft.price} eth </Text>
                      </Box>



                    </Box>
                    <Box >
                    </Box>
                  </Box>
                <Button m={3} onClick={onOpen}>
                    resell
                </Button>
                <Button m={3} >
                    transfer
                </Button>
                <Button m={3} >
                    burn
                </Button>
                <TableContainer>
  <Table size='md'>
    <Thead>
      <Tr>
        <Th>event</Th>
        <Th>price</Th>
        <Th>from</Th>
        <Th>to</Th>
        <Th>date</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td>listed</Td>
        <Td>0.005</Td>
        <Td isTruncated>{nft.owner}</Td>
        <Td>marketplace</Td>
        <Td>10/2/2022</Td>
      </Tr>
    </Tbody>
  </Table>
</TableContainer>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader >Resell {nft.name} ? </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody >
                            <ResellNFT   {...nft} />
                        </ModalBody>
                    </ModalContent>
                </Modal>

            </Container>
        </div>
    )
}