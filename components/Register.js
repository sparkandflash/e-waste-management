
import { Container, Checkbox, HStack, CheckboxGroup, Input, Button, VStack, Text, Box, Center } from "@chakra-ui/react";
import { useEffect, useState } from "react";
function Register () {
 
    const walletAddress ="";
    useEffect(() => {
walletAddress=  window.sessionStorage.getItem('address');
    })
   
    
console.log(walletAddress);

    return (
        <div>
       
            <Container p={5} h="600px" maxW="container.lg" centerContent='true'>

                <Box m="auto" shadow="lg" p={4} opacity="90%" blur="3px" bg="blue.500" rounded="10px" h="450px">

                    <Box h="100px" p={4}>

                        <Text color="blue.100" fontSize="2xl" fontWeight="bold" align="center">
                            Hello User! what would you like to register as?
                        </Text>
                        <Center height="300">
                            <VStack>
                               <Text color="blue.200">wallet address: {walletAddress} </Text>
                            
                                <Text color="blue.50" fontWeight="bold" mb='8px'>Username</Text>
                                <Input />
                                <CheckboxGroup color="white" colorScheme='white' >
                                    <HStack>

                                        <Checkbox >
                                            <Text color="blue.50" mb='8px'>citizen</Text>
                                        </Checkbox>
                                        <Checkbox >
                                            <Text color="blue.50" mb='8px'> Storage facility</Text>
                                        </Checkbox>
                                        <Checkbox >
                                            <Text color="blue.50" mb='8px'>collector</Text>
                                        </Checkbox>
                                        <Checkbox >
                                            <Text color="blue.50" mb='8px'> Processor </Text>
                                        </Checkbox>
                                    </HStack>
                                </CheckboxGroup>
                                <Text color="blue.50" fontWeight="bold" mb='8px'>Profile Picture</Text>
                                <Input variant="unstyled" type="file" />
                                <Button size="md">submit</Button>
                            </VStack>
                        </Center>

                        <Text color="gray.300" fontSize="md" align="center">
                            you can register only once for a wallet address.
                        </Text>
                    </Box>



                </Box>

            </Container>
        </div>
    )
}

export default Register