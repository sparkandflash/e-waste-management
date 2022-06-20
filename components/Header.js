
import {
    FormControl, Flex, Spacer, Input, FormLabel, Text, Button, Box, Stack, VStack
} from "@chakra-ui/react"
import { useEffect, useState } from "react";
import ServiceSearch from '../components/ServiceSearch';
import { useRouter } from 'next/router'
//make a function to check whether wallet connected, if yes -> show the disconnect button else dont show
//<Button size= "lg">disconnect</Button>
function Header() {

    const router = useRouter()
  

    return (

        <header>
            <Flex margin="6px" p={2}>
                <Text  color='gray.700' fontSize='2xl'>E-waste marketplace</Text>

                <ServiceSearch />
                <Stack  direction='row' spacing={1}>
                <Button size='sm' colorScheme="blue" onClick={() => router.push('/')}>home</Button>
                <Button size='sm' colorScheme="blue" onClick={() => router.push('/myProfile')}>my profile</Button>
               
                <Button size='sm' colorScheme="blue"  onClick={() => router.push('/register')}>login</Button>
                <Button size='sm' colorScheme="blue" >logout</Button>
                </Stack>
                
                
            </Flex>



        </header>
    )
}
export default Header