import { ChakraProvider } from "@chakra-ui/react";
import { MoralisProvider } from "react-moralis";


function MyApp({ Component, pageProps }) {
  return (

    <ChakraProvider>


      <Component {...pageProps} />


    </ChakraProvider>



  )

}

export default MyApp