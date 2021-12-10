import {  Container, Button, VStack,Text, Box, Center } from "@chakra-ui/react";
import { useRouter } from 'next/router'
  
import Header from '../components/Header';

export default function Home() {
  //function to keep track of web3 connection -> if connected then show connected and show 
  //homepage for the service provider or customer if not then show default login page
  const router = useRouter()
  return (
    
    <div>
      <Header />
       <Container p={5}  h="500px" maxW="container.lg" centerContent='true'>
      
      <Box  m="auto" shadow="lg" p={4} opacity="90%" blur="3px" bg="blue.500" rounded="10px"  h="350px">

        <Box h="90px"  p={3}>

          <Text color="blue.100" fontSize="2xl" fontWeight="bold" align="center">
          E-waste management system using blockchain
          </Text>
          <Center h = "40">
          <VStack>
          <Button size= "lg">Connect</Button> 
          <Button size= "lg" onClick={() => router.push('/guest')}>Guest login</Button>
          </VStack>
          </Center>
          
          <Text color="gray.300" fontSize="md" align="center">
          use your browser wallet extension to connect to the D-app
          </Text>
        </Box>

       

      </Box>
   
    </Container>
    </div>
  )
}
