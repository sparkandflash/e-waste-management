import {  Container, Button, VStack,Text, Box, Center } from "@chakra-ui/react";

function StoreFac() {
    
    return (
        <div>
         
            <Container p={5}  h="500px" maxW="container.lg" centerContent='true'>
      
      <Box  m="auto" shadow="lg" p={4} opacity="90%" blur="3px" bg="blue.500" rounded="10px"  h="350px">

        <Box h="90px"  p={3}>

          <Text color="blue.100" fontSize="2xl" fontWeight="bold" align="center">
          Hello storage providers
          </Text>
          <Center h = "40">
          <VStack>
          <Button size= "md">Accept items</Button> 
          <Button size= "md">Track items</Button>
         
          </VStack>
          </Center>
          
          <Text color="gray.300" fontSize="md" align="center">
        Accept new e-waste items from collectors or processors and store them as required.
          </Text>
        </Box>

       

      </Box>
   
    </Container>
        </div>
    )
}

export default StoreFac