import { Box, Image, useToast, Button, Container, Heading, VStack, Center, Tag, Text } from '@chakra-ui/react'
import Header from '../components/Header';
import { useEffect, useState } from "react";
import { connectWallet, getCurrentWalletConnected } from "../utils/interact.js";
import { useRouter } from 'next/router'
//display profile details.




export default function MyProfile() {
  const addToast = useToast();
  const router = useRouter()
  const [connected, setConnected] = useState("");
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [constatus, setConstatus] = useState(false);
  const [mintrole, setMintRole] = useState(true);

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
                  <Text>Items owned: {user.noOfowned} Items created: {user.itemsCreated} Items sold: {user.itemsSold} Items bought: {user.itemsBought}</Text>
                </Box>
              </VStack>



            </Center>


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