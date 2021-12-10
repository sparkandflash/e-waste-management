

import {
    FormControl, Flex, Spacer, Input, FormLabel, Text, Button, Box, HStack
} from "@chakra-ui/react"

import ServiceSearch from '../components/ServiceSearch';
import { useRouter } from 'next/router'
//make a function to check whether wallet connected, if yes -> show the disconnect button else dont show
//<Button size= "lg">disconnect</Button>
function Header() {
    const router = useRouter()
    return (

        <header>
            <Flex p={2}>
                <Button color="blue.100" bg="blue.500" onClick={() => router.push('/')}>Home</Button>
                <Spacer />
                <ServiceSearch />
            </Flex>



        </header>
    )
}
export default Header