
import { Container, Checkbox, HStack, Textarea,CheckboxGroup, Input, Button, VStack, Text, Box, Center } from "@chakra-ui/react";
import { useEffect, useState } from "react";
function Register () {
 
    const walletAddress ="";
    useEffect(() => {
walletAddress=  window.sessionStorage.getItem('address');
    })
   
    
console.log(walletAddress);

    return (
        <div>
       
            <Container p={5} h="800px" maxW="container.lg" centerContent='true'>

                <Box m="auto" shadow="lg" p={4} opacity="90%" blur="3px" bg="blue.500" rounded="10px" h="550px">

                    <Box h="100px" p={4}>

                        <Text color="blue.100" fontSize="2xl" fontWeight="bold" align="center">
                            Hello User! what would you like to register as?
                        </Text>
                        <Center height="400">
                            <VStack>
           
                            
                                <Text color="blue.50" fontWeight="bold" mb='8px'>Username</Text>
                                <Input />
                                 <Text color="blue.50" fontWeight="bold" mb='8px'>user address:</Text>
                                <Textarea


                                    onChange={e => updateFormInput({ ...formInput, userAddress: e.target.value })}
                                />
                                <Text color="blue.50" fontWeight="bold" mb='8px'>Profile Picture</Text>
                                <Input variant="unstyled" type="file" />
                                <Button size="md">submit</Button>
                            </VStack>
                        </Center>

                   =
                    </Box>



                </Box>

            </Container>
        </div>
    )
}

export default Register
