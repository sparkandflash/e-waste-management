import Header from '../components/Header';
import {  Text, Container, Box, Button, Image } from "@chakra-ui/react";
import { useRouter } from 'next/router';
import Web3Modal from 'web3modal';
export default  function itemProfile(){
    const router = useRouter()
    const { id, tokenURI } = router.query
function txnData(){

}
    return (
    <div>
        <Header />
<Container>
    <Text> Item name: </Text>
    </Container>
    </div>
    )
}