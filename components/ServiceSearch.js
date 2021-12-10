import {
    FormControl, Input, Button, Box, HStack
} from "@chakra-ui/react"


function ServiceSearch() {
    const serviceSearch = async event => { }
    return (



        <Box m="auto" h="60px" w="30%" p={1}>


            <form onSubmit={serviceSearch}>


                <FormControl>
                    <HStack>
                        <Input size="sm" rounded="9" variant="outline" placeholder="0x...." id="name" name="name" type="text" />
                        <Button size="sm" type="submit" bg="blue.500" variant="solid" color="blue.100" >search</Button></HStack>

                </FormControl>



            </form>



        </Box>

    )
}
export default ServiceSearch