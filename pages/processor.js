import {  Container, Button, VStack,Text, Box, Center } from "@chakra-ui/react";
import Header from '../components/Header';
function processor() {
    
    return (
        <div>
            <Header />
            <Container p={5}  h="500px" maxW="container.lg" centerContent='true'>
      
      <Box  m="auto" shadow="lg" p={4} opacity="90%" blur="3px" bg="blue.500" rounded="10px"  h="350px">

        <Box h="90px"  p={3}>

          <Text color="blue.100" fontSize="2xl" fontWeight="bold" align="center">
          Hello processor
          </Text>
          <Center h = "40">
          <VStack>
          <Button size= "md">Accept items</Button>
          <Button size= "md">Update item status</Button> 
          <Button size= "md">Track items</Button>
         
          </VStack>
          </Center>
          
          <Text color="gray.300" fontSize="md" align="center">
        Accept new items from collectors or storage facilities, <br /> update item status as required.
          </Text>
        </Box>

       

      </Box>
   
    </Container>
        </div>
    )
}

export default processor