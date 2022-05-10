

import {
    FormControl, Flex, Spacer, Input, FormLabel, Text, Button, Box, HStack, VStack
} from "@chakra-ui/react"

import ServiceSearch from '../components/ServiceSearch';
import { useRouter } from 'next/router'
//make a function to check whether wallet connected, if yes -> show the disconnect button else dont show
//<Button size= "lg">disconnect</Button>
function Header() {
    const router = useRouter()
    return (

        <header>
            <Flex p={5}>
                <HStack>
              
                 
                <Button color="blue.100" bg="blue.500" onClick={() => router.push('/')}>dashboard</Button>

                <Button color="blue.100" bg="blue.500" onClick={() => router.push('/myProfile')}>my profile</Button>
                <Button color="blue.100" bg="blue.500" onClick={() => router.push('/citizen')}>add item</Button>
                </HStack>
                <Spacer />
                <ServiceSearch />
            </Flex>



        </header>
    )
}
export default Header