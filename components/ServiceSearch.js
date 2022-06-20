import {
    FormControl, Input, Button, Box, HStack
} from "@chakra-ui/react"


function ServiceSearch() {

    const SearchAction = async event => {
        event.preventDefault()
        try {
            const res = await fetch(
                '/api/search-button',
                {
                    body: JSON.stringify({
                        name: event.target.name.value
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'POST',
                    setTimeout: 5000
                }
            ).then(res => res.json()).then(data => {
                console.log(data);
            })

        }
        catch (err) {
            console.log(err);
        }
    }

    
  
    return (



        <Box m="auto" h="60px" w="30%" p={1}>


            <form onSubmit={SearchAction}>


                <FormControl>
                    <HStack>
                        <Input size="sm" rounded="9" variant="outline" placeholder="0x...." id="name" name="name" type="text" />
                        <Button size="sm" type="submit" colorScheme="blue" variant="solid" >search</Button></HStack>

                </FormControl>



            </form>



        </Box>

    )
}
export default ServiceSearch